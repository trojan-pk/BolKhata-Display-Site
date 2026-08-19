import { Plus_Jakarta_Sans, Newsreader, IBM_Plex_Mono } from "next/font/google";

/**
 * Three faces, three jobs.
 *
 *   Plus Jakarta Sans — the product's own voice: headlines, UI, body.
 *   Newsreader        — used almost exclusively in italic. The *human* voice:
 *                       spoken lines and quotes, never chrome.
 *   IBM Plex Mono     — the record: amounts, dates, gutter labels.
 *
 * Self-hosted by next/font, so there is no external font request and no
 * layout shift on first paint.
 *
 * The variables are named after the typeface rather than the role, because the
 * role names (--font-sans and friends) belong to Tailwind's theme. Mapping
 * role → face happens once, in globals.css.
 */

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const fontClass = `${jakarta.variable} ${newsreader.variable} ${plexMono.variable}`;
