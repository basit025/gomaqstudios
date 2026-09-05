"use client";

import type { ReactNode } from "react";
import { Spotlight } from "./motion/pointer";

type Props = {
  children: ReactNode;
  className?: string;
  /** Adds the lift + orange-border hover animation. */
  interactive?: boolean;
  /** Adds a warm glow that tracks the cursor across the card. */
  spotlight?: boolean;
};

/**
 * Neutral surface primitive: white, hairline border, generous radius.
 *
 * With `spotlight`, the surface classes move onto <Spotlight>, which paints
 * the glow in its own stacking context — above the card's background, below
 * its content — so no wrapper is introduced and any layout the caller passes
 * (flex, grid, h-full) still works.
 */
export default function Card({
  children,
  className = "",
  interactive = false,
  spotlight = false,
}: Props) {
  const classes = [
    "rounded-2xl border border-line bg-surface",
    interactive &&
      "transition-all duration-300 hover:border-primary/60 hover:shadow-lift",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (spotlight) {
    return <Spotlight className={classes}>{children}</Spotlight>;
  }

  return <div className={classes}>{children}</div>;
}
