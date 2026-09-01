import { Instrument_Sans, Instrument_Serif, Ms_Madi } from "next/font/google";

/**
 * ============================================================
 * TYPE SYSTEM — three families, each with one job.
 *
 *  display  Instrument Serif  -> headlines only
 *  sans     Instrument Sans   -> body copy, UI, labels
 *  script   Ms Madi           -> accents only, never body
 *
 * Instrument Serif + Instrument Sans are a designed pair (same
 * family, same designers), so the serif and sans agree on
 * proportion and rhythm without any tuning.
 *
 * !! IMPORTANT — Instrument Serif ships in 400 ONLY. !!
 * There is no bold cut. Never apply `font-bold` / `font-semibold`
 * to a `font-display` element: the browser will synthesise a
 * smeared faux-bold. Size and colour carry the emphasis instead —
 * at display sizes its thick stems already read as bold.
 * Its true italic IS available (`italic`) and is used for accents.
 *
 * Ms Madi is a fine-line signature hand. It gets delicate fast, so
 * it is never set below ~17px, never in a solid block, and never
 * for anything a visitor must read to understand the page.
 * ============================================================
 */

export const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

export const sans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const script = Ms_Madi({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-script",
});
