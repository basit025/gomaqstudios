/**
 * ============================================================
 * SITE-WIDE EDITABLE CONTENT
 * Nav labels, section anchors, contact email and social links.
 * Everything here is safe to change without touching components.
 * ============================================================
 */

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
