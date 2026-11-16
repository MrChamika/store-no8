import type { Metadata } from "next"
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react"

import { FacebookIcon, InstagramIcon } from "@/components/brand-icons"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact & Visit — Kegalle Retail Store",
  description:
    "Visit Store No. 8 at No 493, Kandy Road, Kegalle. Call 0352 222 360, message via WhatsApp, or send us an inquiry. Open 7 days a week.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact & Visit | ${site.name}`,
    description:
      "Visit Store No. 8 at No 493, Kandy Road, Kegalle. Open 7 days a week with parking available.",
    url: `${site.url}/contact`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${site.name} Kegalle location`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact & Visit | ${site.name}`,
    description:
      "Visit Store No. 8 at No 493, Kandy Road, Kegalle. Open 7 days a week.",
  },
}

const contactCards = [
  {
    icon: MapPin,
    title: "Visit the store",
    lines: [
      site.address.line1,
      `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
    ],
    href:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        `${site.name} ${site.address.line1} ${site.address.city}`
      ),
    action: "Get directions on Google Maps",
  },
  {
    icon: Phone,
    title: "Call us",
    lines: [site.phone, "Available during shop hours"],
    href: `tel:${site.phoneHref}`,
    action: "Call now: 0352 222 360",
  },
  {
    icon: Mail,
    title: "Email us",
    lines: [site.email, "Typically replies within 24 hours"],
    href: `mailto:${site.email}`,
    action: "Send an email",
  },
  {
    icon: Clock,
    title: "Opening hours",
    lines: site.hours.map((entry) => `${entry.days}: ${entry.time}`),
    action: "Open 7 days a week & Poya days",
  },
]

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${site.url}/contact`,
      },
    ],
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Contact
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Come by, call, or drop us a line
        </h1>
        <p className="mt-3 text-muted-foreground text-pretty">
          We are located at No 493, Kandy Road in Kegalle. Dedicated parking is
          available right in front of the store.
        </p>
      </header>

      {/* Quick Location Banner */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Navigation className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-heading font-semibold text-foreground">
              Travelling along Kandy Road?
            </p>
            <p className="text-sm text-muted-foreground">
              Find us directly on the main road, easily accessible from both Colombo and Kandy routes.
            </p>
          </div>
        </div>
        <a
          href={
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(
              `${site.name} ${site.address.line1} ${site.address.city}`
            )
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          Open in Maps
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          {contactCards.map((card) => {
            const content = (
              <>
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <card.icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-heading text-base font-semibold">
                  {card.title}
                </h2>
                <div className="mt-1.5 flex flex-col gap-1 text-sm text-muted-foreground">
                  {card.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
                {card.action && (
                  <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
                    <span>{card.action}</span>
                  </p>
                )}
              </>
            )

            return (
              <Card key={card.title} className="hover-lift border border-border/70">
                <CardContent className="p-5">
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        card.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <ContactForm />
      </div>

      <section className="mt-12 rounded-3xl border border-border/70 bg-card p-6 shadow-xs sm:p-8">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Connect with the store
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          New arrivals, restocks, island-wide parcel dispatches and community updates.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <FacebookIcon className="size-4" />
            Facebook
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <InstagramIcon className="size-4" />
            Instagram
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp Orders
          </a>
        </div>
      </section>
    </div>
  )
}
