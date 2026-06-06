from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from concurrent.futures import ThreadPoolExecutor
import asyncio
import numpy as np
from PIL import Image
import io
import base64

app = FastAPI(title="SVD Image Compressor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Thread pool untuk menjalankan komputasi SVD tanpa memblokir server
executor = ThreadPoolExecutor(max_workers=4)

# Batas resolusi maksimum agar SVD tidak terlalu lama
MAX_DIMENSION = 1024  # piksel


def resize_if_needed(image: Image.Image) -> Image.Image:
    """Resize gambar jika dimensinya melebihi MAX_DIMENSION, menjaga aspek rasio."""
    w, h = image.size
    if w <= MAX_DIMENSION and h <= MAX_DIMENSION:
        return image
    ratio = min(MAX_DIMENSION / w, MAX_DIMENSION / h)
    new_w = int(w * ratio)
    new_h = int(h * ratio)
    return image.resize((new_w, new_h), Image.LANCZOS)


def compress_channel(channel: np.ndarray, k: int) -> tuple[np.ndarray, np.ndarray]:
    U, S, Vt = np.linalg.svd(channel, full_matrices=False)
    k_clamped = min(k, len(S))
    reconstructed = (U[:, :k_clamped] @ np.diag(S[:k_clamped]) @ Vt[:k_clamped, :])
    return reconstructed, S


def compute_metrics(original: np.ndarray, compressed: np.ndarray, singular_values_list: list) -> dict:
    mse = float(np.mean((original.astype(np.float64) - compressed.astype(np.float64)) ** 2))

    # Energi total didefinisikan sebagai jumlah kuadrat dari seluruh nilai singular (Frobenius norm kuadrat)
    total_energy = sum(np.sum(sv ** 2) for sv in singular_values_list)

    k = min(len(singular_values_list[0]), 200)
    cumulative_energies = []
    for i in range(1, k + 1):
        partial = sum(np.sum(sv[:i] ** 2) for sv in singular_values_list)
        cumulative_energies.append(float((partial / total_energy) * 100) if total_energy > 0 else 0.0)

    representative_sv = singular_values_list[0]
    scree_data = [float(np.log10(v)) if v > 0 else 0.0 for v in representative_sv[:200]]

    return {
        "mse": mse,
        "cumulative_energy": cumulative_energies,
        "scree_plot": scree_data,
    }



def run_svd_compression(contents: bytes, k: int) -> dict:
    """Seluruh komputasi SVD dijalankan di thread terpisah agar tidak memblokir server."""
    original_size_kb = round(len(contents) / 1024, 2)

    raw_image = Image.open(io.BytesIO(contents))

    # Konversi mode warna ke RGB
    if raw_image.mode in ("RGBA", "LA"):
        background = Image.new("RGB", raw_image.size, (255, 255, 255))
        background.paste(raw_image, mask=raw_image.split()[-1])
        image = background
    else:
        image = raw_image.convert("RGB")

    # Resize jika gambar terlalu besar
    image = resize_if_needed(image)

    original_array = np.array(image, dtype=np.float64)
    M, N = original_array.shape[:2]
    NUM_CHANNELS = 3

    raw_size_kb = round((M * N * NUM_CHANNELS) / 1024, 2)

    k_clamped = min(k, min(M, N))
    svd_size_kb = round((k_clamped * (M + N + 1) * NUM_CHANNELS) / 1024, 2)
    max_effective_k = int((M * N) / (M + N + 1))

    channels = [original_array[:, :, i] for i in range(NUM_CHANNELS)]
    compressed_channels = []
    singular_values_list = []

    for ch in channels:
        reconstructed, sv = compress_channel(ch, k)
        compressed_channels.append(reconstructed)
        singular_values_list.append(sv)

    compressed_array = np.stack(compressed_channels, axis=2)
    compressed_array = np.clip(compressed_array, 0, 255).astype(np.uint8)

    compressed_image = Image.fromarray(compressed_array)
    buffer = io.BytesIO()
    compressed_image.save(buffer, format="JPEG", quality=85)
    compressed_b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    actual_compressed_size_kb = round(len(buffer.getvalue()) / 1024, 2)
    compression_ratio = round(original_size_kb / actual_compressed_size_kb, 2) if actual_compressed_size_kb > 0 else 1.0

    metrics = compute_metrics(original_array, compressed_array.astype(np.float64), singular_values_list)

    return {
        "compressed_image": compressed_b64,
        "original_size_kb": original_size_kb,
        "raw_size_kb": raw_size_kb,
        "compressed_size_kb": actual_compressed_size_kb,
        "svd_theoretical_kb": svd_size_kb,
        "compression_ratio": compression_ratio,
        "max_effective_k": max_effective_k,
        "image_dimensions": {"width": N, "height": M},
        "metrics": metrics,
    }


@app.post("/compress")
async def compress_image(file: UploadFile = File(...), k: int = Form(...)):
    contents = await file.read()

    try:
        # Jalankan komputasi berat di thread pool (non-blocking)
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(executor, run_svd_compression, contents, k)
    except Exception as e:
        return JSONResponse(status_code=400, content={"detail": f"Gagal memproses gambar: {str(e)}"})

    return JSONResponse(content=result)
