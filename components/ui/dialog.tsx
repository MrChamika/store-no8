"use client"

import * as React from "react"
import { AnimatePresence, motion, type Transition, type Variants } from "motion/react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  variants?: Variants
  transition?: Transition
}

const DialogContext = React.createContext<DialogContextValue | undefined>(undefined)

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog provider")
  }
  return context
}

export const defaultDialogVariants: Variants = {
  initial: {
    scale: 0.92,
    filter: "blur(10px)",
    y: 40,
    opacity: 0,
  },
  animate: {
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    opacity: 1,
  },
  exit: {
    scale: 0.95,
    filter: "blur(6px)",
    y: 20,
    opacity: 0,
  },
}

export const defaultDialogTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.35,
}

export interface DialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variants?: Variants
  transition?: Transition
}

export function Dialog({
  children,
  open: controlledOpen,
  onOpenChange,
  variants = defaultDialogVariants,
  transition = defaultDialogTransition,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  return (
    <DialogContext.Provider value={{ open, setOpen, variants, transition }}>
      {children}
    </DialogContext.Provider>
  )
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function DialogTrigger({
  children,
  className,
  onClick,
  ...props
}: DialogTriggerProps) {
  const { setOpen } = useDialog()

  return (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) {
          setOpen(true)
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string
}

export function DialogContent({
  children,
  className,
  containerClassName,
  ...props
}: DialogContentProps) {
  const { open, setOpen, variants, transition } = useDialog()

  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, setOpen])

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6",
            containerClassName
          )}
        >
          {/* Backdrop with blur & smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className={cn(
              "relative z-10 w-full max-w-lg rounded-2xl border border-border/70 bg-card p-6 shadow-2xl shadow-primary/10 sm:p-8",
              className
            )}
            {...(props as any)}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-left", className)}
      {...props}
    />
  )
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl",
        className
      )}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

export function DialogClose({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialog()

  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      aria-label="Close dialog"
      className={cn(
        "absolute top-4 right-4 grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
      {...props}
    >
      <X className="size-4" />
    </button>
  )
}
