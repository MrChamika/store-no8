"use client"

import * as React from "react"
import Link from "next/link"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

const MotionLink = motion.create(Link)

type DockContextValue = {
  mouseX: MotionValue<number>
}

const DockContext = React.createContext<DockContextValue | null>(null)
const DockItemContext = React.createContext(false)

function useDock() {
  const context = React.useContext(DockContext)

  if (!context) {
    throw new Error("Dock components must be rendered inside <Dock />.")
  }

  return context
}

type DockProps = {
  children: React.ReactNode
  className?: string
  role?: React.AriaRole
  "aria-label"?: string
}

/**
 * A macOS-style dock. Track the pointer across the whole strip and every
 * <DockMagnify> springs toward it based on its own distance from the cursor.
 */
export function Dock({
  children,
  className,
  role = "navigation",
  "aria-label": ariaLabel,
}: DockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)

  return (
    <DockContext.Provider value={{ mouseX }}>
      <motion.div
        role={role}
        aria-label={ariaLabel}
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className={cn(
          "relative flex items-center gap-1 rounded-2xl border border-border/80 bg-background/70 p-1.5 shadow-[0_12px_40px_-18px_rgba(3,119,230,0.55)] backdrop-blur-xl dark:bg-background/60",
          className
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  )
}

type DockItemProps = {
  children: React.ReactNode
  href?: string
  active?: boolean
  className?: string
}

export function DockItem({ children, href, active = false, className }: DockItemProps) {
  const { mouseX } = useDock()
  const reduceMotion = useReducedMotion()
  const itemRef = React.useRef<HTMLElement | null>(null)

  const setItemRef = React.useCallback((node: HTMLElement | null) => {
    itemRef.current = node
  }, [])

  const distance = useTransform(mouseX, (value) => {
    if (!Number.isFinite(value) || !itemRef.current) {
      return 200
    }

    const bounds = itemRef.current.getBoundingClientRect()

    return value - bounds.x - bounds.width / 2
  })

  const boostTarget = useTransform(distance, [-170, 0, 170], [0, 1, 0])
  const boost = useSpring(boostTarget, {
    mass: 0.12,
    stiffness: 220,
    damping: 20,
  })
  const padding = useTransform(boost, [0, 1], [10, 22])
  const gap = useTransform(boost, [0, 1], [8, 14])

  const classes = cn(
    "group flex h-8 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-2 text-[11px] font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring/60",
    active
      ? "bg-primary/10 text-primary"
      : "text-[#4d5969] hover:bg-white/40 hover:text-foreground",
    className
  )

  const style = reduceMotion
    ? undefined
    : { paddingLeft: padding, paddingRight: padding, gap }

  const content = (
    <DockItemContext.Provider value={active}>{children}</DockItemContext.Provider>
  )

  if (href) {
    return (
      <MotionLink
        ref={setItemRef}
        href={href}
        aria-current={active ? "page" : undefined}
        className={classes}
        style={style}
      >
        {content}
      </MotionLink>
    )
  }

  return (
    <motion.div ref={setItemRef} className={classes} style={style}>
      {content}
    </motion.div>
  )
}

type DockMagnifyProps = {
  children: React.ReactNode
  className?: string
  max?: number
  range?: number
  expand?: number
}

/**
 * The shared magnification primitive: grows toward the pointer, widens by
 * `expand` pixels on each side, and springs back as the cursor leaves.
 * Used by <DockIcon /> and by plain header icons.
 */
export function DockMagnify({
  children,
  className,
  max = 1.35,
  range = 170,
  expand = 0,
}: DockMagnifyProps) {
  const { mouseX } = useDock()
  const reduceMotion = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement>(null)

  const distance = useTransform(mouseX, (value) => {
    if (!Number.isFinite(value) || !ref.current) {
      return range * 2
    }

    const bounds = ref.current.getBoundingClientRect()

    return value - bounds.x - bounds.width / 2
  })

  const boostTarget = useTransform(distance, [-range, 0, range], [0, 1, 0])
  const boost = useSpring(boostTarget, {
    mass: 0.1,
    stiffness: 240,
    damping: 18,
  })
  const scale = useTransform(boost, [0, 1], [1, max])
  const padding = useTransform(boost, [0, 1], [0, expand])

  return (
    <motion.span
      ref={ref}
      style={
        reduceMotion
          ? undefined
          : { scale, paddingLeft: padding, paddingRight: padding }
      }
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  )
}

type DockIconProps = {
  children: React.ReactNode
  className?: string
}

export function DockIcon({ children, className }: DockIconProps) {
  const active = React.useContext(DockItemContext)

  return (
    <DockMagnify
      max={1.35}
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-full transition-all duration-200",
        active
          ? "bg-primary text-primary-foreground shadow-[0px_4px_7px_rgba(3,119,230,0.6)]"
          : "bg-[rgba(240,244,249,0.7)] text-[#4d5969] group-hover:bg-white group-hover:text-primary",
        className
      )}
    >
      {children}
    </DockMagnify>
  )
}

type DockLabelProps = {
  children: React.ReactNode
  className?: string
}

export function DockLabel({ children, className }: DockLabelProps) {
  return (
    <span
      className={cn(
        "text-[11px] font-medium leading-none tracking-[0.275px] whitespace-nowrap",
        className
      )}
    >
      {children}
    </span>
  )
}
