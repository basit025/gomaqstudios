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
 *   /logo.png        ink strokes   -> light theme
 *   /logo-light.png  white strokes -> dark theme
 *
 * Both are rendered and swapped with a CSS `dark:` variant rather than by
 * reading theme state in JS. That keeps this a server component and means the
 * correct mark is present in the very first paint — no flash, no hydration gap.
 * The hidden one is not fetched, because browsers skip `display:none` images.
 *
 * If the logo ever changes, drop the new file at `public/logo.jpeg` and run:
 *     python scripts/build-logo.py
 * ============================================================
 */
const LOGO_LIGHT_THEME = "/logo.png"; // ink strokes, for light backgrounds
const LOGO_DARK_THEME = "/logo-light.png"; // white strokes, for dark backgrounds

/** Intrinsic pixel size of the generated PNGs (~3.07:1). */
const INTRINSIC = { width: 1374, height: 447 };

type Props = {
  /** Nav uses "sm" (40px tall); footer uses "md" (52px). */
  size?: "sm" | "md";
  className?: string;
};

export default function Logo({ size = "sm", className = "" }: Props) {
  // Height only — width follows the intrinsic ratio via `w-auto`.
  const height = size === "sm" ? "h-10" : "h-[52px]";
  const common = `w-auto transition-opacity duration-300 group-hover:opacity-80 ${height}`;

  return (
    <Link
      href="#top"
      aria-label="Gomaq Studios — back to top"
      className={`group inline-flex shrink-0 items-center ${className}`}
    >
      <Image
        src={LOGO_LIGHT_THEME}
        alt="Gomaq Studios"
        width={INTRINSIC.width}
        height={INTRINSIC.height}
        priority
        sizes="200px"
        className={`${common} dark:hidden`}
      />
      <Image
        src={LOGO_DARK_THEME}
        alt=""
        aria-hidden="true"
        width={INTRINSIC.width}
        height={INTRINSIC.height}
        sizes="200px"
        className={`${common} hidden dark:block`}
      />
    </Link>
  );
}
