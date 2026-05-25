export default function Header() {
  return (
    <header
      style={{
        textAlign: "center",
        padding: "56px 0 48px",
        position: "relative",
      }}
    >
      {/* Decorative orb behind the title */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
          height: "200px",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 16px",
            marginBottom: "20px",
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            borderRadius: "9999px",
            backdropFilter: "blur(8px)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#818cf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#818cf8",
              letterSpacing: "0.03em",
            }}
          >
            Singular Value Decomposition
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            background:
              "linear-gradient(135deg, #f1f5f9 0%, #818cf8 55%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "20px",
          }}
        >
          SVD Image Compressor
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          Kompres gambar menggunakan dekomposisi matriks{" "}
          <span
            style={{
              color: "var(--accent-hover)",
              fontWeight: 600,
            }}
          >
            Singular Value Decomposition
          </span>
          . Atur nilai{" "}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              background: "var(--accent-soft)",
              padding: "2px 8px",
              borderRadius: "6px",
              fontSize: "0.95em",
              color: "var(--accent-3)",
            }}
          >
            k
          </span>{" "}
          untuk mengontrol kualitas vs ukuran, lalu analisis distribusi energi
          singular secara interaktif.
        </p>
      </div>
    </header>
  );
}
