"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"

import { ScrollItem } from "@/components/motion/scroll-reveal"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"

type Sort = "featured" | "price-asc" | "price-desc" | "rating" | "name"

const sortLabels: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "Name A–Z" },
]

export function ProductBrowser({ products }: { products: Product[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const category = searchParams.get("category") ?? "all"
  const [sort, setSort] = React.useState<Sort>("featured")
  const [query, setQuery] = React.useState("")

  function setCategory(next: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (next === "all") {
      params.delete("category")
    } else {
      params.set("category", next)
    }
    const queryString = params.toString()
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    })
  }

  const visible = React.useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category
      const matchesQuery =
        query.trim() === "" ||
        product.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesCategory && matchesQuery
    })

    const sorted = [...filtered]
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }
    return sorted
  }, [products, category, sort, query])

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setCategory(item.slug)}
              aria-pressed={category === item.slug}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === item.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="product-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="h-9 w-full pl-9 pr-8 sm:w-56"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-2 grid size-5 -translate-y-1/2 place-items-center rounded text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <Select
            value={sort}
            onValueChange={(value) => setSort((value as Sort) ?? "featured")}
          >
            <SelectTrigger className="h-9 w-full sm:w-52" aria-label="Sort products">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortLabels.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "product" : "products"}
        {category !== "all" && (
          <>
            {" "}
            in{" "}
            <span className="font-medium text-foreground">
              {categories.find((item) => item.slug === category)?.name}
            </span>
          </>
        )}
      </p>

      {visible.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {visible.map((product, index) => (
            <ScrollItem key={product.id} index={index} className="h-full">
              <ProductCard product={product} priority={index < 4} />
            </ScrollItem>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed p-12 text-center">
          <p className="font-heading text-lg font-semibold">
            Nothing matches that search
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different category, or clear the search to see everything.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setCategory("all")
            }}
            className="mt-5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  )
}

