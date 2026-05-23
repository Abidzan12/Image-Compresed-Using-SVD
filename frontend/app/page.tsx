"use client";

import { useState, useCallback } from "react";
import UploadZone from "@/components/UploadZone";
import ControlPanel from "@/components/ControlPanel";
import PreviewPanel from "@/components/PreviewPanel";
import AnalysisCharts from "@/components/AnalysisCharts";
import Header from "@/components/Header";

export interface CompressResult {
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

export default function Home() {
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
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 20px 60px" }}>
      <Header />

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
        <UploadZone onFileSelect={handleFileSelect} currentFile={file} />

        <ControlPanel
          kValue={kValue}
          onKChange={setKValue}
          onCompress={handleCompress}
          loading={loading}
          disabled={!file}
        />

        {error && (
          <div
            className="card animate-fade-in-up"
            style={{
              border: "1px solid rgba(239,68,68,0.4)",
              background: "rgba(239,68,68,0.08)",
              color: "#fca5a5",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 20px",
            }}
          >
            <span style={{ fontSize: "18px" }}>⚠️</span>
            <span style={{ fontSize: "14px" }}>{error}</span>
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
              <button
                id="btn-download"
                className="btn-secondary"
                onClick={handleDownload}
              >
                <span>⬇</span>
                Unduh Hasil Kompresi
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
