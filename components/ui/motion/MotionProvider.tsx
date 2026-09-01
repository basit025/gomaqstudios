"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps the app so framer-motion honours the OS "reduce motion" setting
 * globally: transform and layout animations are skipped for those users,
 * while opacity still cross-fades (which is not vestibular-triggering).
 *
 * Components that would otherwise be left at an invisible starting state
 * additionally check `useReducedMotion()` themselves and render their final
 * state directly — see Reveal and SplitText.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
