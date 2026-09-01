import Image from "next/image";
import Link from "next/link";

/**
 * ============================================================
 * LOGO
 * Real asset lives at `public/logo.jpeg` (LOGO_SRC below).
 *
 * The supplied artwork is a white + orange wordmark on a SOLID BLACK square
 * with wide margins, so it's presented inside a black rounded chip and
 * `object-cover` crops the dead space away. That's deliberate — it reads as
 * an intentional brand lockup on a white nav bar.
 *
 * If you later export a TRANSPARENT logo (recommended: `logo.svg` or a
 * transparent PNG), set LOGO_HAS_BLACK_BACKGROUND = false and update
 * LOGO_SRC — the chip disappears and the mark sits directly on the page.
 * ============================================================
 */
const LOGO_SRC = "/logo.jpeg";
const LOGO_HAS_BLACK_BACKGROUND = true;

type Props = {
  /** Nav uses "sm" (~44px tall); footer uses "md". */
  size?: "sm" | "md";
  className?: string;
};

export default function Logo({ size = "sm", className = "" }: Props) {
  const box = size === "sm" ? "h-11 w-[148px]" : "h-14 w-[188px]";

  return (
    <Link
      href="#top"
      aria-label="Gomaq Studios — back to top"
      className={`group relative block shrink-0 ${box} ${className}`}
    >
      <span
        className={`relative block h-full w-full overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-[1.02] ${
          LOGO_HAS_BLACK_BACKGROUND ? "bg-black" : ""
        }`}
      >
        <Image
          src={LOGO_SRC}
          alt="Gomaq Studios"
          fill
          priority
          sizes="200px"
          className={LOGO_HAS_BLACK_BACKGROUND ? "object-cover" : "object-contain"}
        />
      </span>
    </Link>
  );
}
