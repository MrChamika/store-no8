"use client"

import * as React from "react"
import { Download, Share2, Smartphone, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = React.useState(false)
  const [isIos, setIsIos] = React.useState(false)
  const [isStandalone, setIsStandalone] = React.useState(false)

  React.useEffect(() => {
    // 1. Register Service Worker in production / supported environments
    if ("serviceWorker" in navigator && typeof window !== "undefined") {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            // Service worker registered successfully
            if (process.env.NODE_ENV === "development") {
              console.log("[PWA] ServiceWorker registered with scope:", registration.scope)
            }
          })
          .catch((error) => {
            if (process.env.NODE_ENV === "development") {
              console.error("[PWA] ServiceWorker registration failed:", error)
            }
          })
      })
    }

    // 2. Check if already running as standalone app
    const isRunningStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true

    if (isRunningStandalone) {
      setIsStandalone(true)
      return
    }

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !/crios|fxios/.test(userAgent)
    setIsIos(isIosDevice)

    // Check if dismissed recently (cooldown: 5 days)
    const dismissedTime = localStorage.getItem("store_no8_pwa_dismissed")
    if (dismissedTime && Date.now() - parseInt(dismissedTime, 10) < 5 * 24 * 60 * 60 * 1000) {
      return
    }

    // 4. Capture beforeinstallprompt (Android Chrome, Edge, desktop Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show install prompt after a short delay so user has seen the site first
      setTimeout(() => {
        setShowBanner(true)
      }, 3500)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setShowBanner(false)
      setDeferredPrompt(null)
    } else {
      handleDismiss()
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
    try {
      localStorage.setItem("store_no8_pwa_dismissed", Date.now().toString())
    } catch {
      // Ignore storage errors
    }
  }

  // Do not show if already installed in standalone mode or no prompt available
  if (isStandalone || !showBanner || !deferredPrompt) {
    return null
  }

  return (
    <aside
      aria-label="Install web application"
      className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-md sm:bottom-6 sm:left-auto sm:right-6 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative flex items-center justify-between gap-3.5 rounded-2xl border border-primary/20 bg-background/95 p-4 shadow-xl shadow-primary/10 backdrop-blur-md">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
          <Smartphone className="size-6" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-bold text-foreground">
            Install Store No. 8 App
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
            Add to home screen for 1-tap fast shopping & offline browsing.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={handleInstallClick}
            className="h-8 gap-1.5 px-3 text-xs font-semibold shadow-xs"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Install
          </Button>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss install prompt"
            className="grid size-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  )
}
