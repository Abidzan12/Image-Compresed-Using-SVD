import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SVD Image Compressor — Matrix Decomposition",
  description: "Compress images using Singular Value Decomposition (SVD). Analyze singular values, scree plots, and cumulative energy interactively.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
