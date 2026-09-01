"use client";

import { motion } from "framer-motion";

/**
 * The numeral for a "How It Works" step. Springs up into place as the step
 * scrolls in, then fills solid orange when its step is hovered — so running
 * the cursor down the process lights each stage in turn.
 */
export default function StepNumber({ n, delay = 0 }: { n: number; delay?: number }) {
  return (
    <motion.span
      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white font-display text-2xl font-normal text-primary ring-1 ring-primary/25 transition-colors duration-300 group-hover/step:bg-primary group-hover/step:text-white group-hover/step:ring-primary"
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 300, damping: 16, delay }}
    >
      {n}
      {/* Halo that expands on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 scale-100 rounded-full ring-1 ring-primary/40 opacity-0 transition-all duration-500 group-hover/step:scale-[1.35] group-hover/step:opacity-100"
      />
    </motion.span>
  );
}
