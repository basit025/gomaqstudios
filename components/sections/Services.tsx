import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ArrowRight,
  IconBrand,
  IconDesign,
  IconFormat,
  IconVideo,
} from "@/components/ui/Icons";
import { Tilt } from "@/components/ui/motion/pointer";

/**
 * ============================================================
 * SERVICES — the four pillars.
 * Copy is written for an author, not a "business owner".
 * Edit the SERVICES array below to change headlines, copy or links.
 * ============================================================
 */
const SERVICES = [
  {
    icon: IconDesign,
    title: "Book Design",
    body:
      "Covers that earn a second look in a thumbnail grid, and interiors that carry a reader from page one to the last line without ever getting in the way.",
    points: ["Front, spine & back cover", "Interior layout & typesetting", "Print and digital editions"],
    href: "#portfolio",
    cta: "See covers",
  },
  {
    icon: IconFormat,
    title: "Book Formatting",
    body:
      "Files that upload the first time. No rejected covers, no broken margins, no reflowed chapter breaks two days before launch.",
    points: [
      "Amazon KDP (paperback & hardcover)",
      "IngramSpark & Lulu print files",
      "ePub & Kindle (.epub / .mobi)",
    ],
    href: "#portfolio",
    cta: "See formats",
  },
  {
    icon: IconBrand,
    title: "Complete Brand Development",
    body:
      "You are not publishing one book, you are building a shelf. An author identity that holds together across covers, socials and everything after.",
    points: ["Author logo & wordmark", "Colour, type & series system", "Social and website assets"],
    href: "#portfolio",
    cta: "See brands",
  },
  {
    icon: IconVideo,
    title: "Video Editing",
    body:
      "Book trailers, reels and launch clips cut to make a stranger stop scrolling and actually want to read the first chapter.",
    points: ["Book trailers", "Reels, Shorts & TikTok cuts", "Launch & interview edits"],
    href: "#portfolio",
    cta: "See video",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="What we do"
          title="Four things, done properly."
          subtitle="Everything between a finished manuscript and a book your readers can hold, download and recommend."
        />

        <div className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.08} className="h-full">
                <Tilt className="h-full" max={6}>
                  <Card interactive spotlight className="group flex h-full flex-col p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-6 font-display text-[22px] font-normal leading-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {service.body}
                  </p>

                  <ul className="mt-5 space-y-1.5 border-t border-line pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[13px] text-ink/70"
                      >
                        <span
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Text-link CTA — every card ends with a next step. */}
                  <a
                    href={service.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    {service.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  </Card>
                </Tilt>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-[15px] text-muted">
            Not sure which you need?{" "}
            <a
              href="#contact"
              className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary-dark hover:decoration-primary"
            >
              Tell us about your book
            </a>{" "}
            and we&rsquo;ll tell you honestly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
