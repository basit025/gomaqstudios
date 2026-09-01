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
 * !! ALL PRICES BELOW ARE PLACEHOLDERS !!
 * TODO: replace `price` on each tier with real pricing before launch,
 * and check the feature bullets match what each package actually includes.
 * If you move to "from $X" or quote-only, edit `price` and `note` together.
 * ============================================================
 */
const TIERS = [
  {
    name: "Starter",
    price: "$499", // PLACEHOLDER
    note: "One book, one store",
    pitch: "For the first-time author who needs a cover and clean files, fast.",
    features: [
      "Custom front cover design",
      "Interior layout & typesetting",
      "eBook files (ePub & Kindle)",
      "One round of revisions",
    ],
    cta: "Start with Starter",
    featured: false,
  },
  {
    name: "Complete Package",
    price: "$1,299", // PLACEHOLDER
    note: "Everything to publish",
    pitch: "The one most authors pick. Print and digital, every major store, done.",
    features: [
      "Full cover: front, spine & back",
      "Print interior + eBook editions",
      "KDP, IngramSpark & Lulu files",
      "Two rounds of revisions",
      "Launch-day upload checklist",
    ],
    cta: "Choose Complete",
    featured: true,
  },
  {
    name: "Full Author Brand",
    price: "$2,499", // PLACEHOLDER
    note: "Book plus platform",
    pitch: "For authors building a shelf, not a single title.",
    features: [
      "Everything in Complete Package",
      "Author logo & brand system",
      "Series-ready cover templates",
      "Book trailer & 3 social cuts",
      "Priority scheduling",
    ],
    cta: "Build my brand",
    featured: false,
  },
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
                className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 transition-all duration-300 sm:p-8 ${
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

                <p className="mt-4 text-[15px] leading-relaxed text-muted">
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

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-[15px] text-muted">
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
