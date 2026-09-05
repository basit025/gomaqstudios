/**
 * ============================================================
 * MOCK BRAND SYSTEM CARD
 *
 * The branding service had nothing to show. Every portfolio tile, every hero
 * artifact and the demo's result were all <BookCover />, so a visitor looking
 * for author branding saw only books and concluded we do books.
 *
 * This is the branding equivalent: a square identity card with a monogram,
 * a palette row and a type specimen — the things an author actually receives.
 *
 * Like <BookCover />, colours are PINNED to literal values rather than theme
 * tokens: it is artwork, and a brand board looks the same in either theme.
 * ============================================================
 */

type Variant = "ember" | "paper" | "ink";

type Props = {
  /** The author or series name. Its initial becomes the monogram. */
  name: string;
  /** Small label above the monogram, e.g. "Author identity". */
  kind?: string;
  variant?: Variant;
  className?: string;
};

const skins: Record<
  Variant,
  { field: string; mark: string; meta: string; rule: string; chips: string[] }
> = {
  ember: {
    field: "bg-[#C1440E]",
    mark: "text-white",
    meta: "text-white/70",
    rule: "bg-white/30",
    chips: ["bg-white", "bg-white/60", "bg-[#2B211C]"],
  },
  paper: {
    field: "bg-[#FDECE1]",
    mark: "text-[#2B211C]",
    meta: "text-[#8F3209]/70",
    rule: "bg-[#C1440E]/30",
    chips: ["bg-[#C1440E]", "bg-[#8F3209]", "bg-[#2B211C]"],
  },
  ink: {
    field: "bg-[#2B211C]",
    mark: "text-white",
    meta: "text-[#C1440E]",
    rule: "bg-[#C1440E]/40",
    chips: ["bg-[#C1440E]", "bg-[#FDECE1]", "bg-white/70"],
  },
};

export default function BrandMark({
  name,
  kind = "Author identity",
  variant = "paper",
  className = "",
}: Props) {
  const s = skins[variant];
  const initial = name.trim().charAt(0).toUpperCase() || "A";

  return (
    <div
      className={`relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-xl p-[9%] shadow-lift ${s.field} ${className}`}
    >
      {/* Construction arcs, echoing how a mark is drawn. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-[18%] -right-[12%] aspect-square w-[62%] rounded-full border ${s.rule.replace("bg-", "border-")}`}
      />

      <p className={`text-[8px] font-semibold uppercase tracking-[0.24em] ${s.meta}`}>
        {kind}
      </p>

      {/* Monogram + wordmark */}
      <div className="relative">
        <p
          className={`font-display text-[clamp(2.5rem,9vw,4rem)] font-normal leading-[0.85] ${s.mark}`}
        >
          {initial}
          <span className={s.meta}>.</span>
        </p>
        <p
          className={`mt-2 truncate font-display text-[clamp(0.7rem,1.9vw,0.95rem)] italic ${s.mark}`}
        >
          {name}
        </p>
      </div>

      <div>
        {/* Palette row — the most recognisable part of a brand board. */}
        <div className="flex gap-1.5">
          {s.chips.map((chip, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full ${chip}`}
            />
          ))}
        </div>
        <div className={`mt-3 h-px w-full ${s.rule}`} aria-hidden="true" />
        <p className={`mt-2 text-[8px] font-semibold uppercase tracking-[0.2em] ${s.meta}`}>
          Logo · Palette · Type
        </p>
      </div>
    </div>
  );
}
