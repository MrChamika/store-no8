"use client"

import * as React from "react"
import dynamic from "next/dynamic"

const DynamicGradientWaves = dynamic(
  () => import("@/components/GradientWaves"),
  { ssr: false }
)

const emptySubscribe = () => () => { }

function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

function useIsMobile(query = "(max-width: 768px)") {
  return React.useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query)
      media.addEventListener("change", callback)
      return () => media.removeEventListener("change", callback)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

/**
 * Fixed, site-wide backdrop: Gradient Waves shader carried behind every page.
 * Optimized with balanced quality on mobile to preserve 60+ FPS and save battery.
 * Signature Store No. 8 Cobalt Blue (#0377e6) with interactive lighting & swell effects.
 */
export function SiteBackground() {
  const mounted = useIsMounted()
  const isMobile = useIsMobile()

  if (!mounted) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <DynamicGradientWaves
          horizonColor="#0377e6"
          waveColor="#0377e6"
          crestColor="#0377e6"
          speed={0.34}
          amplitude={2.9}
          relief={1}
          lightAngle={138}
          mouseInteraction
          swellOnClick
          waveRatio={1.01}
          tilt={54}
          height={4.5}
          fogDepth={24.5}
          grain={0.19}
          quality={isMobile ? "medium" : "high"}
          parallaxStrength={0.39}
          mouseStrength={0.53}
          lightMode
        />
      </div>
    </div>
  )
}
