"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Stars from "@/components/ui/Stars";
import Button from "@/components/ui/Button";
import { ArrowRight, Quote } from "@/components/ui/Icons";
import { Magnetic, Tilt } from "@/components/ui/motion/pointer";

/**
 * ============================================================
 * TESTIMONIALS
 *
 * PLACEHOLDER CONTENT — every name, book and quote below is invented.
 * TODO: replace with real, permissioned author quotes before launch.
 * Keep quotes to 2-3 sentences; longer ones stop being read.
 *
 * Desktop: 3-column grid. Mobile: auto-rotating carousel (6s per card,
 * pauses once the visitor swipes to a card manually).
 * ============================================================
 */
const TESTIMONIALS = [
  {
    quote:
      "I had been staring at my own manuscript for two years. They gave it a cover I would have picked up in a shop, and suddenly it was a real book.",
    name: "Marguerite Ellery",
    book: "Literary Fiction",
  },
  {
    quote:
      "KDP rejected my files four times before this. Gomaq sent back a package that uploaded first try, on all three stores, with zero notes.",
    name: "Daniel Okonkwo",
    book: "Non-Fiction",
  },
  {
    quote:
      "The interior layout is the part nobody warns you about. Mine finally reads like a book instead of a printed Word document.",
    name: "Priya Raghavan",
    book: "Memoir",
  },
  {
    quote:
      "I came for a cover and left with a whole identity. Book three now looks like it belongs with books one and two, and my socials finally match.",
    name: "Tomás Herrera",
    book: "Author branding",
  },
  {
    quote:
      "I hired them only for video. The trailer and the reels got more preorders in a week than six months of me posting on my own.",
    name: "Ruth Adeyemi",
    book: "Trailer & social cuts",
  },
  {
    quote:
      "Two rounds of revisions and they never once made me feel like I was being difficult. That is rarer than good design.",
    name: "Callum Frost",
    book: "Poetry",
  },
];

const ROTATE_MS = 6000;

function TestimonialCard({
  quote,
  name,
  book,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <Card spotlight className="flex h-full flex-col p-7">
      <Quote className="h-7 w-7 text-primary/35 transition-all duration-500 group-hover/spot:scale-110 group-hover/spot:text-primary/60" />
      <p className="mt-5 flex-1 text-[15px] leading-relaxed text-ink/85">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-6 border-t border-line pt-5">
        <Stars />
        {/* Script accent #2 — author names set as signatures. */}
        <p className="mt-3 font-script text-[27px] leading-none text-ink">{name}</p>
        <p className="mt-0.5 text-[13px] text-muted">{book}</p>
      </div>
    </Card>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Mobile carousel rotation. Harmless on desktop, where the grid is shown.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
      ROTATE_MS,
    );
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="bg-primary-light/50 py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Authors, in their words"
          title="The part we are proudest of."
          subtitle="Authors who came for a cover, a brand, or a launch video. Placeholder quotes for now — real ones go here."
        />

        {/* ---------- Desktop / tablet grid ---------- */}
        <div className="mt-14 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.08} className="h-full">
              <Tilt className="h-full" max={4}>
                <TestimonialCard {...t} />
              </Tilt>
            </Reveal>
          ))}
        </div>

        {/* ---------- Mobile carousel ---------- */}
        <div className="mt-12 md:hidden">
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={TESTIMONIALS[index].name}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <TestimonialCard {...TESTIMONIALS[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots — tapping one pauses auto-rotation. */}
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setPaused(true);
                }}
                aria-label={`Show testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-primary" : "w-2 bg-primary/25"
                }`}
              />
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <Magnetic>
              <Button href="#contact" variant="outline" size="lg" className="group">
                Become the next one
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
