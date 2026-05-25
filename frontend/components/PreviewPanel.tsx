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
  const ratioColor =
    compressionRatio >= 2
      ? "#10b981"
      : compressionRatio >= 1
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="card animate-fade-in-up">
      {/* Section Header */}
      <div className="section-header">
        <div
          className="section-icon"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.15))",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <div>
          <h2 className="section-title">Pratinjau Hasil</h2>
          <p className="section-subtitle">
            Perbandingan gambar asli vs kompresi (k={kValue})
          </p>
        </div>
      </div>

      {/* Image Comparison Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        {/* Original */}
        <div>
          <div className="image-frame">
            <img src={originalUrl} alt="Gambar Asli" />
            {/* Label overlay */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Original
            </div>
          </div>
          <div className="image-label">
            <p className="image-label-title">Gambar Asli</p>
            <p
              className="image-label-size"
              style={{ color: "var(--text-primary)" }}
            >
              {originalSizeKb.toFixed(1)} KB
            </p>
          </div>
        </div>

        {/* Compressed */}
        <div>
          <div className="image-frame-accent">
            <img src={compressedUrl} alt="Gambar Kompresi SVD" />
            {/* Label overlay */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: "rgba(99,102,241,0.3)",
                backdropFilter: "blur(8px)",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: 600,
                color: "#c7d2fe",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              SVD k={kValue}
            </div>
          </div>
          <div className="image-label">
            <p className="image-label-title">Hasil SVD</p>
            <p
              className="image-label-size"
              style={{ color: "var(--accent-hover)" }}
            >
              {compressedSizeKb.toFixed(1)} KB
            </p>
            <p className="image-label-sub">ukuran file JPEG output</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
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
          <div className="label">Nilai K</div>
        </div>
      </div>

      {/* Warning if k too large */}
      {isKTooLarge && (
        <div className="warning-box" style={{ marginTop: "16px" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>
            <strong>k={kValue} melebihi batas efektif</strong> untuk gambar ini
            (k_max ≈ {maxEffectiveK}). Coba turunkan nilai k agar storage SVD
            lebih kecil dari raw piksel.
          </span>
        </div>
      )}

      {/* Info box */}
      <div className="info-box" style={{ marginTop: "16px" }}>
        <strong>ℹ Catatan:</strong> File asli:{" "}
        <strong>{originalSizeKb} KB</strong> · Output JPEG (k={kValue}):{" "}
        <strong>{compressedSizeKb} KB</strong> · Rasio:{" "}
        <strong>{compressionRatio}×</strong> (file asli ÷ output) · SVD
        teoritis: <strong>{svdTheoreticalKb} KB</strong> · Raw piksel:{" "}
        <strong>{rawSizeKb} KB</strong>
      </div>
    </div>
  );
}
