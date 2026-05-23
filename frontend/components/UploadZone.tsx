"use client";

import { useCallback, useState } from "react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  currentFile: File | null;
}

export default function UploadZone({ onFileSelect, currentFile }: UploadZoneProps) {
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

  return (
    <div
      id="upload-zone"
      className="card"
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: dragging
          ? "2px dashed var(--accent)"
          : currentFile
          ? "2px dashed var(--success)"
          : "2px dashed var(--border-bright)",
        background: dragging
          ? "rgba(99,102,241,0.06)"
          : currentFile
          ? "rgba(16,185,129,0.04)"
          : "var(--bg-card)",
        cursor: "pointer",
        textAlign: "center",
        padding: "56px 24px",
        transition: "all 0.25s ease",
        boxShadow: dragging ? "0 0 40px var(--accent-glow)" : "none",
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
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
          <p style={{ fontSize: "17px", fontWeight: 600, color: "var(--success)", marginBottom: "6px" }}>
            {currentFile.name}
          </p>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            {(currentFile.size / 1024).toFixed(1)} KB — Klik untuk ganti gambar
          </p>
        </div>
      ) : (
        <div>
          <div
            style={{
              width: "72px",
              height: "72px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              margin: "0 auto 20px",
              border: "1px solid rgba(99,102,241,0.3)",
            }}
          >
            🖼️
          </div>
          <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
            {dragging ? "Lepaskan gambar di sini" : "Drag & drop gambar"}
          </p>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
            atau klik untuk memilih file
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            {["PNG", "JPG", "WEBP", "BMP"].map((fmt) => (
              <span key={fmt} className="tag" style={{ fontSize: "11px" }}>
                {fmt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
