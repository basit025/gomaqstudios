type Props = {
  /** Text shown in the middle of the box, e.g. "LOGO" or "VIDEO STILL". */
  label?: string;
  /** Tailwind aspect utility, e.g. "aspect-[2/3]" or "aspect-video". */
  aspect?: string;
  /** `orange` for on-brand slots, `neutral` for quieter ones. */
  tone?: "orange" | "neutral";
  className?: string;
};

/**
 * Stand-in for any real asset that hasn't been supplied yet.
 * Never leaves a broken <img> — it's a styled box with a label.
 * Replace usages with <Image /> once real artwork lands in /public.
 */
export default function Placeholder({
  label = "IMAGE",
  aspect = "aspect-[4/3]",
  tone = "orange",
  className = "",
}: Props) {
  const tones = {
    orange:
      "bg-primary-light text-primary-dark/70 border-primary/20 [--dash:rgb(var(--color-primary-rgb)/0.18)]",
    neutral: "bg-[#F4F1EF] text-muted border-line [--dash:rgb(var(--color-muted-rgb)/0.2)]",
  } as const;

  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-dashed ${aspect} ${tones[tone]} ${className}`}
    >
      {/* Diagonal hatch so the box reads clearly as a placeholder. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--dash) 0 1px, transparent 1px 10px)",
        }}
      />
      <span className="relative text-[11px] font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
    </div>
  );
}
