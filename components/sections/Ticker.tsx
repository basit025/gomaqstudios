import { Marquee } from "@/components/ui/motion/text";

/**
 * ============================================================
 * TICKER BAND
 * A slow scrolling strip of everything we hand over, sitting between the
 * hero and the interactive demo. Two jobs: it divides the sections, and it
 * puts constant gentle motion on the page so a visitor who has stopped
 * scrolling still sees something alive.
 *
 * Pauses on hover so it can actually be read. Edit the list below.
 * ============================================================
 */
const ITEMS = [
  "Amazon KDP",
  "IngramSpark",
  "Lulu",
  "ePub & Kindle",
  "Paperback",
  "Hardcover",
  "Interior layout",
  "Series branding",
  "Book trailers",
] as const;

export default function Ticker() {
  return (
    <section aria-label="What we deliver" className="border-y border-line bg-white py-6">
      <Marquee items={ITEMS} speed={42} />
    </section>
  );
}
