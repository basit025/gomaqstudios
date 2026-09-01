import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  /** Small uppercase label above the headline. */
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Shared eyebrow + display headline + subtitle block used by every section. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={[
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left",
        className,
      ].join(" ")}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow">
            <span className="h-px w-6 bg-primary" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-display-lg font-normal text-ink">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
