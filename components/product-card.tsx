import Image from "next/image"
import Link from "next/link"

import { AddToCartButton } from "@/components/add-to-cart-button"
import { Tilt } from "@/components/motion-primitives/tilt"
import { StarRating } from "@/components/star-rating"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCategory, type Product } from "@/lib/products"
import { formatLKR } from "@/lib/site"

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product
  priority?: boolean
}) {
  const category = getCategory(product.category)
  const discountPercent = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : null

  return (
    <Tilt
      rotationFactor={6}
      isRevese
      springOptions={{ stiffness: 150, damping: 20 }}
      className="h-full"
    >
      <Card className="group/card flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-border/70 pt-0 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 [--card-spacing:0px]">
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-square w-full overflow-hidden bg-muted sm:aspect-[4/5]"
          aria-label={product.name}
        >
          <Image
            src={product.image}
            alt={`${product.name} — Store No. 8 ${category?.name ?? ""}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

          {product.badge && (
            <Badge
              variant={product.badge === "Sale" ? "default" : "outline"}
              className={
                product.badge === "Sale"
                  ? "absolute left-2.5 top-2.5 bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs"
                  : "absolute left-2.5 top-2.5 border-white/20 bg-background/90 px-2 py-0.5 text-[10px] font-medium text-foreground shadow-sm backdrop-blur-md sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs"
              }
            >
              {product.badge}
            </Badge>
          )}

          {discountPercent && !product.badge && (
            <Badge
              variant="default"
              className="absolute left-2.5 top-2.5 bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground shadow-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs"
            >
              Save {discountPercent}%
            </Badge>
          )}
        </Link>

        <CardHeader className="gap-1 px-3 pt-3 pb-1 sm:gap-1.5 sm:px-4 sm:pt-3.5 sm:pb-1.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.14em]">
            {category?.name}
          </p>
          <CardTitle>
            <Link
              href={`/products/${product.slug}`}
              className="line-clamp-1 text-sm font-semibold transition-colors hover:text-primary sm:text-base"
            >
              {product.name}
            </Link>
          </CardTitle>
          <StarRating
            rating={product.rating}
            reviews={product.reviews}
            className="mt-0.5 gap-1.5 text-xs text-muted-foreground sm:text-sm [&_svg]:size-3 sm:[&_svg]:size-3.5"
          />
        </CardHeader>

        <CardContent className="px-3 py-1 sm:px-4 sm:py-1.5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-heading text-base font-bold text-foreground sm:text-lg">
              {formatLKR(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-[11px] text-muted-foreground line-through sm:text-xs">
                  {formatLKR(product.compareAtPrice)}
                </span>
                {discountPercent && (
                  <span className="rounded-md bg-accent/15 px-1 py-0.2 text-[9px] font-semibold text-accent sm:px-1.5 sm:py-0.5 sm:text-[10px]">
                    -{discountPercent}%
                  </span>
                )}
              </>
            )}
          </div>
        </CardContent>

        <CardFooter className="mt-auto border-0 bg-transparent px-3 pt-1 pb-3 sm:px-4 sm:pt-1.5 sm:pb-3.5">
          <AddToCartButton
            product={product}
            variant="outline"
            size="sm"
            className="h-8 w-full text-xs font-medium transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary sm:h-9 sm:text-sm"
          />
        </CardFooter>
      </Card>
    </Tilt>
  )
}
