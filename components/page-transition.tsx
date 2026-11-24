"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

interface PageTransitionProps {
  children: React.ReactNode
}

/**
 * Smooth page transition between route changes.
 * Utilizes a subtle upward slide and cross-fade.
 * Automatically respects the user's OS reduced-motion preferences.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1], // ease-out cubic
      }}
      className="flex-1 w-full"
    >
      {children}
    </motion.div>
  )
}
