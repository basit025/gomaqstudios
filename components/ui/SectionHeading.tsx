"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { SplitText, type Chunk } from "./motion/text";

type Props = {
  /** Small uppercase label above the headline. */
  eyebrow?: string;
  /** Plain string, or chunks when part of the line needs its own styling. */
  title: string | (string | Chunk)[];
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Shared eyebrow + display headline + subtitle block used by every section.
 * The headline reveals word by word as it scrolls in; the eyebrow rule draws
 * itself out from the label.
 */
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
          <p className={`eyebrow ${centered ? "justify-center" : ""}`}>
            <motion.span
              className="h-px bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
            {eyebrow}
          </p>
        </Reveal>
      )}

      <SplitText
        as="h2"
        chunks={title}
        delay={0.08}
        className="mt-4 font-display text-display-lg font-normal text-ink"
      />

      {subtitle && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
