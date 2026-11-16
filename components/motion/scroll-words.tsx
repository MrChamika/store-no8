"use client"

import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef, type ReactNode } from "react"

type ScrollWordsProps = {
  text: string
  className?: string
  as?: "p" | "h2"
  /** Opacity a word has before it is scrolled into focus. */
  dim?: number
}

/**
 * Scroll-linked text: each word brightens as the paragraph travels up the
 * viewport. The visual state is tied to scroll position, not to a timer.
 */
export function ScrollWords({
  text,
  className,
  as = "p",
  dim = 0.18,
}: ScrollWordsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.42"],
  })
  const words = text.split(" ")

  const content = words.map((word, index) => {
    const start = index / words.length
    const end = (index + 1) / words.length
    return (
      <span key={`${word}-${index}`}>
        <Word progress={scrollYProgress} range={[start, end]} dim={dim}>
          {word}
        </Word>
        {index < words.length - 1 ? " " : null}
      </span>
    )
  })

  return (
    <div ref={ref}>
      {as === "h2" ? (
        <h2 className={className}>{content}</h2>
      ) : (
        <p className={className}>{content}</p>
      )}
    </div>
  )
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
  dim: number
}) {
  const opacity = useTransform(progress, range, [dim, 1])
  const y = useTransform(progress, range, [10, 0])

  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {children}
    </motion.span>
  )
}
