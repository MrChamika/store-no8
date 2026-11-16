"use client"

import { useEffect, useState } from "react"

import { SlidingNumber } from "@/components/motion-primitives/sliding-number"

type SlidingCounterProps = {
  to: number
  duration?: number
  delay?: number
  decimals?: number
  grouping?: boolean
}

/**
 * Eases from 0 to `to` once on mount and feeds the value into SlidingNumber so
 * every digit rolls into place. Snaps to the final value for reduced motion.
 */
export function SlidingCounter({
  to,
  duration = 1500,
  delay = 0,
  decimals,
  grouping,
}: SlidingCounterProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const total = reduceMotion ? 0 : duration
    let frame = 0
    let start: number | null = null

    const step = (time: number) => {
      if (start === null) start = time
      const progress = total === 0 ? 1 : Math.min((time - start) / total, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setValue(to * eased)

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      }
    }

    const timer = window.setTimeout(
      () => {
        frame = requestAnimationFrame(step)
      },
      reduceMotion ? 0 : delay
    )

    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [to, duration, delay])

  return (
    <SlidingNumber value={value} decimals={decimals} grouping={grouping} />
  )
}