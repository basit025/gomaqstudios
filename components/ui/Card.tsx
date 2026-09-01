import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Adds the lift + orange-border hover animation (service/pricing cards). */
  interactive?: boolean;
};

/** Neutral surface primitive: white, hairline border, generous radius. */
export default function Card({ children, className = "", interactive = false }: Props) {
  return (
    <div
      className={[
        "rounded-2xl border border-line bg-white",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-lift",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
