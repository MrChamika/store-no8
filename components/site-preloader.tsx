"use client"

import * as React from "react"

const MIN_DURATION = 2500 // Minimum 2.5 seconds display time

export function SitePreloader() {
  const [isExiting, setIsExiting] = React.useState(false)
  const [isDone, setIsDone] = React.useState(false)

  const frontWaveRef = React.useRef<SVGPathElement>(null)
  const backWaveRef = React.useRef<SVGPathElement>(null)
  const frontGroupRef = React.useRef<SVGGElement>(null)
  const backGroupRef = React.useRef<SVGGElement>(null)
  const progressTextRef = React.useRef<HTMLSpanElement>(null)

  // Real progress tracking refs
  const realProgressRef = React.useRef(20)
  const isLoadedRef = React.useRef(false)
  const displayProgressRef = React.useRef(0)

  // Exit trigger
  const handleDismiss = React.useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      setIsDone(true)
      document.body.style.overflow = ""
    }, 750)
  }, [])

  React.useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = "hidden"

    // Allow escape key as keyboard shortcut
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss()
      }
    }
    window.addEventListener("keydown", onKeyDown)

    const startTime = performance.now()
    let lastTime = startTime

    // 1. Measure document readyState
    if (document.readyState === "complete") {
      isLoadedRef.current = true
      realProgressRef.current = 100
    } else {
      const handleReadyState = () => {
        if (document.readyState === "interactive") {
          realProgressRef.current = Math.max(realProgressRef.current, 50)
        } else if (document.readyState === "complete") {
          isLoadedRef.current = true
          realProgressRef.current = 100
        }
      }
      document.addEventListener("readystatechange", handleReadyState)

      const handleWindowLoad = () => {
        isLoadedRef.current = true
        realProgressRef.current = 100
      }
      window.addEventListener("load", handleWindowLoad)
    }

    // 2. Measure fonts readiness
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        realProgressRef.current = Math.max(realProgressRef.current, 60)
      })
    }

    // 3. Monitor images in DOM
    const checkImages = () => {
      const imgs = Array.from(document.images)
      if (imgs.length > 0) {
        const loadedCount = imgs.filter(
          (img) => img.complete && img.naturalHeight !== 0
        ).length
        const ratio = loadedCount / imgs.length
        realProgressRef.current = Math.max(
          realProgressRef.current,
          Math.round(40 + ratio * 50)
        )
      }
    }
    checkImages()
    const imgInterval = setInterval(checkImages, 250)

    // Safety fallback: after 5.5s force completion so user is never stuck
    const safetyTimeout = setTimeout(() => {
      isLoadedRef.current = true
      realProgressRef.current = 100
    }, 5500)

    // Robust wave builder with exact horizontal bounds for STORE NO 8
    const buildWave = (
      t: number,
      levelY: number,
      freq1: number,
      amp1: number,
      speed1: number,
      freq2: number,
      amp2: number,
      speed2: number,
      phaseOffset: number
    ) => {
      const startX = 80
      const endX = 1020
      const bottomY = 250
      const step = 12
      let d = `M ${startX} ${bottomY} L ${startX} ${levelY.toFixed(1)}`

      for (let x = startX; x <= endX; x += step) {
        const y =
          levelY +
          Math.sin(x * freq1 + t * speed1 + phaseOffset) * amp1 +
          Math.cos(x * freq2 - t * speed2) * amp2
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
      }
      d += ` L ${endX} ${bottomY} Z`
      return d
    }

    let animId: number
    let exitTriggered = false

    const render = (now: number) => {
      const dt = Math.min(100, Math.max(1, now - lastTime))
      lastTime = now
      const elapsed = now - startTime
      const timeRatio = Math.min(1, elapsed / MIN_DURATION)
      const timeProgress = timeRatio * 100

      // Compute target progress
      let target = 0
      if (isLoadedRef.current) {
        // Site finished loading: enforce minimum 2.5s pacing
        target = timeRatio >= 1 ? 100 : timeProgress
      } else {
        // Site still loading: display real progress, capped at 90% and paced by time
        const pacedReal = Math.min(realProgressRef.current, timeProgress)
        target = Math.min(90, Math.max(displayProgressRef.current, pacedReal))
      }

      // Frame-rate independent exponential smoothing (prevents mobile frame drop lag)
      const factor = 1 - Math.exp(-dt * 0.006)
      if (target >= 100 && elapsed >= MIN_DURATION) {
        displayProgressRef.current += (100 - displayProgressRef.current) * Math.max(factor * 1.5, 0.15)
        if (displayProgressRef.current >= 99.5) {
          displayProgressRef.current = 100
        }
      } else {
        displayProgressRef.current += (target - displayProgressRef.current) * factor
      }

      const cur = displayProgressRef.current
      const rounded = Math.min(100, Math.round(cur))

      // Direct DOM update for high-performance 60fps counter
      if (progressTextRef.current) {
        progressTextRef.current.textContent = String(rounded)
      }

      // Exact levelY calculation:
      // Text bounds in viewBox are y=39 (top) to y=220 (bottom)
      // At 0%: levelY = 236 (crests completely below bottom of letters)
      // At 100%: levelY = 22 (troughs completely above top of letters)
      const levelY = 236 - (cur / 100) * 214
      const damp = cur > 96 ? Math.max(0, (100 - cur) / 4) : 1
      const t = elapsed * 0.0035

      if (frontWaveRef.current) {
        frontWaveRef.current.setAttribute(
          "d",
          buildWave(t, levelY, 0.016, 9 * damp, 2.8, 0.009, 5 * damp, 1.6, 0)
        )
      }
      if (backWaveRef.current) {
        backWaveRef.current.setAttribute(
          "d",
          buildWave(t, levelY + 6, 0.013, 12 * damp, 1.9, 0.021, 4 * damp, 2.2, 1.9)
        )
      }

      // Force mobile WebKit / Android GPU compositor to re-rasterize clipped layers every frame
      if (frontGroupRef.current) {
        frontGroupRef.current.style.transform = "translateZ(0)"
      }
      if (backGroupRef.current) {
        backGroupRef.current.style.transform = "translateZ(0)"
      }

      // Check if finished
      if (cur >= 100 && !exitTriggered) {
        exitTriggered = true
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(() => {
            setIsDone(true)
            document.body.style.overflow = ""
          }, 750)
        }, 250)
      }

      if (!exitTriggered || elapsed < MIN_DURATION + 1500) {
        animId = requestAnimationFrame(render)
      }
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(imgInterval)
      clearTimeout(safetyTimeout)
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleDismiss])

  if (isDone) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-label="Site preloader"
      aria-busy={!isExiting}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F7FBFF] transition-opacity duration-700 ease-out select-none ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Brand theme radial ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(3,119,230,0.16)_0%,rgba(3,119,230,0.04)_50%,transparent_70%)] blur-[70px]"
      />

      {/* Main Center Animated Typography */}
      <div
        className={`relative flex w-[92%] max-w-[950px] flex-col items-center transition-all duration-750 ease-out ${
          isExiting
            ? "scale-[2.6] opacity-0 blur-[12px]"
            : "scale-100 opacity-100 blur-0"
        }`}
      >
        <svg
          viewBox="90 20 920 210"
          preserveAspectRatio="xMidYMid meet"
          className="h-auto w-full overflow-visible pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="preloader-back-wave" clipPathUnits="userSpaceOnUse">
              <path ref={backWaveRef} d="" />
            </clipPath>
            <clipPath id="preloader-front-wave" clipPathUnits="userSpaceOnUse">
              <path ref={frontWaveRef} d="" />
            </clipPath>
          </defs>

          {/* Base unfilled letters in subtle soft slate/ice-blue on #F7FBFF */}
          <g
            fill="#D3E3F2"
            stroke="#D3E3F2"
            strokeWidth="4px"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="select-none"
          >
            <text
              x="146"
              y="130"
              dominantBaseline="central"
              style={{
                fontFamily: "var(--font-logo), 'Poiret One', cursive, sans-serif",
                fontSize: "155px",
                letterSpacing: "0.03em",
              }}
            >
              STORE
            </text>
            {/* Signature Art Deco High-Diagonal 'N' matching the store logo */}
            <path
              d="M 598 68 L 634.2 88.3 L 634.2 68.9 L 643 68.9 L 643 195 L 634.2 195 L 634.2 97.1 L 606 81.2 L 606 195 L 598 195 Z"
              strokeWidth="1.5px"
              strokeLinejoin="round"
            />
            <text
              x="658"
              y="130"
              dominantBaseline="central"
              style={{
                fontFamily: "var(--font-logo), 'Poiret One', cursive, sans-serif",
                fontSize: "155px",
                letterSpacing: "0.03em",
              }}
            >
              O
            </text>
            <circle cx="812" cy="190" r="6.5" stroke="none" />
            <text
              x="836"
              y="130"
              dominantBaseline="central"
              style={{
                fontFamily: "var(--font-logo), 'Poiret One', cursive, sans-serif",
                fontSize: "155px",
                letterSpacing: "0.03em",
              }}
            >
              8
            </text>
          </g>

          {/* Back wave: Lighter tinted blue liquid wave (#72B2F8) */}
          <g
            ref={backGroupRef}
            clipPath="url(#preloader-back-wave)"
            fill="#72B2F8"
            stroke="#72B2F8"
            strokeWidth="4px"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="select-none"
            style={{
              opacity: 0.75,
              willChange: "transform",
            }}
          >
            <text
              x="146"
              y="130"
              dominantBaseline="central"
              style={{
                fontFamily: "var(--font-logo), 'Poiret One', cursive, sans-serif",
                fontSize: "155px",
                letterSpacing: "0.03em",
              }}
            >
              STORE
            </text>
            <path
              d="M 598 68 L 634.2 88.3 L 634.2 68.9 L 643 68.9 L 643 195 L 634.2 195 L 634.2 97.1 L 606 81.2 L 606 195 L 598 195 Z"
              strokeWidth="1.5px"
              strokeLinejoin="round"
            />
            <text
              x="658"
              y="130"
              dominantBaseline="central"
              style={{
                fontFamily: "var(--font-logo), 'Poiret One', cursive, sans-serif",
                fontSize: "155px",
                letterSpacing: "0.03em",
              }}
            >
              O
            </text>
            <circle cx="812" cy="190" r="6.5" stroke="none" />
            <text
              x="836"
              y="130"
              dominantBaseline="central"
              style={{
                fontFamily: "var(--font-logo), 'Poiret One', cursive, sans-serif",
                fontSize: "155px",
                letterSpacing: "0.03em",
              }}
            >
              8
            </text>
          </g>

          {/* Front wave: Filled in signature Store No. 8 Cobalt Blue (#0377E6) */}
          <g
            ref={frontGroupRef}
            clipPath="url(#preloader-front-wave)"
            fill="#0377E6"
            stroke="#0377E6"
            strokeWidth="4px"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="select-none"
            style={{
              willChange: "transform",
            }}
          >
            <text
              x="146"
              y="130"
              dominantBaseline="central"
              style={{
                fontFamily: "var(--font-logo), 'Poiret One', cursive, sans-serif",
                fontSize: "155px",
                letterSpacing: "0.03em",
              }}
            >
              STORE
            </text>
            <path
              d="M 598 68 L 634.2 88.3 L 634.2 68.9 L 643 68.9 L 643 195 L 634.2 195 L 634.2 97.1 L 606 81.2 L 606 195 L 598 195 Z"
              strokeWidth="1.5px"
              strokeLinejoin="round"
            />
            <text
              x="658"
              y="130"
              dominantBaseline="central"
              style={{
                fontFamily: "var(--font-logo), 'Poiret One', cursive, sans-serif",
                fontSize: "155px",
                letterSpacing: "0.03em",
              }}
            >
              O
            </text>
            <circle cx="812" cy="190" r="6.5" stroke="none" />
            <text
              x="836"
              y="130"
              dominantBaseline="central"
              style={{
                fontFamily: "var(--font-logo), 'Poiret One', cursive, sans-serif",
                fontSize: "155px",
                letterSpacing: "0.03em",
              }}
            >
              8
            </text>
          </g>
        </svg>

        {/* Status indicator row (bottom-right aligned under typography) */}
        <div className="flex w-full justify-end pr-2 sm:pr-4 md:pr-6 mt-1 sm:mt-2">
          <div className="font-mono text-xs sm:text-sm tracking-wider select-none text-[#0377E6]/75">
            <span className="font-semibold">loading... </span>
            <span
              ref={progressTextRef}
              className="inline-block min-w-[2.2ch] text-right font-bold text-[#0377E6]"
            >
              0
            </span>
            <span className="font-semibold"> %</span>
          </div>
        </div>
      </div>
    </div>
  )
}
