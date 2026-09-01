"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import BookCover from "@/components/ui/BookCover";
import Reveal from "@/components/ui/Reveal";
import {
  ArrowRight,
  Check,
  IconChildrens,
  IconFiction,
  IconMemoir,
  IconNonFiction,
  IconPoetry,
  IconSelfHelp,
} from "@/components/ui/Icons";

/**
 * ============================================================================
 * THE 100-MINUTE DRAFT — interactive lead-gen widget
 * ============================================================================
 *
 * WHAT THIS IS
 * A *simulation*. Nothing is generated, sent, or stored. The visitor picks a
 * genre, optionally types a title, watches a scripted 4-stage "build", and is
 * shown a CSS-only mock cover (<BookCover />) built from their own inputs.
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

const GENRES = [
  { name: "Fiction", icon: IconFiction, blurb: "Novels & series" },
  { name: "Non-Fiction", icon: IconNonFiction, blurb: "Ideas & expertise" },
  { name: "Memoir", icon: IconMemoir, blurb: "Your life, told well" },
  { name: "Children’s", icon: IconChildrens, blurb: "Picture & chapter" },
  { name: "Poetry", icon: IconPoetry, blurb: "Verse & collections" },
  { name: "Self-Help", icon: IconSelfHelp, blurb: "Change & growth" },
] as const;

/** Scripted build stages. ~1.2s each -> roughly 5 seconds end to end. */
const STAGES = [
  "Analysing genre conventions",
  "Drafting cover concept",
  "Formatting interior layout",
  "Finalising your preview",
] as const;

const STAGE_MS = 1200;

/** Cover skin per genre, so each result feels considered rather than random. */
const COVER_SKIN: Record<string, "ember" | "paper" | "ink"> = {
  Fiction: "ember",
  "Non-Fiction": "ink",
  Memoir: "paper",
  "Children’s": "ember",
  Poetry: "paper",
  "Self-Help": "ink",
};

type Step = "genre" | "title" | "building" | "result";

