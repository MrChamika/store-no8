"use client"

import Image from "next/image"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type ParallaxProps = {
  children: ReactNode
  className?: string
  innerClassName?: string
  distance?: number
}

/** Moves its children against the scroll direction for depth. */
export function Parallax({
  children,
  className,
  innerClassName,
  distance = 32,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.35,
  })
  const y = useTransform(smooth, [0, 1], [distance, -distance])

  return (
    <div ref={ref} className={className}>
      <motion.div className={innerClassName} style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

type ParallaxImageProps = {
  src: string
  alt: string
  sizes: string
  className?: string
  imageClassName?: string
  priority?: boolean
  /** Vertical travel as a percentage of the image height. */
  distance?: number
  scale?: number
}

/**
 * Image inside an overflow-hidden frame that drifts as you scroll.
 * The frame keeps a fixed aspect ratio; the picture inside overscans so
 * no edges are exposed at either end of the travel.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority = false,
  distance = 5,
  scale = 1.18,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.35,
  })
  const y = useTransform(smooth, [0, 1], [`-${distance}%`, `${distance}%`])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  )
}
