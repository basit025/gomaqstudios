"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Check, Mail, socialIcons } from "@/components/ui/Icons";
import { genres, site, socials } from "@/lib/site";

/**
 * ============================================================
 * FINAL CTA + CONTACT FORM
 *
 * Validation is fully client-side. Submitting does NOT hit a network —
 * it simulates latency and shows the success state.
 *
 * TODO — WIRE UP SUBMISSION:
 *   Create `app/api/contact/route.ts`, then replace the simulated await in
 *   `handleSubmit` below with:
 *
 *     const res = await fetch("/api/contact", {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify(values),
 *     });
 *     if (!res.ok) throw new Error("Send failed");
 *
 *   In that route, forward to an email service (Resend / SendGrid / Postmark)
 *   or a form backend (Formspree / Basin). Add server-side validation and a
 *   spam guard (honeypot field or Turnstile) — the honeypot input is already
 *   in the markup below, labelled `company`.
 * ============================================================
 */

type Values = { name: string; email: string; genre: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", genre: "", message: "" };

/** Deliberately permissive — real verification happens when we email back. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That email does not look right.";
  if (!values.genre) errors.genre = "Pick the closest genre.";
  if (values.message.trim().length < 10)
    errors.message = "A sentence or two about the book, please.";
  return errors;
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/25";

export default function Contact() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const setField = (field: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Clear an error as soon as the visitor fixes it.
    if (errors[field]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[field];
        return next;
      });
    }
  };

  const blur = (field: keyof Values) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const fieldError = validate(values)[field];
    setErrors((e) => ({ ...e, ...(fieldError ? { [field]: fieldError } : {}) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, genre: true, message: true });
    if (Object.keys(found).length > 0) return;

    setSending(true);
    // TODO: replace this simulated delay with the real POST (see block above).
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSending(false);
    setSent(true);
  };

  const fieldClass = (field: keyof Values) =>
    `${inputBase} ${
      errors[field] && touched[field]
        ? "border-primary-dark focus:border-primary-dark"
        : "border-line focus:border-primary"
    }`;

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-primary-light/50 to-primary-light/70"
      />

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16">
          {/* ---------- Closing pitch ---------- */}
          <div className="lg:pt-4">
            <Reveal>
              <p className="eyebrow">
                <span className="h-px w-6 bg-primary" aria-hidden="true" />
                Last page
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-ink">
                You finished the hard part.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
                Writing the book was the work. Making it look like one is ours.
                Tell us what you have written and we will come back with an
                honest read on what it needs — usually within two working days.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Or just email us
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2.5 inline-flex items-center gap-2.5 font-display text-xl font-semibold text-ink transition-colors hover:text-primary"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  {site.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Follow the studio
                </p>
                <ul className="mt-3 flex gap-2.5">
                  {socials.map((social) => {
                    const Icon = socialIcons[social.icon];
                    return (
                      <li key={social.label}>
                        {/* TODO: point href at the real profile in lib/site.ts */}
                        <a
                          href={social.href}
                          aria-label={social.label}
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink ring-1 ring-inset ring-line transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:ring-primary"
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ---------- Form ---------- */}
          <Reveal delay={0.1}>
            <div className="rounded-[24px] border border-line bg-white p-6 shadow-lift sm:p-9">
              <AnimatePresence mode="wait">
                {sent ? (
                  /* ---------- Success state ---------- */
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="py-6 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <motion.span
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <Check className="h-8 w-8" />
                    </motion.span>

                    <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                      Message received.
                    </h3>
                    <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
                      Thanks, {values.name.trim().split(" ")[0]}. We read every
                      one of these ourselves and will reply to{" "}
                      <span className="font-medium text-ink">{values.email.trim()}</span>{" "}
                      within two working days.
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-3">
                      <Button href="#portfolio" variant="outline" size="lg">
                        Browse the portfolio while you wait
                      </Button>
                      <button
                        type="button"
                        onClick={() => {
                          setSent(false);
                          setValues(EMPTY);
                          setTouched({});
                          setErrors({});
                        }}
                        className="text-[14px] font-medium text-muted transition-colors hover:text-primary"
                      >
                        Send another message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ---------- Form state ---------- */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Badge tone="soft">Free, honest quote</Badge>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                      Tell us about your book
                    </h3>

                    <div className="mt-7 space-y-5">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-[13px] font-semibold text-ink"
                        >
                          Your name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={(e) => setField("name", e.target.value)}
                          onBlur={() => blur("name")}
                          aria-invalid={Boolean(errors.name && touched.name)}
                          aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                          placeholder="Jane Aldridge"
                          className={fieldClass("name")}
                        />
                        {errors.name && touched.name && (
                          <p id="name-error" className="mt-1.5 text-[13px] text-primary-dark">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-[13px] font-semibold text-ink"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={(e) => setField("email", e.target.value)}
                          onBlur={() => blur("email")}
                          aria-invalid={Boolean(errors.email && touched.email)}
                          aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                          placeholder="jane@example.com"
                          className={fieldClass("email")}
                        />
                        {errors.email && touched.email && (
                          <p id="email-error" className="mt-1.5 text-[13px] text-primary-dark">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Genre */}
                      <div>
                        <label
                          htmlFor="genre"
                          className="mb-2 block text-[13px] font-semibold text-ink"
                        >
                          Book genre
                        </label>
                        <select
                          id="genre"
                          name="genre"
                          value={values.genre}
                          onChange={(e) => setField("genre", e.target.value)}
                          onBlur={() => blur("genre")}
                          aria-invalid={Boolean(errors.genre && touched.genre)}
                          aria-describedby={errors.genre && touched.genre ? "genre-error" : undefined}
                          className={`${fieldClass("genre")} appearance-none bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11 ${
                            values.genre ? "text-ink" : "text-muted/70"
                          }`}
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A6F68' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                          }}
                        >
                          <option value="">Choose the closest fit</option>
                          {genres.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                          <option value="Other">Something else</option>
                        </select>
                        {errors.genre && touched.genre && (
                          <p id="genre-error" className="mt-1.5 text-[13px] text-primary-dark">
                            {errors.genre}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-[13px] font-semibold text-ink"
                        >
                          About the book
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={values.message}
                          onChange={(e) => setField("message", e.target.value)}
                          onBlur={() => blur("message")}
                          aria-invalid={Boolean(errors.message && touched.message)}
                          aria-describedby={
                            errors.message && touched.message ? "message-error" : undefined
                          }
                          placeholder="Word count, where you are in the process, and what you need help with."
                          className={`${fieldClass("message")} resize-y`}
                        />
                        {errors.message && touched.message && (
                          <p id="message-error" className="mt-1.5 text-[13px] text-primary-dark">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Honeypot — hidden from people, tempting to bots. */}
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="company">Company</label>
                        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={sending}
                      className="mt-8 w-full"
                    >
                      {sending ? "Sending…" : "Send it over"}
                      {!sending && <ArrowRight className="h-4 w-4" />}
                    </Button>

                    <p className="mt-4 text-center text-[13px] text-muted">
                      No newsletter, no automated funnel. Just a reply from a person.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
