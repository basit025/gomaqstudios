import { Marquee } from "@/components/ui/motion/text";

/**
 * ============================================================
 * TICKER BAND
 * A slow scrolling strip of everything we hand over, sitting between the
 * hero and the interactive demo. Three jobs: it divides the sections, it
 * puts constant gentle motion on the page so a visitor who has stopped
 * scrolling still sees something alive, and it spells out the full range of
 * deliverables — deliberately spanning design, formatting, branding AND
 * video, so the top of the page never reads as book-formatting only.
 * Keep that balance if you edit the list.
 *
 * Pauses on hover so it can actually be read. Edit the list below.
 * ============================================================
 */
const ITEMS = [
  "Cover design",
  "Interior layout",
  "Amazon KDP",
  "IngramSpark",
  "Lulu",
  "ePub & Kindle",
  "Author branding",
  "Series design",
  "Book trailers",
  "Social reels",
] as const;

export default function Ticker() {
  return (
    <section aria-label="What we deliver" className="border-y border-line bg-surface py-6">
      <Marquee items={ITEMS} speed={42} />
    </section>
  );
}
