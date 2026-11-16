import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { ProductGallery } from "@/components/product-gallery"
import { ProductPurchasePanel } from "@/components/product-purchase-panel"
import { SectionHeading } from "@/components/section-heading"
import { getCategory, getProduct, products } from "@/lib/products"
import { formatLKR, site } from "@/lib/site"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  const category = getCategory(product.category)
  const canonicalUrl = `${site.url}/products/${product.slug}`

  return {
    title: `${product.name} — ${category?.name ?? "Shop"}`,
    description: `${product.description} Available at Store No. 8 on Kandy Road, Kegalle for ${formatLKR(product.price)}. Island-wide delivery in Sri Lanka.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | ${site.name}`,
      description: product.description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: product.image,
          width: 900,
          height: 1125,
          alt: `${product.name} — Store No. 8`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${site.name}`,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    notFound()
  }

  const category = getCategory(product.category)
  const related = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id
    )
    .slice(0, 4)

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery,
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    category: category?.name,
    offers: {
      "@type": "Offer",
      url: `${site.url}/products/${product.slug}`,
      priceCurrency: "LKR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: site.name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: "5",
      worstRating: "1",
    },
  }

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
        name: "Shop",
        item: `${site.url}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category?.name ?? "Category",
        item: `${site.url}/products?category=${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `${site.url}/products/${product.slug}`,
      },
    ],
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <ChevronRight className="size-4" aria-hidden="true" />
          <li>
            <Link
              href="/products"
              className="transition-colors hover:text-foreground"
            >
              Shop
            </Link>
          </li>
          <ChevronRight className="size-4" aria-hidden="true" />
          <li>
            <Link
              href={`/products?category=${product.category}`}
              className="transition-colors hover:text-foreground"
            >
              {category?.name}
            </Link>
          </li>
          <ChevronRight className="size-4" aria-hidden="true" />
          <li aria-current="page" className="font-medium text-foreground">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.gallery} alt={product.name} />
        <ProductPurchasePanel product={product} />
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t pt-14">
          <SectionHeading
            eyebrow="You might also like"
            title={`More from ${category?.name}`}
            description="Hand-picked companions to go with your selection."
            align="left"
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
