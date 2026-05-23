"use client";

interface PreviewPanelProps {
  originalUrl: string;
  compressedBase64: string;
  originalSizeKb: number;
  rawSizeKb: number;
  compressedSizeKb: number;
  svdTheoreticalKb: number;
  compressionRatio: number;
  maxEffectiveK: number;
  mse: number;
  kValue: number;
}

export default function PreviewPanel({
  originalUrl,
  compressedBase64,
  originalSizeKb,
  rawSizeKb,
  compressedSizeKb,
  svdTheoreticalKb,
  compressionRatio,
  maxEffectiveK,
  mse,
  kValue,
}: PreviewPanelProps) {
  const compressedUrl = `data:image/jpeg;base64,${compressedBase64}`;
  const isKTooLarge = kValue > maxEffectiveK;
  const ratioColor = compressionRatio >= 2 ? "#10b981" : compressionRatio >= 1 ? "#f59e0b" : "#ef4444";

  return (
    <div className="card animate-fade-in-up">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(6,182,212,0.2))",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            border: "1px solid rgba(16,185,129,0.3)",
          }}
        >
          🖼️
        </div>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
            Pratinjau Hasil
          </h2>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Perbandingan gambar asli vs kompresi (k={kValue})
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div>
          <div
            style={{
              background: "var(--bg-secondary)",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={originalUrl}
              alt="Gambar Asli"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>
              GAMBAR ASLI
            </p>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" }}>
              {originalSizeKb.toFixed(1)} KB
            </p>
          </div>
        </div>

        <div>
          <div
            style={{
              background: "var(--bg-secondary)",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(99,102,241,0.3)",
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99,102,241,0.12)",
            }}
          >
            <img
              src={compressedUrl}
              alt="Gambar Kompresi SVD"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>
              HASIL SVD (k={kValue})
            </p>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--accent-hover)" }}>
              {compressedSizeKb.toFixed(1)} KB
            </p>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>
              ukuran file JPEG output
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        <div className="metric-badge">
          <div className="value" style={{ color: ratioColor }}>
            {compressionRatio}x
          </div>
          <div className="label">Rasio Kompresi</div>
        </div>
        <div className="metric-badge">
          <div className="value">{mse.toFixed(2)}</div>
          <div className="label">MSE</div>
        </div>
        <div className="metric-badge">
          <div className="value" style={{ color: "var(--accent-hover)" }}>
            {kValue}
          </div>
          <div className="label">Nilai k</div>
        </div>
      </div>

      {isKTooLarge && (
        <div
          style={{
            marginTop: "12px",
            padding: "10px 14px",
            background: "rgba(245,158,11,0.1)",
            borderRadius: "10px",
            border: "1px solid rgba(245,158,11,0.4)",
            fontSize: "12px",
            color: "#fbbf24",
            lineHeight: "1.6",
          }}
        >
          ⚠️ <strong>k={kValue} melebihi batas efektif</strong> untuk gambar ini (k_max ≈ {maxEffectiveK}).
          Coba turunkan nilai k agar storage SVD lebih kecil dari raw piksel.
        </div>
      )}

      <div
        style={{
          marginTop: "12px",
          padding: "12px 16px",
          background: "rgba(99,102,241,0.08)",
          borderRadius: "10px",
          border: "1px solid rgba(99,102,241,0.2)",
          fontSize: "12px",
          color: "var(--text-muted)",
          lineHeight: "1.6",
        }}
      >
        <strong style={{ color: "var(--accent-hover)" }}>ℹ️ Catatan:</strong>{" "}
        File asli: <strong>{originalSizeKb} KB</strong> ·{" "}
        Output JPEG (k={kValue}): <strong>{compressedSizeKb} KB</strong> ·{" "}
        Rasio: <strong>{compressionRatio}×</strong> (file asli ÷ output) ·{" "}
        SVD teoritis: <strong>{svdTheoreticalKb} KB</strong> · Raw piksel: <strong>{rawSizeKb} KB</strong>
      </div>
    </div>
  );
}
