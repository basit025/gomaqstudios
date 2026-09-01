import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * ============================================================
 * HOW IT WORKS — 4 steps.
 * Horizontal on desktop (connected by a hairline rule),
 * vertical on mobile (connected by a left spine).
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
  return (
    <section id="how-it-works" className="bg-primary-light/50 py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, no mystery."
          subtitle="You stay the author. We handle everything that happens between the last sentence and the upload button."
        />

        <div className="relative mt-14 sm:mt-16">
          {/* Desktop connector rule, sitting behind the numerals. */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-primary/20 lg:block"
          />

          <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <li className="relative flex gap-5 lg:block">
                  {/* Mobile vertical spine between steps. */}
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-7 top-16 h-[calc(100%-1rem)] w-px bg-primary/25 lg:hidden"
                    />
                  )}

                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white font-display text-xl font-semibold text-primary ring-1 ring-primary/25">
                    {i + 1}
                  </span>

                  <div className="lg:mt-6">
                    <h3 className="font-display text-xl font-semibold leading-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-xs text-[15px] leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="#contact" size="lg" className="w-full sm:w-auto">
              Start step one
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#pricing" variant="outline" size="lg" className="w-full sm:w-auto">
              See what it costs
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
