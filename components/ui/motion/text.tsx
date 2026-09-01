"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

/**
 * ============================================================================
 * TEXT MOTION PRIMITIVES
 * Headline reveals, animated counters, and the marquee band.
 * ============================================================================
 */

/* ------------------------------------------------------------------ */

/** A run of text inside a headline that can carry its own styling. */
export type Chunk = {
  text: string;
  className?: string;
  /** Decoration rendered inside this chunk's box (e.g. the hero underline). */
  after?: ReactNode;
};

type SplitTextProps = {
  /** A plain string, or chunks when part of the line needs its own styling. */
  chunks: string | (string | Chunk)[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Seconds before the first word moves. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  /** Animate on mount instead of on scroll (used by the hero). */
  immediate?: boolean;
};

const wordVariants = {
  hidden: { opacity: 0, y: "0.42em", filter: "blur(7px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * Reveals a headline word by word — each word rises, sharpens from a blur and
 * fades in, a beat behind the one before it.
 *
 * Words are split on whitespace and kept `inline-block` so the line still
 * wraps naturally at every breakpoint. Descenders are never clipped (there is
 * no overflow mask), which matters with Instrument Serif.
 *
 * Under `prefers-reduced-motion` the text renders instantly, unanimated.
 */
export function SplitText({
  chunks,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 0.045,
  immediate = false,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const list = typeof chunks === "string" ? [chunks] : chunks;

  const MotionTag = motion[Tag];

  const content = list.map((raw, ci) => {
    const chunk: Chunk = typeof raw === "string" ? { text: raw } : raw;
    // Keep whitespace tokens so spacing between words survives the split.
    const tokens = chunk.text.split(/(\s+)/);

    const words = tokens.map((token, ti) => {
      if (token === "") return null;
      if (/^\s+$/.test(token)) return <span key={ti}> </span>;
      return (
        <motion.span
          key={ti}
          variants={reduced ? undefined : wordVariants}
          className="inline-block"
        >
          {token}
        </motion.span>
      );
    });

    // Only box the chunk when it carries a decoration — boxing a long chunk
    // would stop it wrapping on narrow screens.
    return chunk.after ? (
      <span key={ci} className={`relative inline-block ${chunk.className ?? ""}`}>
        {words}
        {chunk.after}
      </span>
    ) : (
      <span key={ci} className={chunk.className}>
        {words}
      </span>
    );
  });

  if (reduced) {
    return <Tag className={className}>{content}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount: 0.25 } })}
      variants={{
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {content}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts from zero to `value` the first time it scrolls into view.
 * Eased so it decelerates into the final number rather than stopping dead.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setShown,
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */

type RotatingWordProps = {
  words: readonly string[];
  /** Milliseconds each word holds. */
  interval?: number;
  className?: string;
};

/**
 * Swaps through a list of words in place. Used for the store names in the
 * trust bar, where listing all three at once wrapped onto two lines and
 * broke the row's alignment.
 */
export function RotatingWord({
  words,
  interval = 2900,
  className = "",
}: RotatingWordProps) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval, reduced]);

  // Reserve the width of the longest word so neighbouring cells never shift.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`relative inline-grid ${className}`}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {longest}
      </span>
      <motion.span
        key={words[i]}
        className="col-start-1 row-start-1"
        /* No blur here, unlike the headline reveal: this word swaps every
           few seconds, so any frame of it must stay legible. */
        initial={reduced ? false : { opacity: 0, y: "0.35em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      >
        {words[i]}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  /** Seconds for one full loop. Higher = slower. */
  speed?: number;
};

/**
 * Infinite scrolling band. The list is rendered twice and translated -50%,
 * so the seam is invisible. Pauses on hover so anyone who wants to read it
 * can. Pure CSS animation — no JS runs while it loops.
 */
export function Marquee({ items, className = "", speed = 38 }: MarqueeProps) {
  const run = [...items, ...items];

  return (
    <div
      className={`group/marquee relative flex overflow-hidden ${className}`}
      role="presentation"
    >
      {/* Fade the band into the page at both ends. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32"
      />

      <div
        className="flex shrink-0 animate-marquee-x items-center gap-10 pr-10 group-hover/marquee:[animation-play-state:paused] sm:gap-14 sm:pr-14"
        style={{ animationDuration: `${speed}s` }}
      >
        {run.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10 sm:gap-14">
            <span className="font-display text-xl text-ink/70 sm:text-2xl">{item}</span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/60"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
