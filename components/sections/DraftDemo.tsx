"use client";

import { useState } from "react";
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
 * THE 100-MINUTE DRAFT — brief capture
 * ============================================================================
 *
 * WHAT THIS IS
 * A short, low-friction form that collects enough for us to get in touch.
 * It is NOT a generator.
 *
 * It used to be: pick a genre -> watch a fake progress bar "build" for five
 * seconds -> receive an auto-generated mock cover. That was the wrong promise
 * twice over. It implied the draft is machine-made when a designer makes it,
 * and a draft produced from a genre and a title alone could never match what
 * a client actually wants. The animation was selling something the studio
 * does not offer.
 *
 * The real sequence is: visitor says what they are making -> we come back with
 * questions -> once briefed, a designer makes the first draft in 100 minutes
 * of studio time. The widget now mirrors exactly that, and the artifact at the
 * end is labelled as EXISTING work in that craft, never as "your" draft.
 *
 * Deliberately low friction: only name and email are required. Everything else
 * is optional, because the requirements conversation happens afterwards —
 * which is the entire point of the flow.
 *
 * TODO — WIRE UP SUBMISSION (this is a real lead form now, so this matters):
 *   Create `app/api/draft/route.ts` and replace the simulated await in
 *   `submit()` with:
 *
 *     const res = await fetch("/api/draft", {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify({ craft: craft.name, project, brief, name, email }),
 *     });
 *     if (!res.ok) throw new Error("Send failed");
 *
 *   Forward to the studio inbox and the CRM. Add server-side validation and a
 *   spam guard — the honeypot input is already in the markup, labelled
 *   `website`. Also fire analytics on craft select, on reaching the contact
 *   step, and on submit: the drop-off between those three is the most useful
 *   number this page can give you.
 * ============================================================================
 */

/**
 * The six things a visitor might be here to make. Three book routes plus
 * brand, trailer and reels, so the studio's flagship feature does not imply we
 * only make books. `kind` decides the example artifact and the "what your
 * draft includes" list shown at the end.
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

/** What the first draft actually contains, per craft. */
const DELIVERS: Record<Kind, readonly string[]> = {
  book: [
    "A cover direction, drawn not generated",
    "A sample interior spread in your type",
    "The plan for print and eBook files",
  ],
  brand: [
    "A first monogram and wordmark",
    "A working palette and type pairing",
    "How it carries across a series",
  ],
  video: [
    "An opening beat cut to your hook",
    "A look and a pace to react to",
    "The shape of the full trailer",
  ],
  reel: [
    "A vertical cut built to stop a scroll",
    "Caption style and hook options",
    "A plan for a month of posts",
  ],
};

