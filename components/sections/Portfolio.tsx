"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import BookCover from "@/components/ui/BookCover";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";
import { Magnetic, Tilt } from "@/components/ui/motion/pointer";

/**
 * ============================================================
 * PORTFOLIO
 *
 * PLACEHOLDER PROJECTS — replace the PROJECTS array with real work.
 * Each item currently renders a CSS-only <BookCover /> mockup so nothing
 * is ever a broken image. To use real artwork, swap the <BookCover />
 * for <Image src={project.image} ... /> and add `image` to each entry.
 *
 * Filtering is entirely client-side — no backend involved.
 * ============================================================
 */

const FILTERS = ["All", "Book Covers", "Formatting", "Branding", "Video"] as const;
type Filter = (typeof FILTERS)[number];

const PROJECTS: {
  name: string;
  genre: string;
  category: Exclude<Filter, "All">;
  variant: "ember" | "paper" | "ink";
}[] = [
  { name: "The Salt in Her Letters", genre: "Literary Fiction", category: "Book Covers", variant: "ember" },
  { name: "Quiet Systems", genre: "Non-Fiction", category: "Formatting", variant: "ink" },
  { name: "Nine Winters North", genre: "Memoir", category: "Book Covers", variant: "paper" },
  { name: "The Lantern Keeper", genre: "Children’s", category: "Branding", variant: "ember" },
  { name: "Small Hours", genre: "Poetry", category: "Formatting", variant: "paper" },
  { name: "Begin Again, Better", genre: "Self-Help", category: "Video", variant: "ink" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected work"
          title="Books we were proud to send out."
          subtitle="A sample of covers, layouts, author brands and launch video. Real projects, real authors, real shelves."
        />

        {/* ---------- Filter tabs ---------- */}
        <Reveal delay={0.1}>
          <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1 sm:justify-center">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`relative isolate shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200 ${
                    active
                      ? "text-white"
                      : "bg-white text-ink/70 ring-1 ring-inset ring-line hover:text-primary hover:ring-primary/50"
                  }`}
                >
                  {/* A single orange pill physically slides between tabs
                      instead of one fading out while another fades in. */}
                  {active && (
                    <motion.span
                      layoutId="portfolio-filter-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full bg-primary shadow-ember"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---------- Grid ---------- */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
              >
                {/* The cover leans toward the cursor, so the grid reads as a
                    shelf of physical objects rather than flat thumbnails. */}
                <Tilt className="relative" max={10} scale={1.04}>
                  <BookCover
                    title={project.name}
                    genre={project.genre}
                    variant={project.variant}
                  />

                  {/* Hover overlay — project name + genre. */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-l-[3px] rounded-r-xl bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {project.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-base font-normal leading-tight text-white sm:text-lg">
                    {project.name}
                  </h3>
                    <p className="mt-0.5 text-[12px] text-white/70">{project.genre}</p>
                  </div>
                </Tilt>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state — only reachable if a filter is emptied during edits. */}
        {visible.length === 0 && (
          <p className="mt-12 text-center text-[15px] text-muted">
            Nothing in this category yet.{" "}
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="font-semibold text-primary underline underline-offset-4"
            >
              Show everything
            </button>
          </p>
        )}

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-4">
            <Badge tone="soft">More work available on request</Badge>
            <Magnetic>
              <Button href="#contact" size="lg" className="group">
                Ask to see books like yours
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
