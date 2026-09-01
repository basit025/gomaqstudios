"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * ============================================================================
 * SCROLL-LINKED MOTION PRIMITIVES
 * Progress indicator, parallax layers, and the scroll-drawn rule.
 * ============================================================================
 */

/**
 * Thin orange bar that fills across the bottom edge of the sticky header as
 * the visitor moves down the page. Spring-smoothed so trackpad scrolling
 * doesn't make it twitch.
 */
export function ScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className={`h-[2px] origin-left bg-gradient-to-r from-primary via-primary to-primary-dark ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Total travel in px across the element's trip through the viewport. */
  distance?: number;
};

/**
 * Moves its children against the scroll as they cross the viewport, so
 * background layers sit at a different depth from the content on top.
 */
export function Parallax({ children, className = "", distance = 70 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const smooth = useSpring(y, { stiffness: 90, damping: 28, mass: 0.6 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y: smooth }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * A rule that draws itself as the section scrolls into view — left-to-right,
 * or top-to-bottom with `vertical`. Used as the connector threading the four
 * "How It Works" steps together.
 *
 * The container supplies the length: give it a width (horizontal) or a height
 * (vertical), e.g. `absolute inset-y-0 left-7`.
 */
export function DrawLine({
  className = "",
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // A vertical rule spans the whole block, so it tracks the block's entire
    // trip through the viewport rather than firing all at once like the
    // horizontal one did.
    offset: vertical ? ["start 0.85", "end 0.6"] : ["start 0.85", "start 0.35"],
  });
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.div
        className={
          vertical
            ? "h-full w-px origin-top bg-primary/30"
            : "h-px w-full origin-left bg-primary/30"
        }
        style={reduced ? undefined : vertical ? { scaleY: scale } : { scaleX: scale }}
      />
    </div>
  );
}
