import type { Metadata } from "next"
import { Suspense } from "react"

import { ScrollReveal } from "@/components/motion/scroll-reveal"
import { ProductBrowser } from "@/components/product-browser"
import { products } from "@/lib/products"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse toys & collectibles, fashion bags, beauty & hair accessories, artistic home decor and fine ceramics at Store No. 8 in Kegalle. Quality goods, fairly priced with island-wide delivery.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: `Shop All Products | ${site.name}`,
    description:
      "Explore curated essentials across toys & collectibles, fashion bags, beauty & hair, home decor, and ceramics at Store No. 8.",
    url: `${site.url}/products`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Store No. 8 product shelves",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Shop All Products | ${site.name}`,
    description:
      "Explore curated essentials across toys & collectibles, fashion bags, beauty & hair, home decor, and ceramics at Store No. 8.",
    images: [
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80",
    ],
  },
}

export default function ProductsPage() {
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
        name: "Products",
        item: `${site.url}/products`,
      },
    ],
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ScrollReveal blur>
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Shop
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Everything on the shelves
          </h1>
          <p className="mt-3 text-muted-foreground text-pretty">
            {products.length} products across five categories. Filter by category
            or sort by what matters to you.
          </p>
        </header>
      </ScrollReveal>

      <Suspense
        fallback={
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="aspect-4/5 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        }
      >
        <ProductBrowser products={products} />
      </Suspense>
    </div>
  )
}
