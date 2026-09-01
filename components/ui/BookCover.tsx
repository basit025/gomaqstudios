/**
 * ============================================================
 * MOCK BOOK COVER
 * A styled, type-only cover template in the burnt-orange/white system.
 * Used in two places:
 *   1. The "100-Minute Draft" widget result (title + genre the visitor typed)
 *   2. The portfolio grid, as book-cover mockup placeholders
 *
 * It is intentionally CSS-only — no image assets required, so it never
 * renders a broken image. Swap for real cover artwork by replacing the
 * <BookCover /> usages with <Image />.
 * ============================================================
 */

type Variant = "ember" | "paper" | "ink";

type Props = {
  title: string;
  genre: string;
  /** Placeholder byline. */
  author?: string;
  variant?: Variant;
  className?: string;
};

const skins: Record<
  Variant,
  { field: string; title: string; meta: string; rule: string; arc: string; spine: string }
> = {
  ember: {
    field: "bg-primary",
    title: "text-white",
    meta: "text-white/70",
    rule: "bg-white/40",
    arc: "border-white/25",
    spine: "from-black/25 to-transparent",
  },
  paper: {
    field: "bg-primary-light",
    title: "text-ink",
    meta: "text-primary-dark/70",
    rule: "bg-primary/40",
    arc: "border-primary/25",
    spine: "from-primary-dark/20 to-transparent",
  },
  ink: {
    field: "bg-ink",
    title: "text-white",
    meta: "text-primary",
    rule: "bg-primary",
    arc: "border-primary/40",
    spine: "from-black/40 to-transparent",
  },
};

export default function BookCover({
  title,
  genre,
  author = "Your Name Here", // TODO: real author name once a project is live
  variant = "ember",
  className = "",
}: Props) {
  const s = skins[variant];

  return (
    <div
      className={`relative flex aspect-[2/3] w-full flex-col overflow-hidden rounded-l-[3px] rounded-r-xl shadow-lift ${s.field} ${className}`}
    >
      {/* Spine shading along the binding edge — sells the "real book" read. */}
      <div
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-4 bg-gradient-to-r ${s.spine}`}
      />

      {/* Decorative arcs echoing the Gomaq mark. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-[22%] -top-[14%] aspect-square w-[75%] rounded-full border-2 ${s.arc}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-[26%] -left-[18%] aspect-square w-[62%] rounded-full border ${s.arc}`}
      />

      <div className="relative flex h-full flex-col justify-between p-[8%]">
        {/* Imprint */}
        <p className={`text-[8px] font-semibold uppercase tracking-[0.28em] ${s.meta}`}>
          Gomaq Studios
        </p>

        {/* Title block */}
        <div>
          <p className={`text-[8px] font-semibold uppercase tracking-[0.24em] ${s.meta}`}>
            {genre}
          </p>
          <h3
            className={`mt-2 line-clamp-4 font-display text-[clamp(1.05rem,2.4vw,1.6rem)] font-normal leading-[1.08] tracking-tight ${s.title}`}
          >
            {title}
          </h3>
          <div className={`mt-4 h-px w-10 ${s.rule}`} aria-hidden="true" />
        </div>

        {/* Byline */}
        {/* Script accent #3 — a byline, the way it sits on a real cover. */}
        <p
          className={`font-script text-[clamp(1rem,2.4vw,1.45rem)] leading-none ${s.meta}`}
        >
          {author}
        </p>
      </div>
    </div>
  );
}
