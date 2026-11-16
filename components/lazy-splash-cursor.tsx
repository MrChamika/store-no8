"use client"

import * as React from "react"
import dynamic from "next/dynamic"

const DynamicSplashCursor = dynamic(
  () => import("@/components/splash-cursor"),
  { ssr: false }
)

export function LazySplashCursor() {
  const [shouldMount, setShouldMount] = React.useState(false)

  React.useEffect(() => {
    // Only run on desktop devices with fine pointer (mouse) and where reduced motion is disabled
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (!hasFinePointer || prefersReducedMotion) {
      return
    }

    // Delay mounting until the browser is idle to protect FCP/LCP metrics
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let idleId: number | undefined

    const win = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(() => setShouldMount(true), {
        timeout: 1500,
      })
    } else {
      timeoutId = setTimeout(() => setShouldMount(true), 1000)
    }

    return () => {
      if (idleId && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId)
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  if (!shouldMount) {
    return null
  }

  return (
    <DynamicSplashCursor
      rainbow={false}
      size={1}
      force={2.05}
      swirl={3}
      trail={1}
      clickSplash
      colors={["#4f8cff"]}
      style={{ top: "var(--site-header-height, 4rem)" }}
    />
  )
}
