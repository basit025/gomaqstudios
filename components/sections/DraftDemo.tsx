"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import BookCover from "@/components/ui/BookCover";
import BrandMark from "@/components/ui/BrandMark";
import VideoFrame from "@/components/ui/VideoFrame";
import Reveal from "@/components/ui/Reveal";
import {
  ArrowRight,
  Check,
  IconBrand,
  IconFiction,
  IconMemoir,
  IconNonFiction,
  IconReel,
  IconVideo,
} from "@/components/ui/Icons";
import { Magnetic, Spotlight, Tilt } from "@/components/ui/motion/pointer";

/**
 * ============================================================================
 * THE 100-MINUTE DRAFT — interactive lead-gen widget
 * ============================================================================
 *
 * WHAT THIS IS
 * A *simulation*. Nothing is generated, sent, or stored. The visitor picks a
 * CRAFT (three book routes, plus brand, trailer and reels), optionally names
 * it, watches a scripted 4-stage build, and is shown a CSS-only mock artifact
 * in that craft's own medium — cover, brand board or video frame.
 * The point is momentum: by the time they see their title on a cover, they
 * have already invested two clicks and want the real thing.
 *
 * TODO — WIRING THIS UP FOR REAL (for whoever picks this up next):
 *
 *  1. CAPTURE THE LEAD (highest value, lowest effort — do this first):
 *     Add an email field to the result step, POST { genre, title, email } to
 *     `app/api/draft/route.ts`, and forward to the CRM / email tool
 *     (Resend, ConvertKit, HubSpot). Right now the funnel ends at #contact.
 *
 *  2. REAL COVER GENERATION (optional):
 *     Replace <BookCover /> with an <Image /> fed by an API route that calls
 *     an image model or a templating service. Drive the stages below from
 *     real job status instead of setTimeout — the STAGES array is already
 *     shaped like a job queue for exactly this reason.
 *
 *  3. ANALYTICS:
 *     Fire an event on genre select, on build start, and on the result CTA.
 *     Drop-off between those three tells you what to fix.
 *
 * Until then: everything below is intentionally client-side and offline.
 * ============================================================================
 */

/**
 * The six things a visitor might be here to make.
 *
 * This picker used to list six BOOK GENRES, which meant the studio's flagship
 * interactive feature could only ever produce a book cover. Someone who came
 * for a trailer or an author brand got told, by the most engaging thing on the
 * page, that we make books. Now three of the six routes lead somewhere other
 * than a cover, and each one previews the artifact that service delivers.
 *
 * `kind` decides three things: the build stages, the result artifact, and the
 * wording of the result copy.
 */
const CRAFTS = [
  { name: "Fiction", icon: IconFiction, blurb: "Novels & series", kind: "book", variant: "ember" },
  { name: "Non-Fiction", icon: IconNonFiction, blurb: "Ideas & expertise", kind: "book", variant: "ink" },
  { name: "Memoir", icon: IconMemoir, blurb: "Your life, told well", kind: "book", variant: "paper" },
  { name: "Author brand", icon: IconBrand, blurb: "A shelf, not one book", kind: "brand", variant: "ink" },
  { name: "Book trailer", icon: IconVideo, blurb: "Video that sells it", kind: "video", variant: "ember" },
  { name: "Social reels", icon: IconReel, blurb: "Cuts that stop a scroll", kind: "reel", variant: "paper" },
] as const;

type Craft = (typeof CRAFTS)[number];
type Kind = Craft["kind"];

/**
 * Scripted build stages, per craft. ~1.2s each -> roughly 5 seconds end to end.
 * Each set names steps that craft actually involves, so the simulation reads
 * as competence rather than as a loading bar with four generic labels.
 */