/** The real process, replacing the fake build animation. */
const NEXT_STEPS = [
  { title: "We read your brief", body: "A person, today. Usually within a few hours." },
  {
    title: "We ask what we're missing",
    body: "A short reply with the questions that actually change the work.",
  },
  {
    title: "Your first draft, 100 minutes later",
    body: "Made by a designer, once we know what you need.",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Step = "craft" | "brief" | "contact" | "done";

export default function DraftDemo() {
  const [step, setStep] = useState<Step>("craft");
  const [craftName, setCraftName] = useState("");
  const [project, setProject] = useState("");
  const [brief, setBrief] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [sending, setSending] = useState(false);

  const craft: Craft = CRAFTS.find((c) => c.name === craftName) ?? CRAFTS[0];
  const stepIndex = step === "craft" ? 0 : step === "brief" ? 1 : 2;

  const selectCraft = (value: string) => {
    setCraftName(value);
    // Small beat so the selected state registers before the step changes.
    setTimeout(() => setStep("brief"), 260);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found: { name?: string; email?: string } = {};
    if (name.trim().length < 2) found.name = "Please tell us your name.";
    if (!EMAIL_RE.test(email.trim())) found.email = "We need a working email to reply to.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    // TODO: replace with the real POST — see the block at the top of this file.
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setStep("done");
  };

  const reset = () => {
    setStep("craft");
    setCraftName("");
    setProject("");
    setBrief("");
    setName("");
    setEmail("");
    setErrors({});
  };

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-[15px] text-ink placeholder:text-muted/70 transition-all duration-300 hover:border-primary/40 focus:-translate-y-0.5 focus:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/25";

  const exampleTitle = project.trim() || "A recent project";

  return (
    <section id="draft" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
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
              Made, not generated. Tell us what you&rsquo;re working on,
              we&rsquo;ll come back with the questions that matter, and a
              designer builds your first draft in 100 minutes of studio time.
            </p>
          </Reveal>
        </div>

        {/* ---------- The widget ---------- */}
        <Reveal delay={0.15} className="mt-12 sm:mt-14">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-primary/25 bg-surface shadow-lift">
            {/* Stepper rail */}
            <div className="flex items-center gap-3 border-b border-line bg-primary-light/60 px-5 py-4 sm:px-8">
              {["Craft", "Brief", "You"].map((label, i) => (
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
                {/* ---------------- STEP 1 — craft ---------------- */}
                {step === "craft" && (
                  <motion.div
                    key="craft"
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
                      its own visual language &mdash; pick yours.
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

                {/* ---------------- STEP 2 — brief ---------------- */}
                {step === "brief" && (
                  <motion.div
                    key="brief"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge tone="soft">{craft.name}</Badge>
                      <button
                        type="button"
                        onClick={() => setStep("craft")}
                        className="text-[13px] font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary"
                      >
                        Change
                      </button>
                    </div>

                    <p className="mt-5 font-display text-xl font-normal text-ink sm:text-2xl">
                      Tell us about it.
                    </p>
                    <p className="mt-2 text-[15px] text-muted">
                      Rough is fine &mdash; this is what we build our questions
                      from. Both fields are optional.
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setStep("contact");
                      }}
                      className="mt-6 space-y-4"
                    >
                      <div>
                        <label htmlFor="draft-project" className="sr-only">
                          Project name
                        </label>
                        <input
                          id="draft-project"
                          type="text"
                          value={project}
                          onChange={(e) => setProject(e.target.value)}
                          maxLength={80}
                          autoComplete="off"
                          placeholder="What's it called? e.g. The Long Way Home"
                          className={field}
                        />
                      </div>

                      <div>
                        <label htmlFor="draft-brief" className="sr-only">
                          About the project
                        </label>
                        <textarea
                          id="draft-brief"
                          rows={3}
                          value={brief}
                          onChange={(e) => setBrief(e.target.value)}
                          maxLength={600}
                          placeholder="Where you are, what it's about, anything you already know you want. Word count or runtime if you have it."
                          className={`${field} resize-y`}
                        />
                      </div>

                      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                        <Magnetic className="w-full sm:w-auto">
                          <Button type="submit" size="lg" className="group w-full sm:w-auto">
                            Continue
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </Magnetic>
                        <button
                          type="button"
                          onClick={() => setStep("contact")}
                          className="text-[14px] font-medium text-muted transition-colors hover:text-primary"
                        >
                          Skip &mdash; I&rsquo;d rather just talk
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ---------------- STEP 3 — contact ---------------- */}
                {step === "contact" && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge tone="soft">{craft.name}</Badge>
                      <button
                        type="button"
                        onClick={() => setStep("brief")}
                        className="text-[13px] font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary"
                      >
                        Back
                      </button>
                    </div>

                    <p className="mt-5 font-display text-xl font-normal text-ink sm:text-2xl">
                      Where do we send it?
                    </p>
                    <p className="mt-2 text-[15px] text-muted">
                      We&rsquo;ll reply with a few questions first &mdash; the
                      draft is only worth making once we know what you want.
                    </p>

                    <form onSubmit={submit} noValidate className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="draft-name" className="sr-only">
                          Your name
                        </label>
                        <input
                          id="draft-name"
                          type="text"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          placeholder="Your name"
                          className={field}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-[13px] text-primary-dark">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="draft-email" className="sr-only">
                          Email
                        </label>
                        <input
                          id="draft-email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          placeholder="you@example.com"
                          className={field}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-[13px] text-primary-dark">{errors.email}</p>
                        )}
                      </div>

                      {/* Honeypot — hidden from people, tempting to bots. */}
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                          id="website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div className="pt-2">
                        <Magnetic className="w-full sm:w-auto">
                          <Button
                            type="submit"
                            size="lg"
                            disabled={sending}
                            className="group w-full sm:w-auto"
                          >
                            {sending ? "Sending…" : "Send my brief"}
                            {!sending && (
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            )}
                          </Button>
                        </Magnetic>
                        <p className="mt-3 text-[13px] text-muted">
                          No newsletter, no automated funnel. Just a reply from a person.
                        </p>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ---------------- STEP 4 — confirmation ---------------- */}
                {step === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`grid items-start gap-8 sm:gap-10 ${
                      craft.kind === "video"
                        ? "md:grid-cols-[minmax(0,320px)_1fr]"
                        : "md:grid-cols-[minmax(0,220px)_1fr]"
                    }`}
                  >
                    {/* EXISTING work in this craft — explicitly not "your draft". */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="mx-auto w-full"
                      >
                        {craft.kind === "book" && (
                          <BookCover
                            title={exampleTitle}
                            genre={craft.name}
                            variant={craft.variant}
                          />
                        )}
                        {craft.kind === "brand" && (
                          <BrandMark name={exampleTitle} variant={craft.variant} />
                        )}
                        {craft.kind === "video" && (
                          <VideoFrame title={exampleTitle} kind="Launch trailer" ratio="wide" />
                        )}
                        {craft.kind === "reel" && (
                          <VideoFrame
                            title={exampleTitle}
                            kind="Social cut"
                            ratio="reel"
                            duration="0:18"
                            progress={0.6}
                          />
                        )}
                      </motion.div>
                      <p className="mt-3 text-center text-[12px] leading-relaxed text-muted">
                        An example of {craft.name.toLowerCase()} work, not your
                        draft. Yours gets made once we&rsquo;ve talked.
                      </p>
                    </div>

                    <div>
                      <motion.span
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                      >
                        <Check className="h-7 w-7" />
                      </motion.span>

                      <p className="mt-5 font-display text-2xl font-normal leading-tight text-ink sm:text-3xl">
                        Your brief is in
                        {name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
                      </p>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted">
                        We&rsquo;ll reply to{" "}
                        <span className="font-medium text-ink">{email.trim()}</span>. Here is
                        exactly what happens next.
                      </p>

                      <ol className="mt-6 space-y-4">
                        {NEXT_STEPS.map((s, i) => (
                          <motion.li
                            key={s.title}
                            className="flex gap-3.5"
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.12, duration: 0.45 }}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light font-display text-[13px] text-primary">
                              {i + 1}
                            </span>
                            <span>
                              <span className="block text-[15px] font-semibold text-ink">
                                {s.title}
                              </span>
                              <span className="mt-0.5 block text-[14px] leading-relaxed text-muted">
                                {s.body}
                              </span>
                            </span>
                          </motion.li>
                        ))}
                      </ol>

                      <div className="mt-6 rounded-xl border border-line bg-primary-light/40 p-4">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                          Your first draft includes
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                          {DELIVERS[craft.kind].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span className="text-[14px] text-ink/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={reset}
                        className="mt-5 text-[14px] font-medium text-muted transition-colors hover:text-primary"
                      >
                        Send another brief
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[13px] text-muted">
            Nothing here is auto-generated. Every draft is made by a designer
            who has read, watched or listened to your work first.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
