/**
 * Inline SVG icon set — no icon library dependency.
 * All icons: 24x24 viewBox, 1.5 stroke, `currentColor`, so they inherit
 * text color and size from their container (`className="h-6 w-6 text-primary"`).
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---------- UI ---------- */

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12.5 9 17 19.5 6.5" />
  </Base>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);

export const Mail = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
    <path d="m3.5 7.5 7.36 5.15a2 2 0 0 0 2.28 0L20.5 7.5" />
  </Base>
);

export const Quote = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 6C6.5 7.5 5 10 5 13v5h5v-6H7.5c0-2 .7-3.6 2-4.6ZM19 6c-3 1.5-4.5 4-4.5 7v5h5v-6H17c0-2 .7-3.6 2-4.6Z" />
  </Base>
);

export const Star = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="m12 2.6 2.86 5.8 6.4.93-4.63 4.51 1.09 6.37L12 17.2l-5.72 3.01 1.09-6.37L2.74 9.33l6.4-.93z" />
  </svg>
);

/* ---------- Services ---------- */

/** Book Design — cover with an artist's rule and mark. */
export const IconDesign = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 3.75h11.5a2 2 0 0 1 2 2v14.5H7a2 2 0 0 1-2-2z" />
    <path d="M5 17.25h13.5" />
    <path d="M9 7.75h5.5M9 11h3.5" />
  </Base>
);

/** Book Formatting — page spread with flowing text columns. */
export const IconFormat = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 6.5C10.4 5.3 8.3 4.75 5 4.75v13.5c3.3 0 5.4.55 7 1.75 1.6-1.2 3.7-1.75 7-1.75V4.75c-3.3 0-5.4.55-7 1.75Z" />
    <path d="M12 6.5v13.5" />
  </Base>
);

/** Brand Development — author identity mark / radiating star. */
export const IconBrand = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.25 13.9 9l5.85.2-4.6 3.6 1.6 5.63L12 15.2l-4.75 3.23 1.6-5.63L4.25 9.2 10.1 9z" />
    <path d="M3.5 20.5h17" />
  </Base>
);

/** Video Editing — film frame with a play head. */
export const IconVideo = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2.5" />
    <path d="M7.25 5.25v13.5M16.75 5.25v13.5" />
    <path d="m10.9 10.4 3.6 1.85-3.6 1.85z" />
  </Base>
);

/* ---------- Genres (100-Minute Draft widget) ---------- */

/** Fiction — open book. */
export const IconFiction = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 7c-1.7-1.4-4-2-7-2v12c3 0 5.3.6 7 2 1.7-1.4 4-2 7-2V5c-3 0-5.3.6-7 2Z" />
    <path d="M12 7v12" />
  </Base>
);

/** Non-Fiction — stacked reference volumes. */
export const IconNonFiction = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="4" width="4.5" height="16" rx="1.2" />
    <rect x="9.75" y="4" width="4.5" height="16" rx="1.2" />
    <path d="m16.4 6.1 3.4.9-3 11.1-3.4-.9z" />
  </Base>
);

/** Memoir — quill pen. */
export const IconMemoir = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20c1-6.5 5-11.5 15.5-15C18 12.5 13.5 17 6.5 17.5" />
    <path d="M4 20c2.2-2.6 5-4.6 8.5-6" />
  </Base>
);

/** Children's — kite / paper star on a string. */
export const IconChildrens = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 3 6 6-6 6-6-6z" />
    <path d="M12 3v12M6 9h12" />
    <path d="M12 15c0 2.5-1.5 3.5-1.5 6" />
  </Base>
);

/** Poetry — ink drop over a rule. */
export const IconPoetry = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5s5 5.6 5 9a5 5 0 0 1-10 0c0-3.4 5-9 5-9Z" />
    <path d="M5 20.5h14" />
  </Base>
);

/** Self-Help — upward arc through a horizon. */
export const IconSelfHelp = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 16.5c3.5 0 5-9 8.5-9s5 6 8.5 6" />
    <path d="M17 13.5h3.5V10" />
    <path d="M3.5 20.5h17" />
  </Base>
);

/* ---------- Social ---------- */

export const Instagram = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </Base>
);

export const XSocial = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.2 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.7L4.3 21H1l7.7-8.8L1.5 3h6.8l4.7 6.2zm-1.2 16h1.8L8.1 4.9H6.2z" />
  </svg>
);

export const LinkedIn = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M4.98 3.5A2.49 2.49 0 1 1 2.5 6 2.49 2.49 0 0 1 4.98 3.5M3 8.98h4v12H3zM9.5 8.98h3.83v1.64h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12v6.32h-4v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-4z" />
  </svg>
);

/** Icon lookup used by the socials list in `lib/site.ts`. */
export const socialIcons = {
  instagram: Instagram,
  x: XSocial,
  linkedin: LinkedIn,
};
