"use client"

import { MotionConfig } from "motion/react"
import type { ReactNode } from "react"

/**
 * Honours the OS "reduce motion" setting for every motion component below.
 * Opacity still animates; transforms and layout animations are skipped.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
