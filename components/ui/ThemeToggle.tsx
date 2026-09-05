"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * ============================================================
 * THEME TOGGLE
 *
 * Three states, cycled in order: system -> light -> dark -> system.
 * "System" is the default and follows the OS, so a visitor who has their
 * machine in dark mode gets a dark site without touching anything.
 *
 * The stored value is read by the inline script in `app/layout.tsx`, which
 * runs BEFORE first paint. That script owns the initial class; this component
 * only handles changes after mount — which is why it renders a neutral
 * placeholder until `mounted` is true. Rendering the real icon on the server
 * would guess the theme wrong half the time and produce a hydration mismatch.
 *
 * Keep the localStorage key in step with the script in layout.tsx.
 * ============================================================
 */
const STORAGE_KEY = "gomaq-theme";

type Choice = "system" | "light" | "dark";

/** Applies a choice to <html>, resolving "system" against the OS setting. */
function apply(choice: Choice) {
  const dark =
    choice === "dark" ||
    (choice === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

const NEXT: Record<Choice, Choice> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const LABEL: Record<Choice, string> = {
  system: "Theme: follows your system",
  light: "Theme: light",
  dark: "Theme: dark",
};

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [choice, setChoice] = useState<Choice>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Choice | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setChoice(stored);
    }
    setMounted(true);
  }, []);

  // While on "system", keep following the OS if the visitor changes it.
  useEffect(() => {
    if (!mounted || choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => apply("system");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [mounted, choice]);

  const cycle = () => {
    const next = NEXT[choice];
    setChoice(next);
    localStorage.setItem(STORAGE_KEY, next);
    apply(next);
  };

  const base =
    "relative flex h-11 w-11 items-center justify-center rounded-full text-ink ring-1 ring-inset ring-ink/10 transition-colors hover:text-primary hover:ring-primary/40";

  // Neutral until mounted — see the note above about hydration.
  if (!mounted) {
    return <span className={`${base} ${className}`} aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${LABEL[choice]}. Activate to switch.`}
      title={LABEL[choice]}
      className={`${base} ${className}`}
    >
      <motion.span
        key={choice}
        initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center justify-center"
      >
        {choice === "light" && <SunIcon />}
        {choice === "dark" && <MoonIcon />}
        {choice === "system" && <SystemIcon />}
      </motion.span>
    </button>
  );
}

/* ---------- icons, matching the set in ui/Icons.tsx ---------- */

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-[18px] w-[18px]",
  "aria-hidden": true,
};

const SunIcon = () => (
  <svg {...svg}>
    <circle cx="12" cy="12" r="4.25" />
    <path d="M12 2.75v2M12 19.25v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2.75 12h2M19.25 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg {...svg}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.25 8.25 0 1 0 10.2 10.2Z" />
  </svg>
);

/** Monitor outline — "follow the system". */
const SystemIcon = () => (
  <svg {...svg}>
    <rect x="2.75" y="4.25" width="18.5" height="12.5" rx="2" />
    <path d="M8.5 20.25h7M12 16.75v3.5" />
  </svg>
);
