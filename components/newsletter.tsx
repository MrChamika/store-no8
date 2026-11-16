"use client"

import * as React from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  defaultDialogVariants,
  defaultDialogTransition,
} from "@/components/ui/dialog"

export function Newsletter() {
  const [email, setEmail] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [submittedEmail, setSubmittedEmail] = React.useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = email.trim()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error("Enter a valid email address")
      return
    }

    setPending(true)
    window.setTimeout(() => {
      setPending(false)
      setSubmittedEmail(value)
      setEmail("")
      setModalOpen(true)
      toast.success("You are on the list!", {
        description: "Expect new arrivals and restock alerts in your inbox.",
      })
    }, 500)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-lg flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 flex-1"
          aria-invalid={email.length > 0 && !email.includes("@")}
        />
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-11 shrink-0"
        >
          {pending ? "Subscribing…" : "Get restock alerts"}
          <Send aria-hidden="true" />
        </Button>
      </form>

      {/* Motion Primitives Animated Dialog Modal with Site Theme */}
      <Dialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        variants={defaultDialogVariants}
        transition={defaultDialogTransition}
      >
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <CheckCircle2 className="size-6" />
            </span>
            <DialogHeader className="mt-4 text-center">
              <DialogTitle className="text-center">You're on the list!</DialogTitle>
              <DialogDescription className="text-center">
                We've registered <strong className="text-foreground">{submittedEmail}</strong>. You'll be first to hear about fresh arrivals, weekly restocks, and exclusive promotions.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 flex w-full justify-center">
              <Button
                onClick={() => setModalOpen(false)}
                className="w-full sm:w-auto"
                size="lg"
              >
                Got it, thank you
              </Button>
            </div>
          </div>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </>
  )
}
