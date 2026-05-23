# 🖼️ SVD Image Compression

Aplikasi kompresi gambar interaktif berbasis **Singular Value Decomposition (SVD)** dengan antarmuka web modern. Dibangun menggunakan **FastAPI** (backend Python) dan **Next.js** (frontend TypeScript).

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Konsep Matematika SVD](#-konsep-matematika-svd)
- [Fitur Aplikasi](#-fitur-aplikasi)
- [Struktur Proyek](#-struktur-proyek)
- [Tech Stack](#-tech-stack)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Setup & Instalasi](#-setup--instalasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Cara Menggunakan](#-cara-menggunakan)
- [Penjelasan Parameter k](#-penjelasan-parameter-k)
- [API Reference](#-api-reference)
- [Struktur Komponen Frontend](#-struktur-komponen-frontend)
- [Troubleshooting](#-troubleshooting)

---

## 📖 Tentang Proyek

Proyek ini adalah implementasi **kompresi gambar menggunakan metode Singular Value Decomposition (SVD)** — sebuah teknik aljabar linier numerik yang memungkinkan representasi matriks gambar dengan jumlah data yang lebih sedikit tanpa kehilangan informasi penting secara signifikan.

Aplikasi ini memungkinkan pengguna untuk:
- Mengunggah gambar dalam berbagai format
- Mengontrol tingkat kompresi melalui parameter **k** (jumlah singular value yang dipertahankan)
- Melihat perbandingan gambar asli vs hasil kompresi secara real-time
- Menganalisis distribusi energi singular values melalui grafik interaktif
- Mengunduh hasil gambar yang telah dikompresi

---

## 📐 Konsep Matematika SVD

### Apa itu SVD?

Setiap matriks gambar **A** berukuran M×N dapat didekomposisi menjadi tiga matriks:

```
A = U · Σ · Vᵀ
```

Di mana:
- **U** — Matriks ortogonal berukuran M×M (singular vectors kiri)
- **Σ** — Matriks diagonal berukuran M×N berisi singular values (σ₁ ≥ σ₂ ≥ ... ≥ σᵣ ≥ 0)
- **Vᵀ** — Matriks ortogonal berukuran N×N (singular vectors kanan)

### Bagaimana Kompresi Bekerja?

Alih-alih menyimpan semua singular values, kita hanya menyimpan **k singular values terbesar**:

```
A_k = U[:, :k] · diag(σ₁, σ₂, ..., σₖ) · Vᵀ[:k, :]
```

Semakin besar nilai **k**, semakin banyak informasi yang dipertahankan — semakin kecil k, semakin tinggi kompresi.

### Pemrosesan per Channel

Karena gambar RGB memiliki 3 channel warna (Red, Green, Blue), SVD diterapkan **secara independen** pada masing-masing channel:

```
R_compressed = SVD_k(R_channel)
G_compressed = SVD_k(G_channel)
B_compressed = SVD_k(B_channel)
```

### Estimasi Efisiensi Storage SVD

Secara teoritis, storage yang dibutuhkan untuk representasi SVD dengan rank-k adalah:

```
Storage SVD = k × (M + N + 1) × 3 channel × 1 byte
```

Namun output aktual berupa file JPEG sehingga ukuran nyata dapat berbeda.

---

## ✨ Fitur Aplikasi

| Fitur | Keterangan |
|-------|------------|
| 📁 **Multi-format Upload** | Mendukung PNG, JPG/JPEG, WEBP, BMP, GIF, TIFF |
| 🎛️ **Slider Interaktif** | Kontrol nilai k dari 1–200 secara real-time |
| ⚡ **Preset Cepat** | Tombol preset k=10, 30, 80, 150 |
| 🖼️ **Preview Side-by-Side** | Perbandingan gambar asli vs hasil kompresi |
| 📊 **Analisis Visual** | Scree Plot dan grafik Energi Kumulatif |
| 📏 **Metrik Akurat** | Rasio kompresi berdasarkan ukuran file nyata |
| ⬇️ **Download Hasil** | Unduh gambar hasil kompresi dalam format JPEG |
| 🎨 **Dark Mode UI** | Antarmuka modern dengan tema gelap |
| 🔄 **Drag & Drop** | Upload gambar via drag and drop atau klik |

---

## 📂 Struktur Proyek

```
projek numerik/
│
├── backend/                        # Server Python (FastAPI)
│   ├── main.py                     # Entry point API & logika SVD
│   └── requirements.txt            # Dependensi Python
│
├── frontend/                       # Aplikasi web (Next.js)
│   ├── app/
│   │   ├── page.tsx                # Halaman utama & state management
│   │   ├── layout.tsx              # Layout global & metadata
│   │   └── globals.css             # Design system & CSS variables
│   │
│   ├── components/
│   │   ├── Header.tsx              # Komponen header aplikasi
│   │   ├── UploadZone.tsx          # Area drag & drop upload gambar
│   │   ├── ControlPanel.tsx        # Slider k & tombol kompresi
│   │   ├── PreviewPanel.tsx        # Perbandingan gambar & metrik
│   │   └── AnalysisCharts.tsx      # Scree plot & energi kumulatif
│   │
│   ├── public/                     # Aset statis
│   ├── package.json                # Dependensi Node.js
│   ├── tsconfig.json               # Konfigurasi TypeScript
│   └── next.config.ts              # Konfigurasi Next.js
│
├── .venv/                          # Virtual environment Python (tidak di-push)
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

### Backend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Python | ≥ 3.11 | Bahasa pemrograman utama |
| FastAPI | latest | Web framework API |
| Uvicorn | latest | ASGI server |
| NumPy | latest | Komputasi SVD (`np.linalg.svd`) |
| Pillow | latest | Pemrosesan gambar |
| python-multipart | latest | Parsing form-data upload |

### Frontend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Next.js | 16.2.6 | React framework (App Router) |
| React | 19.2.4 | UI library |
| TypeScript | ^5 | Type safety |
| Recharts | ^3.8.1 | Grafik interaktif |
| Tailwind CSS | ^4 | Styling utility |

---

## 💻 Persyaratan Sistem

Sebelum memulai, pastikan sistem kamu sudah memiliki:

- **Python** versi 3.11 atau lebih baru
  ```
  python --version
  ```
- **Node.js** versi 18 atau lebih baru
  ```
  node --version
  ```
- **npm** versi 9 atau lebih baru
  ```
  npm --version
  ```
- **Git**
  ```
  git --version
  ```

---

## 🚀 Setup & Instalasi

### 1. Clone Repositori

```bash
git clone https://github.com/Abidzan12/Image-Compresed-Using-SVD.git
cd Image-Compresed-Using-SVD
```

---

### 2. Setup Backend (Python)

#### a. Buat Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv .venv
```

**macOS / Linux:**
```bash
python3 -m venv .venv
```

#### b. Aktifkan Virtual Environment

**Windows (PowerShell):**
```powershell
.venv\Scripts\Activate.ps1
```

> ⚠️ Jika muncul error *"execution of scripts is disabled"*, jalankan dulu:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

**Windows (Command Prompt):**
```cmd
.venv\Scripts\activate.bat
```

**macOS / Linux:**
```bash
source .venv/bin/activate
```

Setelah aktif, prompt terminal akan menampilkan `(.venv)` di awal baris.

#### c. Install Dependensi Python

```bash
pip install -r backend/requirements.txt
```

Isi `requirements.txt`:
```
fastapi
uvicorn[standard]
numpy
pillow
python-multipart
```

---

### 3. Setup Frontend (Node.js)

```bash
cd frontend
npm install
cd ..
```

---

## ▶️ Menjalankan Aplikasi

Aplikasi membutuhkan **dua terminal** yang berjalan secara bersamaan — satu untuk backend, satu untuk frontend.

### Terminal 1 — Jalankan Backend (FastAPI)

**Windows:**
```powershell
.venv\Scripts\python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**macOS / Linux:**
```bash
source .venv/bin/activate
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Output yang diharapkan:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process using WatchFiles
INFO:     Application startup complete.
```

✅ Backend berjalan di: **http://localhost:8000**

---

### Terminal 2 — Jalankan Frontend (Next.js)

```bash
cd frontend
npm run dev
```

Output yang diharapkan:
```
▲ Next.js 16.2.6 (Turbopack)
- Local:   http://localhost:3000
✓ Ready in ~1s
```

✅ Frontend berjalan di: **http://localhost:3000**

---

### Akses Aplikasi

Buka browser dan kunjungi: **[http://localhost:3000](http://localhost:3000)**

---

## 📖 Cara Menggunakan

### Langkah 1 — Upload Gambar
- Klik area upload atau **drag & drop** file gambar ke zona yang tersedia
- Format yang didukung: **PNG, JPG, JPEG, WEBP, BMP, GIF, TIFF**
- Nama file dan ukuran akan ditampilkan setelah upload berhasil

### Langkah 2 — Atur Nilai k
- Gunakan **slider** untuk mengatur nilai k (1–200)
- Atau klik tombol **preset**: `k=10`, `k=30`, `k=80`, `k=150`
- Label kualitas akan berubah otomatis:
  - 🔴 **Kompresi Tinggi** — k ≤ 20
  - 🟡 **Seimbang** — k 21–60
  - 🟢 **Kualitas Baik** — k 61–120
  - 🔵 **Kualitas Tinggi** — k > 120

### Langkah 3 — Kompres
- Klik tombol **"⚡ Kompres Gambar"**
- Tunggu proses SVD selesai (biasanya 1–5 detik tergantung ukuran gambar)

### Langkah 4 — Lihat Hasil
- Panel **Pratinjau Hasil** menampilkan gambar asli vs hasil kompresi side-by-side
- Metrik yang ditampilkan:
  - **Rasio Kompresi** — perbandingan ukuran file asli ÷ output JPEG
  - **MSE** — Mean Squared Error (semakin rendah = semakin mirip aslinya)
  - **Nilai k** yang digunakan
- **Grafik Analisis**:
  - **Scree Plot** — penurunan nilai singular (skala log₁₀)
  - **Energi Kumulatif** — persentase informasi gambar yang dipertahankan

### Langkah 5 — Download (Opsional)
- Klik **"⬇ Unduh Hasil Kompresi"** untuk menyimpan gambar hasil SVD dalam format JPEG

---

## 🔢 Penjelasan Parameter k

Parameter **k** menentukan berapa banyak **singular values** yang dipertahankan dari total dekomposisi. Ini adalah trade-off antara kualitas dan ukuran:

| Nilai k | Kualitas | Kasus Penggunaan |
|---------|----------|-----------------|
| 1 – 10 | Sangat Rendah (abstrak) | Thumbnail, watermark |
| 11 – 30 | Rendah | Preview, thumbnail medium |
| 31 – 60 | Sedang | Web image, social media |
| 61 – 120 | Baik | Dokumen digital, web berkualitas |
| 121 – 200 | Tinggi | Arsip, cetak |

> **Tips:** Untuk sebagian besar gambar foto, nilai **k=30–80** sudah cukup untuk menghasilkan gambar yang terlihat baik dengan kompresi yang signifikan. Gunakan grafik **Energi Kumulatif** untuk melihat berapa % informasi gambar yang dipertahankan pada nilai k tertentu.

---

## 🔌 API Reference

### `POST /compress`

Endpoint utama untuk melakukan kompresi gambar menggunakan SVD.

**URL:** `http://localhost:8000/compress`

**Method:** `POST`

**Content-Type:** `multipart/form-data`

#### Request Parameters

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `file` | File | ✅ | File gambar (PNG, JPG, WEBP, BMP, dll) |
| `k` | integer | ✅ | Jumlah singular values (1–200) |

#### Contoh Request (cURL)

```bash
curl -X POST http://localhost:8000/compress \
  -F "file=@/path/to/image.jpg" \
  -F "k=50"
```

#### Response (200 OK)

```json
{
  "compressed_image": "<base64_encoded_jpeg_string>",
  "original_size_kb": 61.37,
  "raw_size_kb": 594.14,
  "compressed_size_kb": 45.20,
  "svd_theoretical_kb": 82.53,
  "compression_ratio": 1.36,
  "max_effective_k": 142,
  "image_dimensions": {
    "width": 512,
    "height": 384
  },
  "metrics": {
    "mse": 165.20,
    "cumulative_energy": [12.4, 24.1, 35.6, ...],
    "scree_plot": [4.21, 3.87, 3.54, ...]
  }
}
```

#### Penjelasan Field Response

| Field | Tipe | Keterangan |
|-------|------|------------|
| `compressed_image` | string | Gambar hasil kompresi dalam format Base64 (JPEG) |
| `original_size_kb` | float | Ukuran file asli yang diunggah (KB) |
| `raw_size_kb` | float | Ukuran raw pixel data uncompressed (KB) |
| `compressed_size_kb` | float | Ukuran **aktual** output JPEG hasil SVD (KB) |
| `svd_theoretical_kb` | float | Estimasi teoritis storage SVD: k×(M+N+1)×3 (KB) |
| `compression_ratio` | float | Rasio: ukuran asli ÷ ukuran output |
| `max_effective_k` | integer | Nilai k maksimum efektif untuk gambar ini |
| `image_dimensions` | object | Dimensi gambar dalam piksel |
| `metrics.mse` | float | Mean Squared Error antara asli dan hasil kompresi |
| `metrics.cumulative_energy` | array | % energi kumulatif untuk setiap komponen (maks 200) |
| `metrics.scree_plot` | array | Nilai log₁₀(σ) untuk setiap singular value |

#### Response Error (400 Bad Request)

```json
{
  "detail": "Gagal membuka gambar: <pesan error>"
}
```

#### Dokumentasi Interaktif API

FastAPI menyediakan dokumentasi otomatis. Setelah backend berjalan, akses:
- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🧩 Struktur Komponen Frontend

```
page.tsx (Root Component)
│   State: file, previewUrl, kValue, loading, result, error
│
├── Header.tsx
│   └── Judul aplikasi & deskripsi
│
├── UploadZone.tsx
│   ├── Input file (accept="image/*")
│   ├── Drag & Drop handler
│   └── Preview nama file & ukuran
│
├── ControlPanel.tsx
│   ├── Slider nilai k (1–200)
│   ├── Label kualitas dinamis
│   ├── Preset buttons (k=10, 30, 80, 150)
│   └── Tombol "Kompres Gambar"
│
├── PreviewPanel.tsx  [muncul setelah kompresi]
│   ├── Side-by-side image comparison
│   ├── Metrik: Rasio, MSE, Nilai k
│   └── Catatan detail ukuran file
│
└── AnalysisCharts.tsx  [muncul setelah kompresi]
    ├── Scree Plot (Recharts LineChart)
    └── Grafik Energi Kumulatif (Recharts LineChart)
```

---

## ❓ Troubleshooting

### ❌ `Failed to fetch` di browser
**Penyebab:** Backend tidak berjalan atau port 8000 tertutup.
**Solusi:**
1. Pastikan backend sudah dijalankan di terminal terpisah
2. Cek apakah ada proses lain yang menggunakan port 8000:
   ```powershell
   netstat -ano | findstr :8000
   ```
3. Coba akses [http://localhost:8000/docs](http://localhost:8000/docs) — jika tidak terbuka, backend belum jalan

---

### ❌ `AttributeError: module 'PIL' has no attribute 'Image'`
**Penyebab:** Import PIL salah atau Pillow tidak terinstall dengan benar.
**Solusi:**
```bash
pip install pillow --force-reinstall
```
Pastikan import di `main.py` menggunakan:
```python
from PIL import Image  # ✅ Benar
# bukan: import PIL    # ❌ Salah
```

---

### ❌ `execution of scripts is disabled` (Windows)
**Penyebab:** PowerShell execution policy membatasi script.
**Solusi:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### ❌ Port 3000 atau 8000 sudah dipakai
**Solusi:**
```powershell
# Cari proses yang memakai port
netstat -ano | findstr :3000

# Matikan proses (ganti <PID> dengan nomor yang ditemukan)
taskkill /PID <PID> /F
```

---

### ❌ `npm install` gagal
**Solusi:**
```bash
# Hapus cache dan install ulang
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Gambar PNG / WEBP gagal dikompresi
**Penyebab:** Gambar mungkin memiliki alpha channel (RGBA) atau mode warna yang tidak standar.
**Status:** Sudah ditangani secara otomatis oleh backend — gambar RGBA akan di-flatten ke background putih sebelum diproses SVD.

---

## 👤 Author

**Abidzan12**
- GitHub: [@Abidzan12](https://github.com/Abidzan12)
- Repository: [Image-Compresed-Using-SVD](https://github.com/Abidzan12/Image-Compresed-Using-SVD)

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan **tugas/projek numerik** dan bersifat open source.
