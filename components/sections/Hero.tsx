"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Drift, Magnetic, Spotlight } from "@/components/ui/motion/pointer";
import { CountUp, RotatingWord, SplitText, TypeCycle } from "@/components/ui/motion/text";

/**
 * ============================================================
 * HERO
 *
 * HEADLINE OPTIONS — pick one, delete the rest:
 *
 * The headline is a TYPEWRITER that cycles one word through the four
 * services, then resolves on a fixed second line:
 *
 *     Your book.   ->   Your brand.   ->   Your video.   ->   Your launch.
 *     We've got you covered.                                (fixed)
 *
 * Edit HEADLINE_WORDS below to change the cycle. Words are kept to 4-6
 * characters on purpose: the line reflows as each word types, and a wildly
 * longer word makes the line visibly jump. ("trailer" was dropped for
 * "video" for exactly this reason.)
 *
 * Retired alternatives:
 *   - "Your book. Your brand. Your launch."  (static three-beat version)
 *   - "Your book. Designed, formatted, and ready to publish."  (named only
 *     two of the four services, so the entry point read as a book shop)
 *
 * KEEP ALL FOUR SERVICES VISIBLE ABOVE THE FOLD. The headline cycles them
 * one at a time; the subheadline and the four stats below show all four at
 * once. If you edit one, check the others still balance.
 * ============================================================
 */

/**
 * TRUST BAR — TODO: replace with the agency's real numbers before launch.
 *
 * One stat per service, deliberately: this row is the fastest way a visitor
 * scanning the first screen learns we do more than books. Do not collapse it
 * back to four book-related numbers.
 *
 * The store names (KDP / IngramSpark / Lulu) moved to the ticker band
 * immediately below, which is where that credibility signal now lives.
 */
type Stat =
  /** Counts up from zero when scrolled into view. */
  | { kind: "count"; value: number; decimals?: number; suffix?: string; label: string }
  /** Cycles words in place — still supported, currently unused. Useful when a
   *  cell needs to say several things (e.g. store names) without wrapping. */
  | { kind: "rotate"; words: readonly string[]; label: string };

/**
 * The words the hero headline types through — one per service, ending on the
 * outcome. Keep them short and similar in length (see the note above).
 */
const HEADLINE_WORDS = ["book", "brand", "video", "launch"] as const;

const trustStats: Stat[] = [
  { kind: "count", value: 120, suffix: "+", label: "Covers designed" },
  { kind: "count", value: 500, suffix: "+", label: "Books formatted" },
  { kind: "count", value: 60, suffix: "+", label: "Author brands built" },
  { kind: "count", value: 240, suffix: "+", label: "Videos edited" },
];

export default function Hero() {
  const reduced = useReducedMotion();

  /**
   * Entrance props for the hero's on-load sequence.
   *
   * Returns nothing at all when the visitor asks for reduced motion, so the
   * element renders in its final state. Content must never be able to get
   * stuck invisible because an animation did not run — which is exactly what
   * a long `delay` risks on a throttled or backgrounded tab.
   */
  const rise = (delay: number, y = 20) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
      {/* ---------- Animated background ----------
          Each layer drifts a few px against the cursor at a different rate,
          which is what stops the hero reading as a flat screenshot. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-primary-light/70 via-primary-light/25 to-transparent" />

        <Drift distance={26} className="absolute inset-0">
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
        </Drift>

        <Drift distance={14} invert className="absolute inset-0">
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
        </Drift>

        {/* Geometric arcs echoing the Gomaq mark — one draws in, one rotates. */}
        <Drift distance={34} className="absolute inset-0">
          <motion.div
            className="absolute right-[6%] top-[14%] hidden aspect-square w-[30rem] rounded-full border border-primary/20 lg:block"
            initial={{ opacity: 0, scale: 0.9, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
          <motion.div
            className="absolute -left-[6%] top-[54%] hidden aspect-square w-[18rem] rounded-full border border-dashed border-primary/25 lg:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />
        </Drift>
      </div>

      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          {/* Script accent — set like a title-page ornament. */}
          <motion.p
            className="flex items-center justify-center gap-3 font-script text-[26px] leading-none text-primary sm:text-[30px]"
            {...rise(0, 12)}
          >
            <motion.span
              className="h-px bg-primary/35"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
            for independent authors
            <motion.span
              className="h-px bg-primary/35"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
          </motion.p>

          {/* Headline: one word types through the four services, over a
              fixed second line. The whole block fades up once; the typing
              carries the motion from there. */}
          <motion.h1
            className="mt-6 font-display font-normal text-ink"
            {...rise(0.1, 16)}
          >
            <span className="block whitespace-nowrap text-display-xl">
              Your{" "}
              <TypeCycle
                words={HEADLINE_WORDS}
                suffix="."
                className="italic text-primary"
              />
            </span>
            {/* Tagline, not a second headline: roughly a third the size of the
                line above, and held to ONE line at every breakpoint. The size
                ceiling is what keeps it on one line — if you lengthen this
                copy, re-check 375px, where it has ~320px to work with.

                It reads ITALIC and at FULL ink strength on purpose. It sat at
                `ink/70` first, which on this warm background is virtually the
                same shade as `muted` — the paragraph below — so the two
                blocks blurred into one despite differing in size and
                typeface. Full ink groups it with the headline; the paragraph
                stays muted sans. Keep that contrast if you restyle. */}
            <span className="mt-2 block whitespace-nowrap text-[clamp(1.3rem,2.9vw,2rem)] italic leading-tight tracking-[0.01em] text-ink sm:mt-3">
              We&rsquo;ve got you covered.
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-9 max-w-xl text-lg leading-relaxed text-muted sm:mt-10"
            {...rise(0.55)}
          >
            Cover and interior design. Upload-ready files for every store. An
            author brand readers recognise on the shelf. Video that makes a
            stranger stop scrolling. One studio, from final draft to launch day.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            {...rise(0.65)}
          >
            {/* Magnetic is reserved for primary CTAs — if everything pulls
                at the cursor, nothing feels special. */}
            <Magnetic className="w-full sm:w-auto">
              <Button href="#draft" size="lg" className="group w-full sm:w-auto">
                Get my first draft
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto" strength={0.2}>
              <Button
                href="#portfolio"
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto"
              >
                See our work
              </Button>
            </Magnetic>
          </motion.div>

          <motion.p
            className="mt-5 text-[13px] text-muted"
            {...rise(0.75, 0)}
          >
            Free preview. No card, no commitment, no pitch call.
          </motion.p>
        </div>

        {/* ---------- Trust bar ----------
            Numbers count up on entry; the store names cycle in place; each
            cell lifts and lights up under the cursor. */}
        <motion.ul
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 lg:grid-cols-4"
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
          }}
        >
          {trustStats.map((stat) => (
            <motion.li
              key={stat.label}
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 18 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                      },
                    }
              }
              className="bg-white"
            >
              <Spotlight
                className="h-full transition-colors duration-300 hover:bg-primary-light/40"
                radius={220}
                intensity={0.12}
              >
                <div className="flex h-full flex-col items-center justify-center px-5 py-7 text-center">
                  <p className="font-display text-2xl font-normal leading-none text-primary sm:text-[28px]">
                    {stat.kind === "count" ? (
                      <CountUp
                        value={stat.value}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                      />
                    ) : (
                      <RotatingWord words={stat.words} />
                    )}
                  </p>
                  <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {stat.label}
                  </p>
                </div>
              </Spotlight>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
