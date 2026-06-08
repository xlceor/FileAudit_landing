import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FileMaster | Premium Desktop Audit & Reconciliation Suite",
  description: "High-performance enterprise desktop tool designed to reconcile physical folder paths and master datasets utilizing lightweight O(1) set-algebra mathematical engines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100 flex flex-col selection:bg-violet-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
