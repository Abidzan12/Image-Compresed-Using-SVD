"use client";

interface ControlPanelProps {
  kValue: number;
  onKChange: (k: number) => void;
  onCompress: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function ControlPanel({
  kValue,
  onKChange,
  onCompress,
  loading,
  disabled,
}: ControlPanelProps) {
  const max = 200;
  const progress = ((kValue - 1) / (max - 1)) * 100;

  const getQualityLabel = (k: number) => {
    if (k <= 20) return { label: "Kompresi Tinggi", color: "#ef4444", bg: "rgba(239,68,68,0.12)" };
    if (k <= 60) return { label: "Seimbang", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" };
    if (k <= 120) return { label: "Kualitas Baik", color: "#10b981", bg: "rgba(16,185,129,0.12)" };
    return { label: "Kualitas Tinggi", color: "#818cf8", bg: "rgba(99,102,241,0.12)" };
  };

  const quality = getQualityLabel(kValue);
  const presets = [10, 30, 80, 150];

  return (
    <div className="card">
      {/* Section Header */}
      <div className="section-header">
        <div
          className="section-icon"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#818cf8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
        <div>
          <h2 className="section-title">Parameter Kompresi</h2>
          <p className="section-subtitle">
            Atur jumlah nilai singular yang dipertahankan
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              fontWeight: 500,
            }}
          >
            Nilai{" "}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent-3)",
                background: "var(--accent-soft)",
                padding: "1px 6px",
                borderRadius: "4px",
                fontSize: "13px",
              }}
            >
              k
            </span>{" "}
            (Singular Values)
          </label>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              className="quality-badge"
              style={{
                background: quality.bg,
                color: quality.color,
                border: `1px solid ${quality.color}30`,
              }}
            >
              {quality.label}
            </span>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "var(--accent-hover)",
                letterSpacing: "-0.03em",
                minWidth: "48px",
                textAlign: "right",
                fontFamily: "var(--font-sans)",
              }}
            >
              {kValue}
            </span>
          </div>
        </div>

        <input
          id="slider-k"
          type="range"
          min={1}
          max={200}
          value={kValue}
          onChange={(e) => onKChange(Number(e.target.value))}
          className="slider-track"
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            fontSize: "11px",
            color: "var(--text-dim)",
            fontWeight: 500,
          }}
        >
          <span>1 (Sangat Terkompresi)</span>
          <span>200 (Kualitas Penuh)</span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        {presets.map((preset) => (
          <button
            key={preset}
            id={`preset-k-${preset}`}
            className={`preset-btn ${kValue === preset ? "preset-btn-active" : ""}`}
            onClick={() => onKChange(preset)}
          >
            k={preset}
          </button>
        ))}
      </div>

      {/* Compress Button */}
      <button
        id="btn-compress"
        className="btn-primary"
        onClick={onCompress}
        disabled={disabled || loading}
      >
        {loading ? (
          <>
            <div className="spinner" />
            <span>Memproses SVD...</span>
          </>
        ) : (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Kompres Gambar</span>
          </>
        )}
      </button>
    </div>
  );
}
