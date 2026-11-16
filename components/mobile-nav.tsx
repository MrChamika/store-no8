"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Store, User } from "lucide-react"

import { useCart } from "@/components/cart-provider"
import { AnimatedBackground } from "@/components/motion-primitives/animated-background"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Shop", icon: Store },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/about", label: "Story", icon: User },
]

/**
 * Floating bottom tab bar for small screens. The moving pill is a shared
 * layout animation from AnimatedBackground (Motion Primitives).
 * Auto-hides on scroll down and reappears on scroll up.
 */
export function MobileNav() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const [isVisible, setIsVisible] = React.useState(true)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        // Scrolling down -> fade down / hide
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> appear
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const activeHref =
    tabs.find((tab) =>
      tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href)
    )?.href ?? "/"

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden transition-all duration-300 ease-in-out",
        !isVisible && "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <nav
          aria-label="Quick navigation"
          className="mx-auto flex max-w-md items-stretch gap-0.5 rounded-2xl border border-border/70 bg-background/90 p-1.5 shadow-lg shadow-foreground/5 backdrop-blur-xl"
        >
          <AnimatedBackground
            key={activeHref}
            defaultValue={activeHref}
            className="rounded-xl bg-primary/10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeHref === tab.href

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  data-id={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className="flex-1 items-center justify-center rounded-xl py-1.5 text-[10px] font-medium text-muted-foreground transition-colors data-[checked=true]:text-primary"
                >
                  <span className="flex flex-col items-center gap-1">
                    <span className="relative">
                      <Icon className="size-5" aria-hidden="true" />
                      {tab.href === "/cart" && itemCount > 0 && (
                        <span className="absolute -top-1.5 -right-2 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-semibold leading-4 text-accent-foreground">
                          {itemCount}
                        </span>
                      )}
                    </span>
                    <span>{tab.label}</span>
                  </span>
                </Link>
              )
            })}
          </AnimatedBackground>
        </nav>
      </div>
    </div>
  )
}
