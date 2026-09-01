/**
 * ============================================================
 * SITE-WIDE EDITABLE CONTENT
 * Nav labels, section anchors, contact email and social links.
 * Everything here is safe to change without touching components.
 * ============================================================
 */

/**
 * The primary call to action, used in the nav and the mobile menu.
 *
 * Deliberately not "Get Started" / "Contact Us". It should sound like a
 * person, not a funnel. Alternatives if this one does not land:
 *   "Let's talk books"   <-- ACTIVE
 *   "Pull up a chair"
 *   "Bring us your book"
 *   "Start the conversation"
 * `short` is used under 640px, where the full label will not fit.
 */
export const cta = {
  label: "Let's talk books",
  short: "Let's talk",
  href: "#contact",
};

export const site = {
  name: "Gomaq Studios",
  // TODO: replace with the real inbox before launch.
  email: "hello@gomaqstudios.com",
  tagline: "Design, formatting, branding and video for independent authors.",
};

/** Sticky-nav anchor links. Order here = order in the header and footer. */
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "The 100-Minute Draft", href: "#draft" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

/** TODO: swap the `#` placeholders for the real profile URLs. */
export const socials = [
  { label: "Instagram", href: "#", icon: "instagram" as const },
  { label: "X", href: "#", icon: "x" as const },
  { label: "LinkedIn", href: "#", icon: "linkedin" as const },
];

/** Book genres — shared by the 100-Minute Draft widget and the contact form. */
export const genres = [
  "Fiction",
  "Non-Fiction",
  "Memoir",
  "Children's",
  "Poetry",
  "Self-Help",
] as const;

export type Genre = (typeof genres)[number];
