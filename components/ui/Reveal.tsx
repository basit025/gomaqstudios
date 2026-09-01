"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Seconds to stagger this element behind its siblings. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  className?: string;
};

/**
 * Scroll-triggered fade + slide-up. Fires once when ~15% of the element
 * enters the viewport. Used to animate every section on the page.
 */
export default function Reveal({ children, delay = 0, y = 24, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
