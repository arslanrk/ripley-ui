import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Rhea Ripley - WWE Superstar | Official Portfolio",
  description: "Official portfolio of Rhea Ripley - WWE Superstar, The Mami. Explore achievements, gallery, videos, and official merchandise.",
  keywords: ["Rhea Ripley", "WWE", "Wrestling", "The Mami", "WWE Superstar"],
  authors: [{ name: "Rhea Ripley" }],
  openGraph: {
    title: "Rhea Ripley - WWE Superstar",
    description: "Official portfolio of Rhea Ripley - WWE Superstar, The Mami",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
