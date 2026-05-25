"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import UploadZone from "@/components/UploadZone";
import ControlPanel from "@/components/ControlPanel";
import PreviewPanel from "@/components/PreviewPanel";
import AnalysisCharts from "@/components/AnalysisCharts";

interface CompressResult {
  compressed_image: string;
  original_size_kb: number;
  raw_size_kb: number;
  compressed_size_kb: number;
  svd_theoretical_kb: number;
  compression_ratio: number;
  max_effective_k: number;
  image_dimensions: { width: number; height: number };
  metrics: {
    mse: number;
    cumulative_energy: number[];
    scree_plot: number[];
  };
}

export default function CompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [kValue, setKValue] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  }, []);

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("k", String(kValue));

      const response = await fetch("http://localhost:8000/compress", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: CompressResult = await response.json();
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan tidak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = `data:image/jpeg;base64,${result.compressed_image}`;
    link.download = `compressed_k${kValue}.jpg`;
    link.click();
  };

  return (
    <>
      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 80px",
          position: "relative",
        }}
      >
        {/* Navigation Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 0 32px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--bg-glass)",
              backdropFilter: "blur(8px)",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-bright)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Kembali ke Dashboard
          </Link>

          <h1
            style={{
              fontSize: "20px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #f1f5f9, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SVD Compressor
          </h1>
        </div>

        {/* Tool */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <UploadZone onFileSelect={handleFileSelect} currentFile={file} />
            <ControlPanel
              kValue={kValue}
              onKChange={setKValue}
              onCompress={handleCompress}
              loading={loading}
              disabled={!file}
            />
          </div>

          {error && (
            <div className="error-box animate-fade-in-up">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {result && previewUrl && (
            <>
              <PreviewPanel
                originalUrl={previewUrl}
                compressedBase64={result.compressed_image}
                originalSizeKb={result.original_size_kb}
                rawSizeKb={result.raw_size_kb}
                compressedSizeKb={result.compressed_size_kb}
                svdTheoreticalKb={result.svd_theoretical_kb}
                compressionRatio={result.compression_ratio}
                maxEffectiveK={result.max_effective_k}
                mse={result.metrics.mse}
                kValue={kValue}
              />

              <AnalysisCharts
                screePlotData={result.metrics.scree_plot}
                cumulativeEnergyData={result.metrics.cumulative_energy}
                kValue={kValue}
              />

              <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
                <button id="btn-download" className="btn-secondary" onClick={handleDownload}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Unduh Hasil Kompresi
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "32px 24px",
          borderTop: "1px solid var(--border)",
          background: "rgba(6, 6, 10, 0.5)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7 }}>
          SVD Image Compressor — Dibangun dengan{" "}
          <span style={{ color: "var(--accent-hover)", fontWeight: 500 }}>FastAPI</span> &{" "}
          <span style={{ color: "var(--accent-hover)", fontWeight: 500 }}>Next.js</span>
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "4px" }}>
          Projek Metode Numerik · Singular Value Decomposition
        </p>
      </footer>
    </>
  );
}
