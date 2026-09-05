"use client";

import { motion } from "framer-motion";

/**
 * The numeral for a "How It Works" step. Springs up into place as the step
 * scrolls in, then fills solid orange when its step is hovered — so running
 * the cursor down the process lights each stage in turn.
 */
export default function StepNumber({
  n,
  delay = 0,
  className = "",
}: {
  n: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface font-display text-2xl font-normal text-primary ring-1 ring-primary/25 transition-colors duration-300 group-hover/step:bg-primary group-hover/step:text-on-primary group-hover/step:ring-primary ${className}`}
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      /* Same trigger line as the step body in HowItWorks, so the numeral and
         its text arrive together rather than the circle popping early. */
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -22% 0px" }}
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
