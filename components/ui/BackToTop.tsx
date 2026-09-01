"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Magnetic } from "./motion/pointer";

/**
 * Floating "back to top" control.
 *
 * The ring around it is the page's scroll progress, so it doubles as a
 * position indicator — it earns its corner rather than just being a shortcut.
 * Appears once the visitor is past the first screen and is magnetic to the
 * cursor like the other primary actions.
 */
export default function BackToTop() {
  const [shown, setShown] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          className="fixed bottom-6 right-5 z-40 sm:bottom-8 sm:right-8"
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <Magnetic strength={0.35}>
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "auto"
                    : "smooth",
                })
              }
              aria-label="Back to top"
              className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lift ring-1 ring-line transition-colors duration-300 hover:bg-primary hover:text-white hover:ring-primary"
            >
              {/* Scroll-progress ring. rotate -90 puts 0% at 12 o'clock. */}
              <svg
                viewBox="0 0 48 48"
                className="pointer-events-none absolute inset-0 -rotate-90"
                aria-hidden="true"
              >
                <motion.circle
                  cx="24"
                  cy="24"
                  r="22.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ pathLength: progress }}
                />
              </svg>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
