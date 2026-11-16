"use client"

import { Fragment, useEffect } from "react"
import {
  motion,
  motionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

// Slightly over-damped so a digit never rolls past its final value.
const TRANSITION = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
  mass: 0.4,
}

function Digit({ value, place }: { value: number; place: number }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10
  const initial = motionValue(valueRoundedToPlace)
  const animatedValue = useSpring(initial, TRANSITION)

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  return (
    <span className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
      <span className="invisible">0</span>
      {Array.from({ length: 10 }, (_, i) => (
        <RollingDigit key={i} mv={animatedValue} number={i} />
      ))}
    </span>
  )
}

function RollingDigit({ mv, number }: { mv: MotionValue<number>; number: number }) {
  // Percentages keep the rail measurement-free, so digits paint on the very
  // first frame instead of waiting for a ResizeObserver.
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10
    const offset = (10 + number - placeValue) % 10
    let memo = offset * 100

    if (offset > 5) {
      memo -= 1000
    }

    return `${memo}%`
  })

  return (
    <motion.span
      style={{ y }}
      transition={TRANSITION}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  )
}
type SlidingNumberProps = {
  value: number
  padStart?: boolean
  decimalSeparator?: string
  /** Fixed fraction digits, e.g. 1 keeps 4.0 on screen while the digits roll. */
  decimals?: number
  /** Insert thousands separators, e.g. 1,200. */
  grouping?: boolean
  className?: string
}

/**
 * Odometer-style digits. Each place value is its own vertical rail, so a
 * changing `value` slides the digits instead of swapping the text.
 */
export function SlidingNumber({
  value,
  padStart = false,
  decimalSeparator = ".",
  decimals,
  grouping = false,
  className,
}: SlidingNumberProps) {
  const absValue = Math.abs(value)
  // Without an explicit `decimals` the value is snapped to a whole number, so
  // an in-flight count like 1199.998 can never leak a decimal tail on screen.
  const rounded =
    decimals === undefined
      ? String(Math.round(absValue))
      : absValue.toFixed(decimals)
  const [integerPart, decimalPart] = rounded.split(".")
  const integerValue = Number.parseInt(integerPart, 10)
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart
  const integerDigits = paddedInteger.split("")
  const integerPlaces = integerDigits.map((_, index) =>
    Math.pow(10, integerDigits.length - index - 1)
  )

  return (
    <span
      className={cn(
        "inline-flex items-center leading-none tabular-nums",
        className
      )}
    >
      {value < 0 && <span aria-hidden="true">-</span>}
      {integerDigits.map((_, index) => {
        const remaining = integerDigits.length - index
        return (
          <Fragment key={`pos-${integerPlaces[index]}`}>
            <Digit value={integerValue} place={integerPlaces[index]} />
            {grouping && remaining > 1 && remaining % 3 === 1 && (
              <span aria-hidden="true">,</span>
            )}
          </Fragment>
        )
      })}
      {decimalPart && (
        <>
          <span aria-hidden="true">{decimalSeparator}</span>
          {decimalPart.split("").map((_, index) => (
            <Digit
              key={`decimal-${index}`}
              value={Number.parseInt(decimalPart, 10)}
              place={Math.pow(10, decimalPart.length - index - 1)}
            />
          ))}
        </>
      )}
    </span>
  )
}