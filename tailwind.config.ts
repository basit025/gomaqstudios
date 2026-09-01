import type { Config } from "tailwindcss";

/**
 * GOMAQ STUDIOS — Tailwind theme
 *
 * Colors are driven by CSS variables declared in `app/globals.css` as
 * space-separated RGB channels, so Tailwind opacity modifiers still work
 * (e.g. `bg-primary/10`, `text-ink/70`).
 *
 * To rebrand the whole site, change the hex values in `app/globals.css` only.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary-rgb) / <alpha-value>)",
          dark: "rgb(var(--color-primary-dark-rgb) / <alpha-value>)",
          light: "rgb(var(--color-primary-light-rgb) / <alpha-value>)",
        },
        base: "rgb(var(--color-base-rgb) / <alpha-value>)",
        ink: "rgb(var(--color-ink-rgb) / <alpha-value>)",
        muted: "rgb(var(--color-muted-rgb) / <alpha-value>)",
        line: "rgb(var(--color-line-rgb) / <alpha-value>)",
      },
      fontFamily: {
        // Fraunces — editorial display serif for headlines
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        // Manrope — clean modern sans for body copy + UI
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        // Fluid oversized headline sizes (mobile 375px -> desktop 1440px+)
        "display-xl": ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.03", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3.4vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        shell: "1200px",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(43 33 28 / 0.04), 0 8px 24px -8px rgb(43 33 28 / 0.10)",
        lift: "0 2px 4px rgb(43 33 28 / 0.05), 0 24px 48px -16px rgb(43 33 28 / 0.20)",
        ember: "0 18px 40px -18px rgb(193 68 14 / 0.55)",
      },
      backgroundImage: {
        "grain-fade": "linear-gradient(180deg, rgb(var(--color-primary-light-rgb) / 0.55) 0%, rgb(var(--color-base-rgb)) 100%)",
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "marquee-x": "marquee-x 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
