"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import BookCover from "@/components/ui/BookCover";
import BrandMark from "@/components/ui/BrandMark";
import VideoFrame from "@/components/ui/VideoFrame";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";
import { Magnetic, Tilt } from "@/components/ui/motion/pointer";

/**
 * ============================================================
 * PORTFOLIO — mixed-media mosaic
 *
 * Every tile used to be a 2:3 <BookCover />, including the branding and video
 * work. That single decision did more to make the studio look book-only than
 * any of the copy: a visitor scanning the grid saw a shelf of books, so the
 * "Branding" and "Video" tabs read as wishful labelling.
 *
 * Each project now renders in its OWN medium — 2:3 covers, 1:1 brand boards,
 * 16:9 trailers, 9:16 reels — laid out as a masonry. The varied shapes do two
 * jobs: they prove the range at a glance, and a ragged editorial mosaic looks
 * like a creative studio in a way a tidy grid of identical rectangles does not.
 *
 * Layout is CSS multi-column rather than a grid with span maths, so each tile
 * keeps its true aspect ratio and the columns pack themselves. Framer's
 * `layout` prop is deliberately NOT used here — it fights multi-column reflow
 * — so filtering cross-fades rather than morphing.
 *
 * PLACEHOLDER PROJECTS — replace with real work. For real artwork, swap the
 * artifact component for <Image /> inside the same wrapper.
 * ============================================================
 */

const FILTERS = ["All", "Book Covers", "Formatting", "Branding", "Video"] as const;
type Filter = (typeof FILTERS)[number];
type Media = "cover" | "brand" | "video" | "reel";

type Project = {
  name: string;
  genre: string;
  category: Exclude<Filter, "All">;
  media: Media;
  variant: "ember" | "paper" | "ink";
};

const PROJECTS: Project[] = [
  // Two per category, each shown in the medium the work actually ships in.
  { name: "The Salt in Her Letters", genre: "Literary fiction", category: "Book Covers", media: "cover", variant: "ember" },
  { name: "Nine Winters North", genre: "Memoir", category: "Book Covers", media: "cover", variant: "paper" },
  { name: "Quiet Systems", genre: "Interior + print files", category: "Formatting", media: "cover", variant: "ink" },
  { name: "Small Hours", genre: "Poetry typesetting", category: "Formatting", media: "cover", variant: "paper" },
  { name: "Harrow & Vale", genre: "Author brand system", category: "Branding", media: "brand", variant: "ink" },
  { name: "The Lantern Keeper", genre: "Children’s series identity", category: "Branding", media: "brand", variant: "ember" },
  { name: "Begin Again, Better", genre: "Launch trailer", category: "Video", media: "video", variant: "ink" },
  { name: "The Salt Road", genre: "Reels & social cuts", category: "Video", media: "reel", variant: "ember" },
];

/** Renders a project in its own medium. */
function Artifact({ project }: { project: Project }) {
  switch (project.media) {
    case "brand":
      return <BrandMark name={project.name} kind={project.genre} variant={project.variant} />;
    case "video":
      return <VideoFrame title={project.name} kind={project.genre} ratio="wide" />;
    case "reel":
      return (
        <VideoFrame
          title={project.name}
          kind={project.genre}
          ratio="reel"
          duration="0:18"
          progress={0.6}
        />
      );
    default:
      return <BookCover title={project.name} genre={project.genre} variant={project.variant} />;
  }
}

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected work"
          title="Covers, brands, trailers, reels."
          subtitle="Filter by the thing you came here for. Every tile is shown in the medium it actually ships in."
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
                      ? "text-on-primary"
                      : "bg-surface text-ink/70 ring-1 ring-inset ring-line hover:text-primary hover:ring-primary/50"
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

        {/* ---------- Mosaic ---------- */}
        <div className="mt-10 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group mb-5 block break-inside-avoid cursor-pointer"
              >
                {/* Tiles lean toward the cursor, so the mosaic reads as a set
                    of physical objects rather than flat thumbnails. */}
                <Tilt className="relative" max={9} scale={1.03}>
                  <Artifact project={project} />

                  {/* Hover overlay. `ink` inverts in dark mode, so the scrim is
                      pinned to black and its text to white. */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-xl bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
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
        </div>

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
          <div className="mt-8 flex flex-col items-center gap-4">
            <Badge tone="soft">More work available on request</Badge>
            <Magnetic>
              <Button href="#contact" size="lg" className="group">
                Ask to see work like yours
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
