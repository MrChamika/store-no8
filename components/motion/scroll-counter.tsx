"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

type ScrollCounterProps = {
  /** Value the counter finishes on. */
  to: number
  prefix?: string
  suffix?: string
  /** Thousands separators (1,200). Off by default so years read as 2016. */
  group?: boolean
  className?: string
}

/**
 * Counts from 0 to `to` in step with the scroll position: 0 when the number
 * first appears at the bottom of the viewport, finished exactly when it
 * reaches the vertical centre of the screen. Drive-by-scroll, so the number
 * is always complete by the time it is being read.
 */
export function ScrollCounter({
  to,
  prefix = "",
  suffix = "",
  group = false,
  className,
}: ScrollCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center center"],
  })

  const value = useTransform(scrollYProgress, [0, 1], [0, to])
  const display = useTransform(value, (latest) => {
    const rounded = Math.round(latest)
    const number = group ? rounded.toLocaleString("en-US") : String(rounded)
    return `${prefix}${number}${suffix}`
  })

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
