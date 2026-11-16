"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [pending, setPending] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    if (!name || !email || !message) {
      toast.error("Please fill in your name, email and message")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address")
      return
    }

    setPending(true)
    window.setTimeout(() => {
      setPending(false)
      form.reset()
      toast.success("Message sent", {
        description: "We usually reply within one working day.",
      })
    }, 700)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border bg-card p-6 sm:p-8"
    >
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Send us a message
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Product questions, bulk orders or anything else — we reply fast.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" placeholder="Your name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="How can we help?"
        />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="self-start">
        {pending ? "Sending…" : "Send message"}
        <Send aria-hidden="true" />
      </Button>
    </form>
  )
}
