import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** `solid` = filled orange pill (e.g. "Most Popular"). */
  tone?: "soft" | "solid" | "outline";
  className?: string;
};

/** Small pill label: trust bar stats, "Most Popular", portfolio genres. */
export default function Badge({ children, tone = "soft", className = "" }: Props) {
  const tones = {
    soft: "bg-primary-light text-primary-dark",
    solid: "bg-primary text-on-primary shadow-ember",
    outline: "bg-surface/80 text-ink ring-1 ring-inset ring-line backdrop-blur",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
