"use client";

import { useEffect, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * ============================================================================
 * POINTER-REACTIVE MOTION PRIMITIVES
 *
 * The site should feel alive under the cursor without ever feeling like a
 * toy. Three rules everything here follows:
 *
 *  1. NEVER re-render on pointer move. Every effect drives a framer-motion
 *     MotionValue, which writes straight to the compositor. Moving the mouse
 *     across the page triggers zero React renders.
 *  2. NEVER run on touch. `(pointer: fine)` gates all of it — on a phone
 *     these effects are invisible at best and janky at worst.
 *  3. ALWAYS respect `prefers-reduced-motion`. Effects switch off entirely,
 *     they don't just slow down.
 *
 * Only transform and opacity are animated, so nothing here triggers layout.
 * ============================================================================
 */

/** True only when the visitor has a real cursor AND welcomes motion. */
export function usePointerMotion() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return fine && !reduced;
}

/* ------------------------------------------------------------------ */

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Glow diameter in px. */
  radius?: number;
  /** Peak glow alpha, 0-1. Keep it low — this should be felt, not seen. */
  intensity?: number;
};

/**
 * A warm orange glow that tracks the cursor across the element. Used on every
 * card on the page so hovering anything feels responsive.
 *
 * Pass the surface classes (radius, border, background) on `className` —
 * the glow inherits the radius so it never bleeds past a rounded corner.
 */
export function Spotlight({
  children,
  className = "",
  radius = 320,
  intensity = 0.1,
}: SpotlightProps) {
  const enabled = usePointerMotion();
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, rgb(var(--color-primary-rgb) / ${intensity}), transparent 72%)`;

  const track = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const reset = () => {
    x.set(-9999);
    y.set(-9999);
  };

  // `isolate` opens a stacking context on the root, so the glow can sit at
  // -z-10: above the element's own background, below all of its children.
  // No wrapper div means Spotlight composes with any layout the caller uses.
  return (
    <div
      className={`group/spot relative isolate ${className}`}
      onPointerMove={track}
      onPointerLeave={reset}
    >
      {enabled && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
          style={{ background }}
        />
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. Above ~10 it starts to look like a gimmick. */
  max?: number;
  /** Scale applied while hovered. */
  scale?: number;
};

/**
 * Subtle 3D tilt following the cursor. The card leans *toward* the pointer,
 * which is what makes it read as a physical object rather than an effect.
 */
export function Tilt({ children, className = "", max = 7, scale = 1.02 }: TiltProps) {
  const enabled = usePointerMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const spring = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const s = useSpring(useTransform(hover, [0, 1], [1, scale]), spring);

  const track = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    hover.set(1);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  return (
    <div
      className={className}
      style={{ perspective: 1000 }}
      onPointerMove={track}
      onPointerLeave={reset}
    >
      <motion.div
        className="h-full"
        style={enabled ? { rotateX, rotateY, scale: s } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element chases the cursor, as a fraction of the offset. */
  strength?: number;
};

/**
 * The element drifts toward the cursor as it approaches, then springs back.
 * Reserved for primary CTAs — if everything is magnetic, nothing is.
 */
export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const enabled = usePointerMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 260, damping: 18, mass: 0.5 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const track = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`inline-flex ${className}`}
      style={enabled ? { x: sx, y: sy } : undefined}
      onPointerMove={track}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

type DriftProps = {
  children: ReactNode;
  className?: string;
  /** Max travel in px at the edges of the viewport. */
  distance?: number;
  /** Invert direction — pass true for layers that should move against the cursor. */
  invert?: boolean;
};

/**
 * Whole-viewport cursor parallax. Background layers drift a few pixels as the
 * cursor crosses the page, which is what stops a hero from feeling like a
 * screenshot. Deliberately tiny — if you can consciously see it, it's too much.
 */
export function Drift({
  children,
  className = "",
  distance = 18,
  invert = false,
}: DriftProps) {
  const enabled = usePointerMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 60, damping: 20, mass: 0.8 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    if (!enabled) return;
    const dir = invert ? -1 : 1;
    const onMove = (e: globalThis.PointerEvent) => {
      x.set(((e.clientX / window.innerWidth) * 2 - 1) * distance * dir);
      y.set(((e.clientY / window.innerHeight) * 2 - 1) * distance * dir);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, distance, invert, x, y]);

  return (
    <motion.div className={className} style={enabled ? { x: sx, y: sy } : undefined}>
      {children}
    </motion.div>
  );
}
