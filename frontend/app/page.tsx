"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  // State untuk Stepper Alur Kerja
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // State untuk visualisasi 3D Stack
  const [isStackHovered, setIsStackHovered] = useState<boolean>(false);

  return (
    <>
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px 80px",
          position: "relative",
        }}
      >
        <Header />

        {/* ═══════════════════════════════════════════════
           HERO SECTION: 2-COLUMN LAYOUT (EXPLODED STACK ILLUSTRATION)
           ═══════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "48px",
            alignItems: "center",
            margin: "40px 0 80px",
          }}
          className="animate-fade-in-up"
        >
          {/* Left Column: Heading & Intro */}
          <div>
            <div
              className="tag"
              style={{
                marginBottom: "20px",
                background: "var(--accent-soft)",
                borderColor: "var(--border-accent)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent)",
                  display: "inline-block",
                  animation: "pulseGlow 2s infinite",
                }}
              ></span>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Metode Numerik Aljabar Linier
              </span>
            </div>

            <h1
              style={{
                fontSize: "46px",
                fontWeight: 900,
                lineHeight: "1.15",
                letterSpacing: "-0.03em",
                marginBottom: "20px",
                background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #818cf8 80%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Kompresi Gambar Menggunakan SVD
            </h1>

            <p
              style={{
                fontSize: "15px",
                color: "var(--text-secondary)",
                lineHeight: "1.8",
                marginBottom: "36px",
              }}
            >
              Pahami bagaimana matematika murni bekerja di belakang layar pengolahan citra digital. Menggunakan{" "}
              <strong style={{ color: "var(--text-primary)" }}>Singular Value Decomposition (SVD)</strong>, sistem
              memecah gambar menjadi saluran warna RGB terpisah dan mendekomposisinya ke dalam matriks komponen terkecil.
              Kurangi ukuran file secara efisien dengan mempertahankan kualitas visual terbaik.
            </p>

            {/* CTA Button Group */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/compress" style={{ textDecoration: "none" }}>
                <button
                  className="btn-primary"
                  style={{
                    width: "auto",
                    padding: "16px 40px",
                    fontWeight: 700,
                    boxShadow: "var(--shadow-glow-lg)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Mulai Kompresi Gambar
                </button>
              </Link>
              <a href="#explanation" style={{ textDecoration: "none" }}>
                <button className="btn-secondary" style={{ padding: "15px 28px" }}>
                  Pelajari Teori SVD
                </button>
              </a>
            </div>

            {/* Quick stats / Features badges */}
            <div
              style={{
                display: "flex",
                gap: "32px",
                marginTop: "54px",
                paddingTop: "24px",
                borderTop: "1px solid var(--border)",
              }}
            >
              <div>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "var(--accent-hover)", fontFamily: "var(--font-mono)" }}>3 Channel</p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "2px", fontWeight: 600 }}>Red, Green, Blue</p>
              </div>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "32px" }}>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "var(--cyan)", fontFamily: "var(--font-mono)" }}>O(N³)</p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "2px", fontWeight: 600 }}>Kompleksitas SVD</p>
              </div>
              <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "32px" }}>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "var(--success)", fontFamily: "var(--font-mono)" }}>Realtime</p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "2px", fontWeight: 600 }}>Analisis Metrik & Scree</p>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful Interactive 3D Exploded Stack Illustration */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              height: "420px",
            }}
          >
            {/* Background Radial Glow */}
            <div
              style={{
                position: "absolute",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: "rgba(99, 102, 241, 0.15)",
                filter: "blur(50px)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            {/* Exploded Stack Matrix Container */}
            <div
              style={{
                position: "relative",
                width: "320px",
                height: "300px",
                perspective: "1000px",
                zIndex: 1,
                cursor: "pointer",
              }}
              onMouseEnter={() => setIsStackHovered(true)}
              onMouseLeave={() => setIsStackHovered(false)}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transform: isStackHovered
                    ? "rotateX(25deg) rotateY(-25deg) rotateZ(5deg)"
                    : "rotateX(18deg) rotateY(-18deg) rotateZ(0deg)",
                  transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* 1. Matriks Vᵀ (Bottom Layer) */}
                <div
                  style={{
                    position: "absolute",
                    width: "220px",
                    height: "140px",
                    left: "20px",
                    top: "100px",
                    background: "rgba(245, 158, 11, 0.05)",
                    backdropFilter: "blur(8px)",
                    border: "2px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(245, 158, 11, 0.1)",
                    transform: isStackHovered
                      ? "translateZ(-80px) translateY(50px) translateX(-20px)"
                      : "translateZ(-30px)",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#f59e0b", fontFamily: "var(--font-mono)" }}>Matriks Vᵀ</span>
                    <span style={{ fontSize: "9px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>k × N</span>
                  </div>
                  {/* Horizontal Pattern Lines */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "12px 0" }}>
                    <div style={{ height: "3px", width: "100%", background: "rgba(245, 158, 11, 0.3)", borderRadius: "1px" }} />
                    <div style={{ height: "3px", width: "85%", background: "rgba(245, 158, 11, 0.2)", borderRadius: "1px" }} />
                    <div style={{ height: "3px", width: "95%", background: "rgba(245, 158, 11, 0.3)", borderRadius: "1px" }} />
                  </div>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)" }}>Right Singular Vectors</p>
                </div>

                {/* 2. Matriks Σ (Middle Layer) */}
                <div
                  style={{
                    position: "absolute",
                    width: "220px",
                    height: "140px",
                    left: "50px",
                    top: "70px",
                    background: "rgba(16, 185, 129, 0.05)",
                    backdropFilter: "blur(8px)",
                    border: "2px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(16, 185, 129, 0.1)",
                    transform: isStackHovered
                      ? "translateZ(0px)"
                      : "translateZ(0px)",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#10b981", fontFamily: "var(--font-mono)" }}>Matriks Σ</span>
                    <span style={{ fontSize: "9px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>k × k</span>
                  </div>
                  {/* Diagonal Glowing Dots */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", margin: "14px auto", width: "80px", height: "40px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", opacity: 0.7 }} />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#10b981", opacity: 0.4 }} />
                  </div>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)" }}>Singular Values (Diagonal)</p>
                </div>

                {/* 3. Matriks U (Top Layer) */}
                <div
                  style={{
                    position: "absolute",
                    width: "220px",
                    height: "140px",
                    left: "80px",
                    top: "40px",
                    background: "rgba(99, 102, 241, 0.05)",
                    backdropFilter: "blur(8px)",
                    border: "2px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "12px",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.6), 0 0 25px rgba(99, 102, 241, 0.15)",
                    transform: isStackHovered
                      ? "translateZ(80px) translateY(-50px) translateX(20px)"
                      : "translateZ(30px)",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#818cf8", fontFamily: "var(--font-mono)" }}>Matriks U</span>
                    <span style={{ fontSize: "9px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>M × k</span>
                  </div>
                  {/* Vertical Pattern Lines */}
                  <div style={{ display: "flex", gap: "6px", margin: "12px 10px", height: "30px", justifyContent: "center" }}>
                    <div style={{ width: "3px", height: "100%", background: "rgba(99, 102, 241, 0.3)", borderRadius: "1px" }} />
                    <div style={{ width: "3px", height: "100%", background: "rgba(99, 102, 241, 0.2)", borderRadius: "1px" }} />
                    <div style={{ width: "3px", height: "80%", background: "rgba(99, 102, 241, 0.3)", borderRadius: "1px" }} />
                    <div style={{ width: "3px", height: "100%", background: "rgba(99, 102, 241, 0.15)", borderRadius: "1px" }} />
                  </div>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)" }}>Left Singular Vectors</p>
                </div>
              </div>
            </div>

            {/* Tooltip hint under graphic */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                fontSize: "11px",
                color: "var(--text-muted)",
                background: "rgba(22, 22, 40, 0.4)",
                border: "1px solid var(--border)",
                padding: "6px 14px",
                borderRadius: "20px",
                backdropFilter: "blur(4px)",
                pointerEvents: "none",
                opacity: isStackHovered ? 0 : 0.8,
                transition: "opacity 0.3s",
              }}
            >
              Arahkan kursor untuk memisah matriks
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
           INTERACTIVE STEPPER: ALUR KERJA SVD
           ═══════════════════════════════════════════════ */}
        <div className="card animate-fade-in-up stagger-2" style={{ marginBottom: "32px" }}>
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
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h2 className="section-title">Mekanisme Kerja Kompresi Gambar</h2>
              <p className="section-subtitle">Alur teknis pemrosesan gambar dari file mentah hingga terkompresi</p>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              marginBottom: "24px",
              background: "rgba(255,255,255,0.02)",
              padding: "4px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border)",
            }}
          >
            {[
              { num: "01", label: "RGB Split" },
              { num: "02", label: "Matriks SVD" },
              { num: "03", label: "Rank-k Truncation" },
              { num: "04", label: "Recombination" },
            ].map((step, idx) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                style={{
                  background: activeStep === idx ? "var(--bg-elevated)" : "transparent",
                  border: activeStep === idx ? "1px solid var(--border-bright)" : "1px solid transparent",
                  borderRadius: "8px",
                  padding: "12px 8px",
                  color: activeStep === idx ? "var(--text-primary)" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                  transition: "all 0.25s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    color: activeStep === idx ? "var(--accent-hover)" : "var(--text-muted)",
                  }}
                >
                  {step.num}
                </span>
                {step.label}
              </button>
            ))}
          </div>

          {/* Step Detail Explanation Area */}
          <div
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "24px",
              alignItems: "center",
              minHeight: "220px",
            }}
          >
            {/* Step Left: Text info */}
            <div>
              {activeStep === 0 && (
                <div>
                  <h4 style={{ fontSize: "16px", color: "var(--text-primary)", fontWeight: 700, marginBottom: "8px" }}>
                    1. Pemisahan Saluran Warna (RGB)
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "12px" }}>
                    Setiap file gambar berwarna didekode menjadi pixel grid berdimensi 3D: Tinggi × Lebar × 3.
                    Tiga dimensi ini mewakili intensitas warna primer: **Red (Merah), Green (Hijau), dan Blue (Biru)**.
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7 }}>
                    Sebelum SVD dihitung, server memisahkan gambar menjadi tiga buah **matriks 2-dimensi mandiri** karena aljabar linier SVD hanya memproses matriks dua dimensi.
                  </p>
                </div>
              )}
              {activeStep === 1 && (
                <div>
                  <h4 style={{ fontSize: "16px", color: "var(--text-primary)", fontWeight: 700, marginBottom: "8px" }}>
                    2. Dekomposisi Aljabar Linier (SVD)
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "12px" }}>
                    Untuk setiap matriks warna A berukuran M × N, sistem menghitung dekomposisi nilai singular:
                    A = U · Σ · Vᵀ
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7 }}>
                    Fungsi ini membelah informasi piksel menjadi fitur-fitur struktural spasial (U dan Vᵀ) serta sebuah daftar bobot kepentingan berupa vektor nilai singular (Σ).
                  </p>
                </div>
              )}
              {activeStep === 2 && (
                <div>
                  <h4 style={{ fontSize: "16px", color: "var(--text-primary)", fontWeight: 700, marginBottom: "8px" }}>
                    3. Pemotongan Rank-k (Truncation)
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "12px" }}>
                    Nilai singular pada Σ disusun menurun. Nilai terbesar menyimpan kontribusi visual yang masif (pola kasar), sedangkan nilai kecil menyimpan noise atau detail halus.
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7 }}>
                    Dengan memotong matriks hanya mengambil k kolom pertama dari U, k nilai pertama Σ, dan k baris pertama Vᵀ, kita dapat membuang sebagian besar memori penyimpanan dengan dampak visual yang minim.
                  </p>
                </div>
              )}
              {activeStep === 3 && (
                <div>
                  <h4 style={{ fontSize: "16px", color: "var(--text-primary)", fontWeight: 700, marginBottom: "8px" }}>
                    4. Penyusunan Ulang & Kompresi JPEG
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "12px" }}>
                    Setelah ketiga saluran didekompresi kembali menggunakan rumus dekomposisi rank-k: A_k = U_k · Σ_k · V_kᵀ, hasilnya digabungkan kembali menjadi matriks 3D.
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7 }}>
                    Nilai piksel dipotong (clipped) ke batas [0 - 255], kemudian diekspor ke format JPEG dengan kompresi biner standar untuk pengiriman optimal kembali ke peramban pengguna.
                  </p>
                </div>
              )}
            </div>

            {/* Step Right: Interactive Graphic */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                height: "100%",
                minHeight: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              {activeStep === 0 && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: "rgba(239, 68, 68, 0.4)", border: "2px solid #ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800 }}>R</div>
                  <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: "rgba(16, 185, 129, 0.4)", border: "2px solid #10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800 }}>G</div>
                  <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: "rgba(59, 130, 246, 0.4)", border: "2px solid #3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800 }}>B</div>
                </div>
              )}
              {activeStep === 1 && (
                <div style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "16px", color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>A</span> ={" "}
                  <span style={{ color: "#6366f1", fontWeight: 700 }}>U</span> ·{" "}
                  <span style={{ color: "#10b981", fontWeight: 700 }}>Σ</span> ·{" "}
                  <span style={{ color: "#f59e0b", fontWeight: 700 }}>Vᵀ</span>
                </div>
              )}
              {activeStep === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", maxWidth: "160px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--text-muted)" }}>
                    <span>Rank k</span>
                    <span>Dibuang</span>
                  </div>
                  <div style={{ display: "flex", gap: "2px", height: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ flex: 3, background: "var(--accent)" }}></div>
                    <div style={{ flex: 5, background: "rgba(255,255,255,0.05)" }}></div>
                  </div>
                  <p style={{ fontSize: "10px", color: "var(--text-secondary)", textAlign: "center" }}>Mengambil k singular values terbesar</p>
                </div>
              )}
              {activeStep === 3 && (
                <div style={{ textAlign: "center" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "8px", fontWeight: 600 }}>JPEG Terkompresi</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
           MATHEMATICAL DETAILS SECTION
           ═══════════════════════════════════════════════ */}
        <div id="explanation" className="card animate-fade-in-up stagger-3" style={{ marginBottom: "32px" }}>
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
              <h2 className="section-title">Detail Formula Dekomposisi SVD</h2>
              <p className="section-subtitle">Struktur matriks hasil dekomposisi pada sistem</p>
            </div>
          </div>

          {/* SVD Equation display */}
          <div
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "24px",
              textAlign: "center",
              marginBottom: "28px",
            }}
          >
            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
              Formulasi SVD
            </p>
            <p
              style={{
                fontSize: "32px",
                fontWeight: 900,
                fontFamily: "var(--font-mono)",
                background: "linear-gradient(135deg, #ffffff, var(--accent-hover))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.05em",
              }}
            >
              A = U · Σ · Vᵀ
            </p>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "10px", lineHeight: 1.7 }}>
              Setiap matriks saluran warna A berukuran M × N dapat dipisahkan secara unik menjadi perkalian tiga matriks berikut.
            </p>
          </div>

          {/* Matrix Description Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
            {[
              {
                symbol: "U",
                shape: "M × k",
                title: "Left Singular Vectors",
                desc: "Merepresentasikan kolom basis ortogonal. Menyimpan detail struktur vertikal dari pola piksel gambar asli.",
                color: "#6366f1",
                shadow: "rgba(99, 102, 241, 0.15)",
              },
              {
                symbol: "Σ",
                shape: "k × k",
                title: "Singular Values",
                desc: "Matriks diagonal yang berisi tingkat signifikansi tiap basis. Nilainya disusun berurutan dari terbesar ke terkecil.",
                color: "#10b981",
                shadow: "rgba(16, 185, 129, 0.15)",
              },
              {
                symbol: "Vᵀ",
                shape: "k × N",
                title: "Right Singular Vectors",
                desc: "Merepresentasikan baris basis ortogonal. Menyimpan detail struktur horizontal dari pola piksel gambar asli.",
                color: "#f59e0b",
                shadow: "rgba(245, 158, 11, 0.15)",
              },
            ].map((mat) => (
              <div
                key={mat.symbol}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px 20px",
                  textAlign: "center",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = mat.color;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${mat.shadow}`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <p style={{ fontSize: "28px", fontWeight: 900, fontFamily: "var(--font-mono)", color: mat.color, marginBottom: "4px" }}>
                  {mat.symbol}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-secondary)",
                    marginBottom: "12px",
                    background: "rgba(255,255,255,0.03)",
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    border: "1px solid var(--border)",
                  }}
                >
                  {mat.shape}
                </p>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>{mat.title}</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>{mat.desc}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "18px 24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            <p style={{ marginBottom: "8px" }}>
              💡 <strong>Mengapa kualitas gambar berkurang saat $k$ terlalu kecil?</strong>
            </p>
            <p>
              Nilai singular menyimpan informasi intensitas visual. Komponen pertama ($S_1$) memuat kontribusi energi visual yang sangat besar (sehingga sketsa global gambar langsung terbentuk).
              Komponen-komponen akhir memuat fluktuasi perubahan warna piksel yang kecil dan cepat (detail presisi/tepi gambar).
              Ketika $k$ dipotong secara agresif, kita membuang detail halus tersebut, menyebabkan gambar terkompresi tampak blur atau mengalami penurunan ketajaman warna.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
           HOW TO USE STEP-BY-STEP SECTION
           ═══════════════════════════════════════════════ */}
        <div className="card animate-fade-in-up stagger-4" style={{ marginBottom: "32px" }}>
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
              <h2 className="section-title">Panduan Operasional</h2>
              <p className="section-subtitle">4 langkah mudah melakukan kompresi gambar di sistem ini</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              {
                step: "1",
                title: "Unggah Gambar",
                desc: "Seret & letakkan atau pilih file gambar dari perangkat Anda di halaman Kompresor.",
                color: "#6366f1",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Atur Nilai Rank (k)",
                desc: "Geser slider untuk menentukan jumlah nilai singular yang ingin Anda pertahankan.",
                color: "#f59e0b",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="21" x2="4" y2="14" />
                    <line x1="4" y1="10" x2="4" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="3" />
                    <line x1="20" y1="21" x2="20" y2="16" />
                    <line x1="20" y1="12" x2="20" y2="3" />
                    <line x1="1" y1="14" x2="7" y2="14" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                    <line x1="17" y1="16" x2="23" y2="16" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Eksekusi SVD",
                desc: "Tekan tombol Kompresi. Server akan mendekomposisi matriks secara otomatis.",
                color: "#10b981",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
              },
              {
                step: "4",
                title: "Analisis & Unduh",
                desc: "Evaluasi perbedaan kualitas, periksa grafik scree plot, lalu unduh gambar JPEG terkompresi.",
                color: "#06b6d4",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                ),
              },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px 20px",
                  textAlign: "center",
                  position: "relative",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-bright)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "26px",
                    height: "26px",
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
                <div style={{ color: s.color, marginBottom: "14px", marginTop: "6px", display: "flex", justifyContent: "center" }}>
                  {s.icon}
                </div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>{s.title}</p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════
         FOOTER
         ═══════════════════════════════════════════════ */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px 24px",
          borderTop: "1px solid var(--border)",
          background: "rgba(6, 6, 10, 0.7)",
          backdropFilter: "blur(20px)",
        }}
      >
        <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7 }}>
          SVD Image Compressor — Dibuat dengan{" "}
          <span style={{ color: "var(--accent-hover)", fontWeight: 600 }}>FastAPI</span> (Backend) &{" "}
          <span style={{ color: "var(--accent-hover)", fontWeight: 600 }}>Next.js</span> (Frontend)
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "6px" }}>
          Projek Metode Numerik · Singular Value Decomposition
        </p>
      </footer>
    </>
  );
}
