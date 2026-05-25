"use client";

import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
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
        <Header />

        {/* About Section */}
        <div className="card animate-fade-in-up" style={{ marginBottom: "20px" }}>
          <div className="section-header">
            <div
              className="section-icon"
              style={{
                background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(99,102,241,0.15))",
                border: "1px solid rgba(6,182,212,0.2)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <h2 className="section-title">Apa itu SVD Image Compressor?</h2>
              <p className="section-subtitle">Pengenalan singkat tentang aplikasi ini</p>
            </div>
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "20px" }}>
            <strong style={{ color: "var(--text-primary)" }}>SVD Image Compressor</strong> adalah aplikasi web interaktif untuk mengompresi gambar menggunakan metode{" "}
            <span style={{ color: "var(--accent-hover)", fontWeight: 600 }}>Singular Value Decomposition (SVD)</span>{" "}
            — sebuah teknik dekomposisi matriks dalam aljabar linier numerik. Aplikasi ini memungkinkan kamu memahami secara visual bagaimana SVD bekerja dalam konteks kompresi gambar.
          </p>

          {/* Feature Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                ),
                title: "Multi-Format",
                desc: "PNG, JPG, WEBP, BMP, GIF, TIFF",
                color: "#818cf8",
                bg: "rgba(99,102,241,0.1)",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
                title: "Analisis Real-time",
                desc: "Scree plot & energi kumulatif",
                color: "#10b981",
                bg: "rgba(16,185,129,0.1)",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                ),
                title: "Kontrol Parameter",
                desc: "Atur nilai k dari 1 sampai 200",
                color: "#f59e0b",
                bg: "rgba(245,158,11,0.1)",
              },
            ].map((feat, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "20px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-bright)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: feat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                  }}
                >
                  {feat.icon}
                </div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                  {feat.title}
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How SVD Works */}
        <div className="card animate-fade-in-up stagger-2" style={{ marginBottom: "20px" }}>
          <div className="section-header">
            <div
              className="section-icon"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(167,139,250,0.15))",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div>
              <h2 className="section-title">Bagaimana SVD Bekerja?</h2>
              <p className="section-subtitle">Konsep matematika di balik kompresi gambar</p>
            </div>
          </div>

          {/* Formula */}
          <div
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "20px 24px",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>
              Rumus Dekomposisi SVD
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: 800,
                fontFamily: "var(--font-mono)",
                background: "linear-gradient(135deg, #e2e8f0, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.05em",
              }}
            >
              A = U · Σ · Vᵀ
            </p>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "8px", lineHeight: 1.7 }}>
              Setiap matriks gambar <strong style={{ color: "var(--text-primary)" }}>A</strong> berukuran M×N dapat didekomposisi menjadi tiga matriks
            </p>
          </div>

          {/* Matrix cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {[
              { symbol: "U", shape: "M × k", desc: "Singular vectors kiri — pola baris gambar", color: "#6366f1" },
              { symbol: "Σ", shape: "k × k", desc: "Matriks diagonal — bobot kepentingan setiap komponen", color: "#10b981" },
              { symbol: "Vᵀ", shape: "k × N", desc: "Singular vectors kanan — pola kolom gambar", color: "#f59e0b" },
            ].map((mat) => (
              <div
                key={mat.symbol}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "24px", fontWeight: 800, fontFamily: "var(--font-mono)", color: mat.color, marginBottom: "4px" }}>
                  {mat.symbol}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-secondary)",
                    marginBottom: "8px",
                    background: "rgba(255,255,255,0.04)",
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {mat.shape}
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{mat.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: "12px" }}>
              <strong style={{ color: "var(--text-primary)" }}>Bagaimana kompresi terjadi?</strong>{" "}
              Alih-alih menyimpan seluruh data gambar, kita hanya menyimpan{" "}
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-3)", background: "var(--accent-soft)", padding: "1px 6px", borderRadius: "4px" }}>k</span>{" "}
              singular values terbesar beserta vektor-vektor terkaitnya. Semakin kecil{" "}
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-3)", background: "var(--accent-soft)", padding: "1px 6px", borderRadius: "4px" }}>k</span>
              , semakin besar kompresi — tetapi semakin banyak detail yang hilang.
            </p>
            <p>
              Gambar RGB diproses per channel (Red, Green, Blue) secara terpisah. Setiap channel didekomposisi dengan SVD, lalu direkonstruksi dengan rank-
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-3)", background: "var(--accent-soft)", padding: "1px 6px", borderRadius: "4px" }}>k</span>
              , dan digabungkan kembali menjadi gambar utuh.
            </p>
          </div>
        </div>

        {/* How To Use */}
        <div className="card animate-fade-in-up stagger-3" style={{ marginBottom: "32px" }}>
          <div className="section-header">
            <div
              className="section-icon"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.15))",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <div>
              <h2 className="section-title">Cara Menggunakan</h2>
              <p className="section-subtitle">Ikuti 4 langkah sederhana berikut</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {[
              {
                step: "1", title: "Upload Gambar", desc: "Drag & drop atau klik untuk memilih file gambar", color: "#6366f1",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
              },
              {
                step: "2", title: "Atur Nilai k", desc: "Pilih jumlah singular values yang dipertahankan", color: "#f59e0b",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>,
              },
              {
                step: "3", title: "Kompres", desc: "Klik tombol kompres dan tunggu proses SVD selesai", color: "#10b981",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
              },
              {
                step: "4", title: "Analisis & Unduh", desc: "Lihat perbandingan, grafik analisis, dan unduh hasil", color: "#06b6d4",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
              },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "20px 16px",
                  textAlign: "center",
                  position: "relative",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-bright)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: `${s.color}20`,
                    border: `1.5px solid ${s.color}50`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: s.color,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {s.step}
                </div>
                <div style={{ color: s.color, marginBottom: "10px", marginTop: "4px", display: "flex", justifyContent: "center" }}>
                  {s.icon}
                </div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>{s.title}</p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/compress" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ width: "auto", padding: "16px 48px", fontSize: "16px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Mulai Kompresi Gambar
            </button>
          </Link>
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
