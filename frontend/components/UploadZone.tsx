"use client";

import { useCallback, useState } from "react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  currentFile: File | null;
}

export default function UploadZone({
  onFileSelect,
  currentFile,
}: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const borderStyle = dragging
    ? "2px dashed var(--accent)"
    : currentFile
    ? "2px dashed var(--success)"
    : "2px dashed rgba(255,255,255,0.08)";

  const bgStyle = dragging
    ? "rgba(99,102,241,0.08)"
    : currentFile
    ? "rgba(16,185,129,0.04)"
    : "var(--bg-card)";

  return (
    <div
      id="upload-zone"
      className="card"
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: borderStyle,
        background: bgStyle,
        backdropFilter: "blur(20px)",
        cursor: "pointer",
        textAlign: "center",
        padding: "60px 24px",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: dragging
          ? "0 0 60px rgba(99,102,241,0.15), inset 0 0 30px rgba(99,102,241,0.05)"
          : "none",
      }}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleInputChange}
      />

      {currentFile ? (
        <div className="animate-fade-in-up">
          {/* Success Icon */}
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 16px",
              background:
                "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.15))",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--success)",
              marginBottom: "6px",
            }}
          >
            {currentFile.name}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
            }}
          >
            {(currentFile.size / 1024).toFixed(1)} KB — Klik untuk ganti gambar
          </p>
        </div>
      ) : (
        <div>
          {/* Upload Icon */}
          <div
            className={dragging ? "animate-float" : ""}
            style={{
              width: "72px",
              height: "72px",
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              border: "1px solid rgba(99,102,241,0.2)",
              transition: "all 0.3s",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#818cf8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>

          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "8px",
              letterSpacing: "-0.01em",
            }}
          >
            {dragging ? "Lepaskan gambar di sini" : "Drag & drop gambar"}
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              marginBottom: "20px",
            }}
          >
            atau klik untuk memilih file
          </p>

          {/* Format tags */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["PNG", "JPG", "WEBP", "BMP"].map((fmt, i) => (
              <span
                key={fmt}
                className="tag"
                style={{
                  fontSize: "11px",
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {fmt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
