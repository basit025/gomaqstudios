"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";
import { DrawLine } from "@/components/ui/motion/scroll";
import { Magnetic } from "@/components/ui/motion/pointer";
import StepNumber from "@/components/ui/StepNumber";

/**
 * ============================================================
 * HOW IT WORKS — 4 steps.
 *
 * A single VERTICAL timeline at every breakpoint.
 *
 * It was previously four columns across on desktop, which squeezed each step
 * into a ~250px column, set the copy as four narrow ragged blocks, and made
 * the steps read as simultaneous rather than sequential. Reading top-to-bottom
 * matches the order the work actually happens in and gives each step a full
 * measure of text.
 *
 * On lg and up the timeline ALTERNATES: the rail runs down the centre and
 * each step sits on the opposite side to the one before it, sliding in from
 * its own side. Below lg there is not enough width for two columns, so it
 * collapses to a single left rail — the steps still alternate their slide
 * direction, which keeps the rhythm.
 *
 * The connector rule draws itself downward as you scroll, so the sequence
 * reveals in order rather than all at once.
 * ============================================================
 */
const STEPS = [
  {
    title: "Share your manuscript",
    body: "Send the file and tell us what the book is trying to do. That is the whole brief.",
  },
  {
    title: "We design & format",
    body: "Cover concepts, interior typesetting and store-ready files, built together so nothing clashes.",
  },
  {
    title: "You review & revise",
    body: "Two full rounds of changes. We keep going until it looks like the book you pictured.",
  },
  {
    title: "Publish everywhere",
    body: "Final files for KDP, IngramSpark, Lulu and eBook, packaged and labelled for upload.",
  },
];

export default function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section id="how-it-works" className="bg-primary-light/50 py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, no mystery."
          subtitle="You stay the author. We handle everything that happens between the last sentence and the upload button."
        />

        <div className="relative mx-auto mt-14 max-w-2xl sm:mt-16 lg:max-w-4xl">
          {/* Connector threading the numerals: down the left edge on small
              screens (left-7 == half the 56px numeral), down the centre once
              the layout alternates. */}
          <DrawLine
            vertical
            className="absolute bottom-8 left-7 top-8 -translate-x-1/2 lg:left-1/2"
          />

          <ol className="space-y-14 sm:space-y-16">
            {STEPS.map((step, i) => {
              // Even-indexed steps sit left of the rail, odd ones right.
              const onLeft = i % 2 === 0;

              return (
                <motion.li
                  key={step.title}
                  className="group/step relative flex gap-5 sm:gap-7 lg:grid lg:grid-cols-[1fr_3.5rem_1fr] lg:items-start lg:gap-8"
                  /* Each step enters from its own side, so the eye is thrown
                     left-right-left on the way down. */
                  initial={
                    reduced ? false : { opacity: 0, y: 26, x: onLeft ? -34 : 34 }
                  }
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  /* The negative bottom margin pulls the trigger line up to
                     roughly three-quarters down the viewport, so a step only
                     animates once it has properly arrived rather than the
                     moment it clips the bottom edge. That is what makes them
                     arrive one at a time on the way down. */
                  viewport={{ once: true, amount: 0.35, margin: "0px 0px -22% 0px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <StepNumber n={i + 1} className="lg:col-start-2 lg:row-start-1" />

                  <div
                    className={`pt-2.5 sm:pt-3 lg:row-start-1 ${
                      onLeft ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"
                    }`}
                  >
                    <h3 className="font-display text-xl font-normal leading-tight text-ink transition-colors duration-300 group-hover/step:text-primary sm:text-2xl">
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 max-w-md text-[15px] leading-relaxed text-muted sm:text-base ${
                        onLeft ? "lg:ml-auto" : ""
                      }`}
                    >
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Magnetic className="w-full sm:w-auto">
              <Button href="#contact" size="lg" className="group w-full sm:w-auto">
                Start step one
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Button href="#pricing" variant="outline" size="lg" className="w-full sm:w-auto">
              See what it costs
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
