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
    if (k <= 20) return { label: "Kompresi Tinggi", color: "#ef4444" };
    if (k <= 60) return { label: "Seimbang", color: "#f59e0b" };
    if (k <= 120) return { label: "Kualitas Baik", color: "#10b981" };
    return { label: "Kualitas Tinggi", color: "#6366f1" };
  };

  const quality = getQualityLabel(kValue);

  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            border: "1px solid rgba(99,102,241,0.3)",
          }}
        >
          🎛️
        </div>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
            Parameter Kompresi
          </h2>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Atur jumlah nilai singular yang dipertahankan
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <label style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500 }}>
            Nilai <em>k</em> (Singular Values)
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "999px",
                background: `${quality.color}18`,
                color: quality.color,
                border: `1px solid ${quality.color}40`,
                fontWeight: 600,
              }}
            >
              {quality.label}
            </span>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "var(--accent-hover)",
                letterSpacing: "-0.02em",
                minWidth: "40px",
                textAlign: "right",
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
            marginTop: "8px",
            fontSize: "11px",
            color: "var(--text-muted)",
          }}
        >
          <span>1 (Sangat Terkompresi)</span>
          <span>200 (Kualitas Penuh)</span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        {[10, 30, 80, 150].map((preset) => (
          <button
            key={preset}
            id={`preset-k-${preset}`}
            onClick={() => onKChange(preset)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: kValue === preset ? "1.5px solid var(--accent)" : "1px solid var(--border)",
              background: kValue === preset ? "rgba(99,102,241,0.12)" : "transparent",
              color: kValue === preset ? "var(--accent-hover)" : "var(--text-secondary)",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            k={preset}
          </button>
        ))}
      </div>

      <button
        id="btn-compress"
        className="btn-primary"
        onClick={onCompress}
        disabled={disabled || loading}
      >
        {loading ? (
          <>
            <span
              style={{
                width: "16px",
                height: "16px",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTopColor: "white",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin-slow 0.8s linear infinite",
              }}
            />
            Memproses SVD...
          </>
        ) : (
          <>
            <span>⚡</span>
            Kompres Gambar
          </>
        )}
      </button>
    </div>
  );
}
