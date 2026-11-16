import Image from "next/image"
import Link from "next/link"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { FacebookIcon, InstagramIcon } from "@/components/brand-icons"
import { FooterWaves } from "@/components/footer-waves"
import { site } from "@/lib/site"

const shopLinks = [
  { href: "/products?category=toys-collectibles", label: "Toys & Collectibles" },
  { href: "/products?category=bags-accessories", label: "Bags & Accessories" },
  { href: "/products?category=beauty-accessories", label: "Beauty & Hair" },
  { href: "/products?category=home-decor", label: "Home Decor & Living" },
  { href: "/products?category=ceramics-tableware", label: "Ceramics & Tableware" },
]

const companyLinks = [
  { href: "/about", label: "Our story" },
  { href: "/products", label: "All products" },
  { href: "/contact", label: "Contact & visit" },
  { href: "/cart", label: "Your cart" },
]

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-background sm:mt-24">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14 sm:pb-28 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:gap-10 lg:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="flex items-center" aria-label={`${site.name} home`}>
                <Image
                  src="/images/store-no8-logo.png"
                  alt={site.name}
                  width={108}
                  height={36}
                  className="h-9 w-auto"
                />
              </Link>
              <div className="flex items-center gap-2">
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Store No. 8 on Facebook"
                  className="grid size-9 place-items-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <FacebookIcon className="size-4" />
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Store No. 8 on Instagram"
                  className="grid size-9 place-items-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <InstagramIcon className="size-4" />
                </a>
              </div>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.tagline} A curated boutique in Kegalle stocking toys &
              collectibles, fashion bags, beauty accessories, artistic home decor
              and fine ceramics.
            </p>
          </div>

          <nav aria-label="Shop">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em]">
              Shop
            </h2>
            <ul className="mt-3 space-y-2 text-sm sm:mt-4 sm:space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em]">
              Company
            </h2>
            <ul className="mt-3 space-y-2 text-sm sm:mt-4 sm:space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em]">
              Visit us
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground sm:mt-4 sm:space-y-3">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.region}{" "}
                  {site.address.postalCode}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${site.phoneHref}`}
                  className="transition-colors hover:text-foreground"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {site.hours[0].days}: {site.hours[0].time}
                  <br />
                  {site.hours[2].days}: {site.hours[2].time}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative">
        <FooterWaves className="pointer-events-none absolute inset-x-0 bottom-full h-24 w-full sm:h-32 dark:opacity-25" />

        <div className="relative bg-linear-to-b from-[#0377e6] to-[#025db4] dark:from-[#062a4e] dark:to-[#03121f]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 pt-6 pb-24 text-center text-xs text-white/85 sm:flex-row sm:px-6 sm:text-left md:pb-6 lg:px-8">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p>Proudly stocked and served in Kegalle, Sri Lanka.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

