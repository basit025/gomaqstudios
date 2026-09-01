import Image from "next/image";
import Link from "next/link";

/**
 * ============================================================
 * LOGO
 *
 * Renders the wordmark directly on the page background — no chip, no plate.
 *
 * The supplied `public/logo.jpeg` is a WHITE wordmark on a SOLID BLACK square,
 * which cannot sit on a light page: JPEG has no alpha, and a white wordmark on
 * a white background is invisible. So `scripts/build-logo.py` derives an alpha
 * channel from the artwork's luminance and recolours the neutral strokes,
 * producing two transparent PNGs:
 *
 *   /logo.png        ink strokes   -> light backgrounds (what the site uses)
 *   /logo-light.png  white strokes -> dark backgrounds (spare)
 *
 * Both keep the orange accent, remapped to the brand orange (#C1440E) so it
 * matches the CTA button sitting a few pixels away in the nav.
 *
 * If the logo ever changes, drop the new file at `public/logo.jpeg` and run:
 *     python scripts/build-logo.py
 *
 * If you get a proper vector export, point LOGO_SRC at it and delete nothing
 * else — an SVG will drop straight in.
 * ============================================================
 */
const LOGO_SRC = {
  /** For white / light-tinted backgrounds. */
  dark: "/logo.png",
  /** For ink or photographic backgrounds. */
  light: "/logo-light.png",
} as const;

/** Intrinsic pixel size of the generated PNGs (~3.07:1). */
const INTRINSIC = { width: 1374, height: 447 };

type Props = {
  /** Nav uses "sm" (40px tall); footer uses "md" (52px). */
  size?: "sm" | "md";
  /** `dark` = ink strokes for light backgrounds (default). */
  tone?: "dark" | "light";
  className?: string;
};

export default function Logo({ size = "sm", tone = "dark", className = "" }: Props) {
  // Height only — width follows the intrinsic ratio via `w-auto`.
  const height = size === "sm" ? "h-10" : "h-[52px]";

  return (
    <Link
      href="#top"
      aria-label="Gomaq Studios — back to top"
      className={`group inline-flex shrink-0 items-center ${className}`}
    >
      <Image
        src={LOGO_SRC[tone]}
        alt="Gomaq Studios"
        width={INTRINSIC.width}
        height={INTRINSIC.height}
        priority
        sizes="200px"
        className={`w-auto transition-opacity duration-300 group-hover:opacity-80 ${height}`}
      />
    </Link>
  );
}
