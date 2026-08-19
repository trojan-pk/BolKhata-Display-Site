import type { Metadata, Viewport } from "next";
import { fontClass } from "./fonts";
import "./globals.css";

const SITE = "https://bolkhata.app";

const DESCRIPTION =
  "BolKhata is a voice agent for small-business bookkeeping. Describe a transaction in one sentence; it posts the entry to a double-entry ledger, tracks receivables, and reconciles the day.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "BolKhata — voice-first bookkeeping",
    template: "%s · BolKhata",
  },
  description: DESCRIPTION,
  keywords: [
    "voice ledger",
    "voice bookkeeping",
    "agentic accounting",
    "small business accounting",
    "receivables tracking",
    "double-entry ledger",
    "BolKhata",
  ],
  authors: [{ name: "BolKhata" }],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "BolKhata",
    title: "BolKhata — voice-first bookkeeping",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "BolKhata — voice-first bookkeeping",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fcfcfb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontClass}>
      <body>{children}</body>
    </html>
  );
}
