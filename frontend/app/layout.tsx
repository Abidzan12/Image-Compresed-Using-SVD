import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SVD Image Compressor — Singular Value Decomposition",
  description:
    "Kompres gambar menggunakan dekomposisi matriks Singular Value Decomposition (SVD). Analisis singular values, scree plots, dan energi kumulatif secara interaktif.",
  keywords: ["SVD", "image compression", "singular value decomposition", "matrix decomposition"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
