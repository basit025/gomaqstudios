import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { Magnetic, Spotlight, Tilt } from "@/components/ui/motion/pointer";

/**
 * ============================================================
 * PRICING
 *
 * !! CONFIRM THESE NUMBERS BEFORE LAUNCH — THEY ARE A PROPOSAL !!
 *
 * The ladder and structure are benchmarked against HMD Publishing
 * (£997 / £2,997 / £4,997, most-popular badge on the middle tier,
 * turnaround and revision rounds stated up front, plus a row of
 * "individual services from £X").
 *
 * Prices here are NOT a straight conversion of theirs, because the scope is
 * different: their packages include proofreading and editing, Amazon Ads,
 * audiobook production, an author website and PR outreach. We do none of
 * those. So the tiers sit below the equivalent HMD tier, and the copy never
 * implies editing is included.
 *
 * The .97 price endings are the convention in this category — HMD and most
 * author-services studios use them. Drop them for round numbers if you would
 * rather read as a design studio than a publishing service.
 *
 * Two structural ideas worth keeping: `turnaround` and `revisions` are the
 * first two questions every author asks, so they sit right under the price
 * instead of being buried in a bullet list.
 * ============================================================
 */
const TIERS = [
  {
    name: "Starter",
    price: "$797", // CONFIRM
    note: "One book, one store",
    turnaround: "15 business days",
    revisions: "1 revision round",
    pitch: "For the first-time author who needs a cover and clean files, fast.",
    features: [
      "Custom front cover design",
      "Interior layout & typesetting",
      "eBook files (ePub & Kindle)",
      "KDP upload-ready package",
    ],
    cta: "Start with Starter",
    featured: false,
  },
  {
    name: "Complete Package",
    price: "$1,997", // CONFIRM
    note: "Everything to publish",
    turnaround: "30 business days",
    revisions: "2 revision rounds",
    pitch: "The one most authors pick. Print and digital, every major store, done.",
    features: [
      "Full cover: front, spine & back",
      "Print interior + eBook editions",
      "KDP, IngramSpark & Lulu files",
      "Series-ready cover template",
      "Launch-day upload checklist",
    ],
    cta: "Choose Complete",
    featured: true,
  },
  {
    name: "Full Author Brand",
    price: "$3,497", // CONFIRM
    note: "Book plus platform",
    turnaround: "45 business days",
    revisions: "3 revision rounds",
    pitch: "For authors building a shelf, not a single title.",
    features: [
      "Everything in Complete Package",
      "Author logo & brand system",
      "Colour, type & series guidelines",
      "Book trailer & 3 social cuts",
      "Priority scheduling",
    ],
    cta: "Build my brand",
    featured: false,
  },
];

/**
 * À la carte prices for authors who only need one thing. Doubles as a second
 * reminder that the studio covers all four services, not just books.
 * CONFIRM these alongside the package prices.
 */
const SINGLE_SERVICES = [
  { name: "Cover design", from: "$297" },
  { name: "Interior formatting", from: "$197" },
  { name: "Author branding", from: "$497" },
  { name: "Video editing", from: "$297" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Packages"
          title="Plain pricing, no surprises."
          subtitle="Fixed prices, quoted up front. If your book needs something outside a package, we will say so before you pay anything."
        />

        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-5">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="h-full">
              <Tilt className="h-full" max={5}>
              <Spotlight
                intensity={tier.featured ? 0.16 : 0.1}
                className={`relative flex h-full flex-col rounded-2xl border bg-surface p-7 transition-all duration-300 sm:p-8 ${
                  tier.featured
                    ? "border-primary shadow-lift lg:scale-[1.045] lg:p-9"
                    : "border-line hover:border-primary/60 hover:shadow-soft"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge tone="solid">Most popular</Badge>
                  </div>
                )}

                <h3 className="font-display text-2xl font-normal text-ink">
                  {tier.name}
                </h3>
                <p className="mt-1.5 text-[13px] font-medium uppercase tracking-[0.1em] text-primary">
                  {tier.note}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-[44px] font-normal leading-none text-ink">
                    {tier.price}
                  </span>
                  <span className="text-[13px] text-muted">per book</span>
                </div>

                {/* Turnaround and revisions — the first two questions an author
                    asks, so they sit with the price rather than in the bullets. */}
                <ul className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12px] font-medium text-muted">
                  <li className="rounded-full bg-primary-light px-2.5 py-1 text-primary-dark">
                    {tier.turnaround}
                  </li>
                  <li className="rounded-full bg-primary-light px-2.5 py-1 text-primary-dark">
                    {tier.revisions}
                  </li>
                </ul>

                <p className="mt-5 text-[15px] leading-relaxed text-muted">
                  {tier.pitch}
                </p>

                <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-7">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-[14px] leading-relaxed text-ink/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Magnetic className="mt-8 w-full" strength={tier.featured ? 0.25 : 0.15}>
                <Button
                  href="#contact"
                  variant={tier.featured ? "primary" : "ghost"}
                  size="lg"
                  className="group w-full"
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                </Magnetic>
              </Spotlight>
              </Tilt>
            </Reveal>
          ))}
        </div>

        {/* ---------- À la carte ---------- */}
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-line bg-primary-light/40 p-6 sm:mt-12 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div>
                <h3 className="font-display text-xl font-normal text-ink sm:text-2xl">
                  Only need one thing?
                </h3>
                <p className="mt-1.5 text-[15px] text-muted">
                  Every service is available on its own.
                </p>
              </div>

              <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:gap-x-8">
                {SINGLE_SERVICES.map((service) => (
                  <li key={service.name}>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">
                      {service.name}
                    </p>
                    <p className="mt-1 font-display text-xl text-primary">
                      from {service.from}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-[15px] text-muted">
            Working on something unusual — a box set, a photo book, a series
            relaunch?{" "}
            <a
              href="#contact"
              className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary-dark hover:decoration-primary"
            >
              Ask for a custom quote
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
