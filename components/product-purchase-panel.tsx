"use client"

import * as React from "react"
import { CheckCircle2, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react"

import { AddToCartButton } from "@/components/add-to-cart-button"
import { StarRating } from "@/components/star-rating"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/lib/products"
import { formatLKR, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [option, setOption] = React.useState(product.options[0])
  const [quantity, setQuantity] = React.useState(1)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <StarRating rating={product.rating} showValue />
          <span className="text-sm text-muted-foreground">
            ({product.reviews} customer reviews)
          </span>
          {product.badge && (
            <Badge
              variant={product.badge === "Sale" ? "default" : "outline"}
              className={
                product.badge === "Sale"
                  ? "bg-accent text-accent-foreground shadow-xs"
                  : undefined
              }
            >
              {product.badge}
            </Badge>
          )}
        </div>

        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {product.name}
        </h1>

        <div className="mt-4 flex flex-wrap items-baseline gap-3">
          <span className="font-heading text-3xl font-bold text-foreground">
            {formatLKR(product.price)}
          </span>
          {product.compareAtPrice && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                {formatLKR(product.compareAtPrice)}
              </span>
              <Badge variant="destructive" className="font-semibold shadow-xs">
                Save{" "}
                {Math.round(
                  ((product.compareAtPrice - product.price) /
                    product.compareAtPrice) *
                  100
                )}
                %
              </Badge>
            </>
          )}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Inclusive of all taxes · Free island-wide shipping over {formatLKR(site.delivery.freeOver)}
        </p>
      </div>

      <Separator />

      <p className="leading-relaxed text-muted-foreground text-pretty">
        {product.description}
      </p>

      {product.options.length > 0 && (
        <fieldset>
          <legend className="text-sm font-semibold">
            Select {product.category === "pantry" ? "Size" : "Option"}:{" "}
            <span className="font-normal text-muted-foreground">{option}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {product.options.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setOption(item)}
                aria-pressed={option === item}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200",
                  option === item
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Stock & Dispatch Indicator */}
      <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
        </span>
        {product.inStock ? "In stock at Kegalle store · Dispatches in 24 hours" : "Currently out of stock"}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1 rounded-xl border bg-background p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <span
            className="w-8 text-center text-sm font-semibold tabular-nums"
            aria-live="polite"
            aria-label={`Quantity ${quantity}`}
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(10, value + 1))}
            disabled={quantity >= 10}
            aria-label="Increase quantity"
            className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>

        <AddToCartButton
          product={product}
          option={option}
          quantity={quantity}
          size="lg"
          className="flex-1 sm:flex-none sm:min-w-56 shadow-sm shadow-primary/20"
        />
      </div>

      <ul className="grid gap-3 rounded-2xl border border-border/60 bg-muted/40 p-5 text-sm">
        <li className="flex items-start gap-3">
          <Truck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-foreground">Island-wide delivery</strong> — Free over {formatLKR(site.delivery.freeOver)}, otherwise {formatLKR(site.delivery.fee)}.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <RotateCcw className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-foreground">7-day simple returns</strong> on unused items with tags attached.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-foreground">Flexible payment</strong>: Cash on delivery, credit/debit card, or bank transfer.
          </span>
        </li>
      </ul>

      <div>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em]">
          Product Details
        </h2>
        <ul className="mt-3 grid gap-2.5 text-sm text-muted-foreground">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
