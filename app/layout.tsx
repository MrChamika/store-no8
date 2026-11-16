import type { Metadata, Viewport } from "next"
import { Nunito_Sans, Rubik, Poiret_One } from "next/font/google"

import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { LazySplashCursor } from "@/components/lazy-splash-cursor"
import { MobileNav } from "@/components/mobile-nav"
import { MotionProvider } from "@/components/motion/motion-provider"
import { ScrollProgress } from "@/components/motion-primitives/scroll-progress"
import { SiteBackground } from "@/components/site-background"
import { SiteFooter } from "@/components/site-footer"
import { SitePreloader } from "@/components/site-preloader"
import { SpinningBadge } from "@/components/spinning-badge"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/sonner"
import { site } from "@/lib/site"

const poiret = Poiret_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
  display: "swap",
})

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
})

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
})

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  category: "retail",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: [
    "Store No. 8",
    "retail store Sri Lanka",
    "Kegalle retail shop",
    "shopping Kegalle",
    "toys and gifts Kegalle",
    "kids electric ride on cars Sri Lanka",
    "fashion bags Kegalle",
    "home decor statues Sri Lanka",
    "ceramics and mugs Sri Lanka",
    "curated essentials",
    "Kandy Road Kegalle",
    "islandwide delivery Sri Lanka",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_LK",
    images: [
      {
        url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${site.name} curated boutique retail store on Kandy Road, Kegalle`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80",
    ],
  },
}

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": `${site.url}/#store`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/android-chrome-512x512.png`,
  image:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  description: site.description,
  telephone: site.phoneHref,
  email: site.email,
  priceRange: "$$",
  currenciesAccepted: "LKR",
  paymentAccepted: "Cash, Credit Card, Debit Card, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 7.2513,
    longitude: 80.3464,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  sameAs: [site.social.facebook, site.social.instagram],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: {
    "@id": `${site.url}/#store`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/products?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${rubik.variable} ${nunito.variable} ${poiret.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-svh font-sans">
        <SitePreloader />
        <SiteBackground />
        <MotionProvider>
          <CartProvider>
            <div
              aria-hidden="true"
              className="fixed inset-x-0 top-0 z-[70] h-1 bg-primary/10"
            >
              <ScrollProgress className="h-full bg-primary shadow-[0_0_12px_rgba(3,119,230,0.55)]" />
            </div>
            <div className="flex min-h-svh flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <MobileNav />
            <SpinningBadge />
            <Toaster position="top-center" richColors />
            <LazySplashCursor />
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
