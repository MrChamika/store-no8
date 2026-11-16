"use client"

import { Children, useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  type AnimatePresenceProps,
  type Transition,
  type Variants,
} from "motion/react"

import { cn } from "@/lib/utils"

export type TextLoopProps = {
  children: React.ReactNode[]
  className?: string
  interval?: number
  transition?: Transition
  variants?: Variants
  onIndexChange?: (index: number) => void
  trigger?: boolean
  mode?: AnimatePresenceProps["mode"]
}

const defaultVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
}

/**
 * Cycles through the given children with an enter/exit variant pair. Keeps
 * spans only, so it can live inside headings.
 */
export function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  trigger = true,
  mode = "popLayout",
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = Children.toArray(children)

  useEffect(() => {
    if (!trigger || items.length < 2) return

    const timer = window.setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length
        onIndexChange?.(next)
        return next
      })
    }, interval * 1000)

    return () => window.clearInterval(timer)
  }, [items.length, interval, onIndexChange, trigger])

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <AnimatePresence mode={mode} initial={false}>
        <motion.span
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants || defaultVariants}
          className="inline-block"
        >
          {items[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}