export default function DraftDemo() {
  const [step, setStep] = useState<Step>("genre");
  const [genre, setGenre] = useState<string>("");
  const [title, setTitle] = useState("");
  const [stage, setStage] = useState(0);

  /** Runs the scripted build, then reveals the cover. */
  useEffect(() => {
    if (step !== "building") return;

    if (stage >= STAGES.length) {
      const done = setTimeout(() => setStep("result"), 450);
      return () => clearTimeout(done);
    }
    const next = setTimeout(() => setStage((s) => s + 1), STAGE_MS);
    return () => clearTimeout(next);
  }, [step, stage]);

  const selectGenre = (name: string) => {
    setGenre(name);
    // Small beat so the selected state registers before the step changes.
    setTimeout(() => setStep("title"), 260);
  };

  const startBuild = () => {
    setStage(0);
    setStep("building");
  };

  const reset = () => {
    setStep("genre");
    setGenre("");
    setTitle("");
    setStage(0);
  };

  const displayTitle = title.trim() || "Untitled Manuscript";
  const progress = Math.min((stage / STAGES.length) * 100, 100);
  const stepIndex = step === "genre" ? 0 : step === "title" ? 1 : 2;

  return (
    <section id="draft" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Section-wide tint so this block reads as the page centrepiece. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-white via-primary-light/40 to-white"
      />

      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge tone="soft">Free &middot; No account needed</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-ink">
              Get your first draft in 100 minutes
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              See exactly what your book could look like &mdash; before you
              commit to anything. Pick a genre, tell us the title, and watch a
              concept take shape.
            </p>
          </Reveal>
        </div>

        {/* ---------- The widget ---------- */}
        <Reveal delay={0.15} className="mt-12 sm:mt-14">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-primary/25 bg-white shadow-lift">
            {/* Stepper rail */}
            <div className="flex items-center gap-3 border-b border-line bg-primary-light/60 px-5 py-4 sm:px-8">
              {["Genre", "Title", "Preview"].map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-300 ${
                        i <= stepIndex
                          ? "bg-primary text-white"
                          : "bg-white text-muted ring-1 ring-inset ring-line"
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
                    <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
                      What are you writing?
                    </p>
                    <p className="mt-2 text-[15px] text-muted">
                      Every genre has its own visual language. Pick yours.
                    </p>

                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {GENRES.map((g) => {
                        const Icon = g.icon;
                        const active = genre === g.name;
                        return (
                          <button
                            key={g.name}
                            type="button"
                            onClick={() => selectGenre(g.name)}
                            aria-pressed={active}
                            className={`group flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5 ${
                              active
                                ? "border-primary bg-primary-light shadow-ember"
                                : "border-line bg-white hover:-translate-y-1 hover:border-primary/60 hover:shadow-soft"
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                                active
                                  ? "bg-primary text-white"
                                  : "bg-primary-light text-primary group-hover:bg-primary group-hover:text-white"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block font-display text-[17px] font-semibold text-ink">
                                {g.name}
                              </span>
                              <span className="mt-0.5 block text-[12px] text-muted">
                                {g.blurb}
                              </span>
                            </span>
                          </button>
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
                      <Badge tone="soft">{genre}</Badge>
                      <button
                        type="button"
                        onClick={() => setStep("genre")}
                        className="text-[13px] font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary"
                      >
                        Change genre
                      </button>
                    </div>

                    <p className="mt-5 font-display text-xl font-semibold text-ink sm:text-2xl">
                      What&rsquo;s it called?
                    </p>
                    <p className="mt-2 text-[15px] text-muted">
                      A working title is fine &mdash; you can change it a hundred
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
                        Book title
                      </label>
                      <input
                        id="draft-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={60}
                        autoComplete="off"
                        placeholder="e.g. The Long Way Home"
                        className="w-full rounded-xl border border-line bg-white px-4 py-4 font-display text-lg text-ink placeholder:font-sans placeholder:text-base placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                      />

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button type="submit" size="lg" className="w-full sm:w-auto">
                          Build my draft
                          <ArrowRight className="h-4 w-4" />
                        </Button>
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
                      <p className="text-center font-display text-xl font-semibold text-ink sm:text-2xl">
                        Building &ldquo;{displayTitle}&rdquo;
                      </p>
                      <p className="mt-2 text-center text-[15px] text-muted">
                        {genre} &middot; concept preview
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
                        aria-busy={stage < STAGES.length}
                      >
                        {STAGES.map((label, i) => {
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
                                    ? "bg-primary text-white"
                                    : active
                                      ? "bg-primary-light text-primary"
                                      : "bg-[#F4F1EF] text-muted"
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
                    className="grid items-center gap-8 sm:gap-10 md:grid-cols-[minmax(0,240px)_1fr]"
                  >
                    <motion.div
                      initial={{ opacity: 0, rotateY: -14, scale: 0.94 }}
                      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      className="mx-auto w-full max-w-[240px]"
                    >
                      <BookCover
                        title={displayTitle}
                        genre={genre}
                        variant={COVER_SKIN[genre] ?? "ember"}
                      />
                    </motion.div>

                    <div>
                      <Badge tone="soft">Concept preview</Badge>
                      <p className="mt-4 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                        Here&rsquo;s the direction.
                      </p>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted">
                        A rough concept, not the finished book. The real thing
                        gets custom typography, original artwork, a print-ready
                        spine and back cover, and interior pages typeset to match.
                      </p>

                      <ul className="mt-5 space-y-2.5">
                        {[
                          "Full cover: front, spine and back",
                          "Interior layout your reader forgets is there",
                          "Upload-ready files for KDP, IngramSpark and Lulu",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span className="text-[14px] text-ink/80">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button href="#contact" size="lg" className="w-full sm:w-auto">
                          Build the real thing
                          <ArrowRight className="h-4 w-4" />
                        </Button>
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
            Previews are illustrative concepts. Your real cover is designed by a
            human who reads your manuscript first.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