const STAGES_BY_KIND: Record<Kind, readonly string[]> = {
  book: [
    "Analysing genre conventions",
    "Drafting cover concept",
    "Formatting interior layout",
    "Finalising your preview",
  ],
  brand: [
    "Reading your author voice",
    "Sketching the monogram",
    "Building the palette & type",
    "Finalising your preview",
  ],
  video: [
    "Finding the opening beat",
    "Cutting to the hook",
    "Grading the look",
    "Finalising your preview",
  ],
  reel: [
    "Picking the scroll-stopper",
    "Cutting for vertical",
    "Timing to the track",
    "Finalising your preview",
  ],
};

/** What the result step promises, per craft. */
const RESULT_COPY: Record<Kind, { blurb: string; points: readonly string[] }> = {
  book: {
    blurb:
      "A rough concept, not the finished book. The real thing gets custom typography, original artwork, print-ready files — and, if you want it, the brand and launch video around it.",
    points: [
      "Full cover: front, spine and back",
      "Interior layout your reader forgets is there",
      "Upload-ready files for KDP, IngramSpark and Lulu",
    ],
  },
  brand: {
    blurb:
      "A first pass at your identity, not the finished system. The real thing gets a drawn mark, a full palette, type rules and templates that carry across every book you publish.",
    points: [
      "Author logo & wordmark",
      "Colour, type and series rules",
      "Templates for covers and social",
    ],
  },
  video: {
    blurb:
      "A rough frame, not the finished cut. The real thing is edited to your book's tone, graded, scored and delivered in every aspect ratio the stores and socials ask for.",
    points: [
      "Book trailer, cut to the hook",
      "Colour grade and sound design",
      "Delivered for YouTube, Amazon and socials",
    ],
  },
  reel: {
    blurb:
      "A rough frame, not the finished cut. The real thing is a set of vertical cuts built to stop a scroll — captioned, paced to the track, and sized for every platform.",
    points: [
      "Vertical cuts for Reels, Shorts & TikTok",
      "Burned-in captions and hooks",
      "A month of posts from one shoot",
    ],
  },
};

const STAGE_MS = 1200;

type Step = "genre" | "title" | "building" | "result";

