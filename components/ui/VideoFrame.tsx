/**
 * ============================================================
 * MOCK VIDEO FRAME
 *
 * The video service had nothing of its own to show — trailers and reels were
 * being rendered on 2:3 book covers, which is why the portfolio read as a
 * shelf of books no matter which filter you picked.
 *
 * This is a player still: 16:9 for a trailer, 9:16 for a social reel, with a
 * play control, a scrub bar and a lower-third title. It is instantly legible
 * as video at thumbnail size, which is the whole point.
 *
 * Colours are PINNED to literal values, like the other artwork components —
 * a video still looks the same in either theme.
 * ============================================================
 */

type Props = {
  title: string;
  /** Small label above the title, e.g. "Launch trailer". */
  kind?: string;
  /** `wide` = 16:9 trailer, `reel` = 9:16 vertical social cut. */
  ratio?: "wide" | "reel";
  /** Where the scrub head sits, 0-1. Purely decorative. */
  progress?: number;
  duration?: string;
  className?: string;
};

export default function VideoFrame({
  title,
  kind = "Launch trailer",
  ratio = "wide",
  progress = 0.38,
  duration = "0:42",
  className = "",
}: Props) {
  const pct = Math.round(Math.min(Math.max(progress, 0), 1) * 100);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-[#2B211C] shadow-lift ${
        ratio === "wide" ? "aspect-video" : "aspect-[9/16]"
      } ${className}`}
    >
      {/* Warm cinematic wash so it does not read as a flat black box. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_15%,rgba(193,68,14,0.42),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25"
      />

      {/* Duration badge */}
      <span className="absolute right-3 top-3 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white/85 backdrop-blur-sm">
        {duration}
      </span>

      {/* Play control */}
      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#C1440E] shadow-lg">
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5" aria-hidden="true">
          <path d="M8.5 6.4a1 1 0 0 1 1.52-.85l7.2 4.6a1 1 0 0 1 0 1.7l-7.2 4.6A1 1 0 0 1 8.5 15.6z" />
        </svg>
      </span>

      {/* Lower third + scrub bar */}
      <div className="absolute inset-x-0 bottom-0 p-[6%]">
        <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#E2703C]">
          {kind}
        </p>
        <h3 className="mt-1 truncate font-display text-[clamp(0.9rem,2.2vw,1.35rem)] font-normal leading-tight text-white">
          {title}
        </h3>

        <div className="mt-3 flex items-center gap-2">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-[#E2703C]" style={{ width: `${pct}%` }} />
          </div>
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#E2703C]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
