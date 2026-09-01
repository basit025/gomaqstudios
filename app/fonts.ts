import { Fraunces, Manrope } from "next/font/google";

/**
 * Type pairing:
 *  - Fraunces  -> display serif with genuine editorial character (old-style,
 *                 high contrast). Reads "boutique publishing house", not SaaS.
 *  - Manrope   -> geometric-humanist sans for body + UI. Quiet, very legible.
 *
 * Swap either here; the CSS variables feed Tailwind's `font-display` / `font-sans`.
 */
export const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const sans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
