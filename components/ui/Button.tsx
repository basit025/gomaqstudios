import Link from "next/link";
import type { ComponentProps, MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Solid burnt orange — the one true CTA.
  primary:
    "bg-primary text-white shadow-ember hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0 active:bg-primary-dark",
  // Transparent with a hairline — sits beside the primary CTA.
  ghost:
    "bg-transparent text-ink ring-1 ring-inset ring-ink/15 hover:ring-primary hover:text-primary hover:-translate-y-0.5 active:translate-y-0",
  // Orange hairline on white — used inside light-orange panels.
  outline:
    "bg-white text-primary ring-1 ring-inset ring-primary/30 hover:ring-primary hover:bg-primary-light active:bg-primary-light",
  // Inline text CTA with a sliding arrow (see `<ArrowRight/>` usage).
  link: "text-primary hover:text-primary-dark p-0 rounded-none",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "ref">;

/**
 * One button for the whole site. Pass `href` to render an anchor
 * (smooth-scrolls to in-page sections), omit it to render a real <button>.
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  onClick,
  ...props
}: Props) {
  const classes = [
    base,
    variants[variant],
    variant === "link" ? "" : sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
