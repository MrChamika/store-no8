"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

import { EASE } from "@/components/motion/ease"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: boolean
  amount?: number
  once?: boolean
}

/** Fades a block up the first time it scrolls into view. */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
  blur = false,
  amount = 0.25,
  once = true,
}: ScrollRevealProps) {
  const from = blur
    ? { opacity: 0, y, filter: "blur(10px)" }
    : { opacity: 0, y }
  const to = blur
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 1, y: 0 }

  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={to}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

type ScrollItemProps = {
  children: ReactNode
  className?: string
  index?: number
  y?: number
  amount?: number
  once?: boolean
  step?: number
  maxSteps?: number
}

/**
 * Grid/list item that reveals itself as it enters the viewport, offset by
 * `index` so a grid cascades instead of popping in as one block.
 */
export function ScrollItem({
  children,
  className,
  index = 0,
  y = 26,
  amount = 0.15,
  once = true,
  step = 0.07,
  maxSteps = 8,
}: ScrollItemProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.62,
        delay: Math.min(index, maxSteps) * step,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  )
}
