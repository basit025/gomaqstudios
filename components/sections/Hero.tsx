"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * ============================================================
 * HERO
 *
 * HEADLINE OPTIONS — pick one, delete the rest:
 *
 *   A) "Your book. Designed, formatted, and ready to publish."   <-- ACTIVE
 *   B) "You wrote it. We'll make it look like it belongs on a shelf."
 *   C) "Every great manuscript deserves a great cover."
 *
 * The active headline lives in the <h1> below; the alternates are kept
 * here as comments so they're easy to swap.
 * ============================================================
 */

/**
 * TRUST BAR — TODO: replace these with the agency's real numbers before launch.
 * Keep each to 3-5 words; they're scanned, not read.
 */
const trustStats = [
  { value: "500+", label: "Books formatted" },
  { value: "120+", label: "Covers designed" },
  { value: "KDP • IngramSpark • Lulu", label: "Upload-ready files" },
  { value: "4.9/5", label: "Author rating" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
      {/* ---------- Animated background ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Warm wash from the top so the page opens on a tint, not flat white. */}
        <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-primary-light/70 via-primary-light/25 to-transparent" />

        {/* Soft burnt-orange blob, drifts slowly on load. */}
        <motion.div
          className="absolute -right-[18%] -top-[22%] h-[38rem] w-[38rem] rounded-full bg-primary/20 blur-[100px]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, x: [0, 26, 0], y: [0, -18, 0] }}
          transition={{
            opacity: { duration: 1.1, ease: "easeOut" },
            scale: { duration: 1.1, ease: "easeOut" },
            x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute -left-[14%] top-[34%] h-[26rem] w-[26rem] rounded-full bg-primary-dark/10 blur-[90px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: [0, -18, 0], y: [0, 20, 0] }}
          transition={{
            opacity: { duration: 1.2, delay: 0.15 },
            x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Geometric arc echoing the Gomaq mark — draws itself on load. */}
        <motion.div
          className="absolute right-[6%] top-[14%] hidden aspect-square w-[30rem] rounded-full border border-primary/20 lg:block"
          initial={{ opacity: 0, scale: 0.9, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>

      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          {/* Script accent #1 — set like a title-page ornament. */}
          <motion.p
            className="flex items-center justify-center gap-3 font-script text-[26px] leading-none text-primary sm:text-[30px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-px w-8 bg-primary/35" aria-hidden="true" />
            for independent authors
            <span className="h-px w-8 bg-primary/35" aria-hidden="true" />
          </motion.p>

          <motion.h1
            className="mt-6 font-display text-display-xl font-normal text-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            Your book.{" "}
            <span className="relative whitespace-nowrap italic text-primary">
              Designed
              {/* Hand-drawn underline under the accent word. */}
              <motion.svg
                className="absolute -bottom-2 left-0 h-3 w-full text-primary/40"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 8.5C42 3.5 96 2.5 198 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.75, ease: "easeInOut" }}
                />
              </motion.svg>
            </span>
            , formatted, and ready to publish.
          </motion.h1>

          <motion.p
            className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            Covers and interior layout, upload-ready formatting for every store,
            a brand your readers remember, and video that sells the book. One
            studio, from final draft to launch day.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
          >
            <Button href="#draft" size="lg" className="w-full sm:w-auto">
              Get my first draft
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#portfolio" variant="ghost" size="lg" className="w-full sm:w-auto">
              See our work
            </Button>
          </motion.div>

          <motion.p
            className="mt-5 text-[13px] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            Free preview. No card, no commitment, no pitch call.
          </motion.p>
        </div>

        {/* ---------- Trust bar ---------- */}
        <motion.ul
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 lg:grid-cols-4"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {trustStats.map((stat) => (
            <li key={stat.label} className="bg-white px-5 py-6 text-center">
              <p className="font-display text-xl font-normal leading-tight text-primary sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
                {stat.label}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
