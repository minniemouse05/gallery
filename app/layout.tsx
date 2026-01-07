import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Little Sips",
  description:
    "A digitized collection of special little drinks, each carrying a memory, a moment, or a person that I feel grateful for.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-neutral-800 antialiased">
        {children}
      </body>
    </html>
  );
}
