"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Menu,
  PhoneCall,
  Search,
  ShoppingCart,
  Store,
  User,
} from "lucide-react"

import { useCart } from "@/components/cart-provider"
import { Dock, DockIcon, DockItem, DockLabel, DockMagnify } from "@/components/motion-primitives/dock"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Shop", icon: Store },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: PhoneCall },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const headerRef = React.useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = React.useState(true)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Only apply hide/show behavior on mobile / small screens or when scrolled past header
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        // Scrolling down -> hide
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> show
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const header = headerRef.current

    if (!header) {
      return
    }

    const sync = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.offsetHeight}px`
      )
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(header)

    return () => observer.disconnect()
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        !isVisible && "-translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto"
      )}
    >
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <p>Free island-wide delivery on orders over LKR 5,000</p>
          <p className="hidden sm:block">
            {site.phone} · {site.address.city}, {site.address.region}
          </p>
        </div>
      </div>

      <div className="border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-20 lg:px-8">
          <Link
            href="/"
            className="flex items-center rounded-lg transition-transform hover:scale-[1.02]"
            aria-label={`${site.name} home`}
          >
            <Image
              src="/images/store-no8-logo.png"
              alt={site.name}
              width={108}
              height={36}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <Dock
              aria-label="Main"
              className="h-[43px] rounded-full border border-[#c6dcf3] bg-[#dae9f8]/90 px-2 py-1 shadow-[0_4px_20px_-8px_rgba(3,119,230,0.2)] backdrop-blur-md"
            >
              {navLinks.map((link) => {
                const Icon = link.icon

                return (
                  <DockItem
                    key={link.href}
                    href={link.href}
                    active={isActive(link.href)}
                  >
                    <DockIcon>
                      <Icon className="size-4" aria-hidden="true" />
                    </DockIcon>
                    <DockLabel>{link.label}</DockLabel>
                  </DockItem>
                )
              })}

              <div className="mx-0.5 h-4 w-px bg-[#c6dcf3]" aria-hidden="true" />

              <DockMagnify expand={4} className="rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  nativeButton={false}
                  className="size-7 rounded-full text-[#4d5969] hover:bg-white/70 hover:text-primary"
                  render={
                    <Link href="/products" aria-label="Search products" />
                  }
                >
                  <Search className="size-4" aria-hidden="true" />
                </Button>
              </DockMagnify>
            </Dock>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Dock
              role="group"
              aria-label="Quick actions"
              className="gap-1 border-0 bg-transparent p-0 shadow-none backdrop-blur-none"
            >
              <DockMagnify expand={6} className="rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  nativeButton={false}
                  className="size-9 rounded-full text-[#4d5969] hover:bg-muted/70 hover:text-primary"
                  render={
                    <Link
                      href="/cart"
                      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                      className="relative"
                    />
                  }
                >
                  <ShoppingCart className="size-5" aria-hidden="true" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-4 text-accent-foreground">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </DockMagnify>

              <DockMagnify expand={6} className="rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  nativeButton={false}
                  className="size-9 rounded-full text-[#4d5969] hover:bg-muted/70 hover:text-primary"
                  render={
                    <Link href="/about" aria-label="About us and account" />
                  }
                >
                  <User className="size-5" aria-hidden="true" />
                </Button>
              </DockMagnify>
            </Dock>

            <Sheet>
              <SheetTrigger
                className="grid size-8 place-items-center rounded-lg transition-colors hover:bg-muted md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>{site.name}</SheetTitle>
                  <SheetDescription>
                    Curated essentials for everyday life.
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                        isActive(link.href)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto border-t px-4 py-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Visit the store</p>
                  <p className="mt-1">
                    {site.address.line1}, {site.address.city}
                  </p>
                  <p className="mt-2">{site.phone}</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}


