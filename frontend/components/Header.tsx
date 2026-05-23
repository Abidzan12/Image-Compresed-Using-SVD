export default function Header() {
  return (
    <header style={{ textAlign: "center", padding: "48px 0 40px" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
        <span className="tag">
          <span>⚡</span>
          Singular Value Decomposition
        </span>
      </div>
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.25rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          background: "linear-gradient(135deg, #e2e8f0 30%, #818cf8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "16px",
        }}
      >
        SVD Image Compressor
      </h1>
      <p
        style={{
          fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
          color: "var(--text-secondary)",
          maxWidth: "580px",
          margin: "0 auto",
          lineHeight: 1.7,
        }}
      >
        Kompres gambar menggunakan dekomposisi matriks{" "}
        <strong style={{ color: "var(--accent-hover)" }}>Singular Value Decomposition</strong>.
        Atur nilai <em>k</em> untuk mengontrol kualitas vs ukuran, lalu analisis distribusi
        energi singular secara interaktif.
      </p>
    </header>
  );
}
