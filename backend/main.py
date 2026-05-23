from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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


def compress_channel(channel: np.ndarray, k: int) -> tuple[np.ndarray, np.ndarray]:
    U, S, Vt = np.linalg.svd(channel, full_matrices=False)
    k_clamped = min(k, len(S))
    reconstructed = (U[:, :k_clamped] @ np.diag(S[:k_clamped]) @ Vt[:k_clamped, :])
    return reconstructed, S


def compute_metrics(original: np.ndarray, compressed: np.ndarray, singular_values_list: list) -> dict:
    mse = float(np.mean((original.astype(np.float64) - compressed.astype(np.float64)) ** 2))

    all_singular = np.concatenate(singular_values_list)
    total_energy = np.sum(all_singular)

    k = min(len(singular_values_list[0]), 200)
    cumulative_energies = []
    for i in range(1, k + 1):
        partial = sum(np.sum(sv[:i]) for sv in singular_values_list)
        cumulative_energies.append(float(partial / (total_energy * len(singular_values_list)) * 100))

    representative_sv = singular_values_list[0]
    scree_data = [float(np.log10(v)) if v > 0 else 0.0 for v in representative_sv[:200]]

    return {
        "mse": mse,
        "cumulative_energy": cumulative_energies,
        "scree_plot": scree_data,
    }


@app.post("/compress")
async def compress_image(file: UploadFile = File(...), k: int = Form(...)):
    contents = await file.read()
    original_size_kb = round(len(contents) / 1024, 2)

    try:
        raw_image = Image.open(io.BytesIO(contents))
        # Convert semua format (RGBA, grayscale, palette, dll) ke RGB
        if raw_image.mode in ("RGBA", "LA"):
            # Flatten alpha channel ke background putih agar tidak hilang datanya
            background = Image.new("RGB", raw_image.size, (255, 255, 255))
            background.paste(raw_image, mask=raw_image.split()[-1])
            image = background
        else:
            image = raw_image.convert("RGB")
    except Exception as e:
        return JSONResponse(status_code=400, content={"detail": f"Gagal membuka gambar: {str(e)}"})

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

    # Ukuran JPEG hasil kompresi yang sebenarnya (bukan formula teoritis)
    actual_compressed_size_kb = round(len(buffer.getvalue()) / 1024, 2)

    # Rasio kompresi: ukuran file asli / ukuran output JPEG nyata
    compression_ratio = round(original_size_kb / actual_compressed_size_kb, 2) if actual_compressed_size_kb > 0 else 1.0

    # svd_size_kb tetap dikirim untuk keperluan referensi edukasi
    metrics = compute_metrics(original_array, compressed_array.astype(np.float64), singular_values_list)

    return JSONResponse(content={
        "compressed_image": compressed_b64,
        "original_size_kb": original_size_kb,
        "raw_size_kb": raw_size_kb,
        "compressed_size_kb": actual_compressed_size_kb,
        "svd_theoretical_kb": svd_size_kb,
        "compression_ratio": compression_ratio,
        "max_effective_k": max_effective_k,
        "image_dimensions": {"width": N, "height": M},
        "metrics": metrics,
    })
