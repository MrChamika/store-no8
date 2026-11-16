"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useSpring, useTransform } from "motion/react"

type AnimatedStatProps = {
  /** Value the counter finishes on. */
  to: number
  prefix?: string
  suffix?: string
  /** Thousands separators (1,200). Off so years read as 2016. */
  group?: boolean
  /** Count-up length in seconds. */
  duration?: number
  /** Extra pause before the count starts, in seconds. */
  delay?: number
  className?: string
}

/**
 * Starts at 0 and counts to `to` the first time it scrolls into view, eased
 * with a spring that has no bounce. Snaps straight to the value when the
 * visitor prefers reduced motion.
 */
export function AnimatedStat({
  to,
  prefix = "",
  suffix = "",
  group = false,
  duration = 2.2,
  delay = 0,
  className,
}: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  const spring = useSpring(0, { bounce: 0, duration: duration * 1000 })
  const display = useTransform(spring, (latest) => {
    const rounded = Math.round(latest)
    const number = group ? rounded.toLocaleString("en-US") : String(rounded)
    return `${prefix}${number}${suffix}`
  })

  useEffect(() => {
    if (!inView) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spring.jump(to)
      return
    }

    const timer = window.setTimeout(() => spring.set(to), delay * 1000)
    return () => window.clearTimeout(timer)
  }, [inView, spring, to, delay])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}