export default function DraftDemo() {
  const [step, setStep] = useState<Step>("genre");
  const [craftName, setCraftName] = useState<string>("");
  const [title, setTitle] = useState("");
  const [stage, setStage] = useState(0);

  const craft: Craft = CRAFTS.find((c) => c.name === craftName) ?? CRAFTS[0];
  const stages = STAGES_BY_KIND[craft.kind];
  const resultCopy = RESULT_COPY[craft.kind];

  /** Runs the scripted build, then reveals the cover. */
  useEffect(() => {
    if (step !== "building") return;

    if (stage >= stages.length) {
      const done = setTimeout(() => setStep("result"), 450);
      return () => clearTimeout(done);
    }
    const next = setTimeout(() => setStage((s) => s + 1), STAGE_MS);
    return () => clearTimeout(next);
  }, [step, stage, stages.length]);

  const selectCraft = (name: string) => {
    setCraftName(name);
    // Small beat so the selected state registers before the step changes.
    setTimeout(() => setStep("title"), 260);
  };

  const startBuild = () => {
    setStage(0);
    setStep("building");
  };

  const reset = () => {
    setStep("genre");
    setCraftName("");
    setTitle("");
    setStage(0);
  };

  // The placeholder has to suit whichever craft was picked.
  const displayTitle =
    title.trim() ||
    (craft.kind === "brand" ? "Your Name Here" : "Untitled Project");
  const progress = Math.min((stage / stages.length) * 100, 100);
  const stepIndex = step === "genre" ? 0 : step === "title" ? 1 : 2;

  return (
    <section id="draft" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Section-wide tint so this block reads as the page centrepiece. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-base via-primary-light/40 to-base"
      />

      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge tone="soft">Free &middot; No account needed</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-display-lg font-normal text-ink">
              Get your first draft in 100 minutes
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              See exactly what your project could look like &mdash; before you
              commit to anything. Pick a craft, tell us the name, and watch a
              concept take shape.
            </p>
          </Reveal>
        </div>

        {/* ---------- The widget ---------- */}
        <Reveal delay={0.15} className="mt-12 sm:mt-14">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-primary/25 bg-surface shadow-lift">
            {/* Stepper rail */}
            <div className="flex items-center gap-3 border-b border-line bg-primary-light/60 px-5 py-4 sm:px-8">
              {["Craft", "Name", "Preview"].map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-300 ${
                        i <= stepIndex
                          ? "bg-primary text-on-primary"
                          : "bg-surface text-muted ring-1 ring-inset ring-line"
                      }`}
                    >
                      {i < stepIndex ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span
                      className={`text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                        i <= stepIndex ? "text-primary-dark" : "text-muted"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 2 && (
                    <span
                      className="hidden h-px flex-1 bg-primary/20 sm:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="p-5 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                {/* ---------------- STEP 1 — genre ---------------- */}
                {step === "genre" && (
                  <motion.div
                    key="genre"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-display text-xl font-normal text-ink sm:text-2xl">
                      What are you making?
                    </p>
                    <p className="mt-2 text-[15px] text-muted">
                      A book, a brand, or the video around it. Every craft has
                      its own visual language — pick yours.
                    </p>

                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {CRAFTS.map((g) => {
                        const Icon = g.icon;
                        const active = craftName === g.name;
                        return (
                          <Tilt key={g.name} max={8} scale={1.04}>
                            <Spotlight
                              className={`h-full rounded-2xl border transition-colors duration-200 ${
                                active
                                  ? "border-primary bg-primary-light shadow-ember"
                                  : "border-line bg-surface hover:border-primary/60 hover:shadow-soft"
                              }`}
                            >
                          <button
                            type="button"
                            onClick={() => selectCraft(g.name)}
                            aria-pressed={active}
                            className="group flex h-full w-full flex-col items-start gap-3 rounded-2xl p-4 text-left sm:p-5"
                          >
                            <span
                              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 ${
                                active
                                  ? "bg-primary text-on-primary"
                                  : "bg-primary-light text-primary group-hover:bg-primary group-hover:text-on-primary"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block font-display text-[19px] font-normal text-ink">
                                {g.name}
                              </span>
                              <span className="mt-0.5 block text-[12px] text-muted">
                                {g.blurb}
                              </span>
                            </span>
                          </button>
                            </Spotlight>
                          </Tilt>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ---------------- STEP 2 — title ---------------- */}
                {step === "title" && (
                  <motion.div
                    key="title"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge tone="soft">{craft.name}</Badge>
                      <button
                        type="button"
                        onClick={() => setStep("genre")}
                        className="text-[13px] font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary"
                      >
                        Change
                      </button>
                    </div>

                    <p className="mt-5 font-display text-xl font-normal text-ink sm:text-2xl">
                      What&rsquo;s it called?
                    </p>
                    <p className="mt-2 text-[15px] text-muted">
                      A working name is fine &mdash; you can change it a hundred
                      more times. Or skip ahead and we&rsquo;ll use a placeholder.
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        startBuild();
                      }}
                      className="mt-6"
                    >
                      <label htmlFor="draft-title" className="sr-only">
                        Project name
                      </label>
                      <input
                        id="draft-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={60}
                        autoComplete="off"
                        placeholder="e.g. The Long Way Home"
                        className="w-full rounded-xl border border-line bg-surface px-4 py-4 font-display text-lg text-ink placeholder:font-sans placeholder:text-base placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                      />

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Magnetic className="w-full sm:w-auto">
                          <Button type="submit" size="lg" className="group w-full sm:w-auto">
                            Build my draft
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </Magnetic>
                        <button
                          type="button"
                          onClick={startBuild}
                          className="text-[14px] font-medium text-muted transition-colors hover:text-primary"
                        >
                          Skip &mdash; surprise me
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ---------------- STEP 3 — building ---------------- */}
                {step === "building" && (
                  <motion.div
                    key="building"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-4"
                  >
                    <div className="mx-auto max-w-lg">
                      <p className="text-center font-display text-xl font-normal text-ink sm:text-2xl">
                        Building &ldquo;{displayTitle}&rdquo;
                      </p>
                      <p className="mt-2 text-center text-[15px] text-muted">
                        {craft.name} &middot; concept preview
                      </p>

                      {/* Progress bar */}
                      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-primary-light">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                      </div>

                      {/* Stage checklist */}
                      <ul
                        className="mt-7 space-y-3"
                        aria-live="polite"
                        aria-busy={stage < stages.length}
                      >
                        {stages.map((label, i) => {
                          const done = stage > i;
                          const active = stage === i;
                          return (
                            <motion.li
                              key={label}
                              className="flex items-center gap-3"
                              animate={{ opacity: done || active ? 1 : 0.4 }}
                              transition={{ duration: 0.3 }}
                            >
                              <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                                  done
                                    ? "bg-primary text-on-primary"
                                    : active
                                      ? "bg-primary-light text-primary"
                                      : "bg-surface-2 text-muted"
                                }`}
                              >
                                {done ? (
                                  <Check className="h-4 w-4" />
                                ) : active ? (
                                  <motion.span
                                    className="block h-3 w-3 rounded-full border-2 border-primary border-t-transparent"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                      duration: 0.8,
                                      repeat: Infinity,
                                      ease: "linear",
                                    }}
                                  />
                                ) : (
                                  <span className="block h-1.5 w-1.5 rounded-full bg-current" />
                                )}
                              </span>
                              <span
                                className={`text-[15px] transition-colors duration-300 ${
                                  done || active ? "font-medium text-ink" : "text-muted"
                                }`}
                              >
                                {label}
                              </span>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* ---------------- STEP 4 — result ---------------- */}
                {step === "result" && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`grid items-center gap-8 sm:gap-10 ${
                      craft.kind === "video"
                        ? "md:grid-cols-[minmax(0,340px)_1fr]"
                        : "md:grid-cols-[minmax(0,240px)_1fr]"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, rotateY: -14, scale: 0.94 }}
                      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      className={`mx-auto w-full ${craft.kind === "video" ? "max-w-[340px]" : "max-w-[240px]"}`}
                    >
                      {/* The artifact matches the craft that was picked, so a
                          visitor who came for video is shown video. */}
                      {craft.kind === "book" && (
                        <BookCover
                          title={displayTitle}
                          genre={craft.name}
                          variant={craft.variant}
                        />
                      )}
                      {craft.kind === "brand" && (
                        <BrandMark name={displayTitle} variant={craft.variant} />
                      )}
                      {craft.kind === "video" && (
                        <VideoFrame title={displayTitle} kind="Launch trailer" ratio="wide" />
                      )}
                      {craft.kind === "reel" && (
                        <VideoFrame
                          title={displayTitle}
                          kind="Social cut"
                          ratio="reel"
                          duration="0:18"
                          progress={0.6}
                        />
                      )}
                    </motion.div>

                    <div>
                      <Badge tone="soft">Concept preview</Badge>
                      <p className="mt-4 font-display text-2xl font-normal leading-tight text-ink sm:text-3xl">
                        Here&rsquo;s the direction.
                      </p>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted">
                        {resultCopy.blurb}
                      </p>

                      <ul className="mt-5 space-y-2.5">
                        {resultCopy.points.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span className="text-[14px] text-ink/80">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Magnetic className="w-full sm:w-auto">
                          <Button href="#contact" size="lg" className="group w-full sm:w-auto">
                            Build the real thing
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </Magnetic>
                        <button
                          type="button"
                          onClick={reset}
                          className="text-[14px] font-medium text-muted transition-colors hover:text-primary"
                        >
                          Try another genre
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[13px] text-muted">
            Previews are illustrative concepts. The real thing is made by a
            human who reads, watches or listens to your work first.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
