import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"

import { ScrollItem } from "@/components/motion/scroll-reveal"
import { categories } from "@/lib/products"
import { cn } from "@/lib/utils"

const TILE_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"

export function CategoryTiles() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <ScrollItem
          key={category.slug}
          index={index}
          className={cn(index === 0 && "lg:row-span-2")}
        >
          <Link
            href={`/products?category=${category.slug}`}
            className="group relative block h-full min-h-64 overflow-hidden rounded-3xl border border-border/60 bg-muted/40 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {/* Single optimized Image with smooth hardware-accelerated hover zoom */}
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes={TILE_SIZES}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Default elegant dark gradient scrim for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5 transition-opacity duration-300" />

            {/* Hover subtle brand glow gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content overlay */}
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md transition-colors group-hover:border-white/40 group-hover:bg-white/20">
                  <Sparkles className="size-3 text-amber-300" aria-hidden="true" />
                  Corner 0{index + 1}
                </span>

                <span className="grid size-10 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-primary">
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-white drop-shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                  {category.name}
                </h3>
                <p className="mt-1.5 max-w-xs text-sm text-white/80 line-clamp-2 transition-colors group-hover:text-white/95">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        </ScrollItem>
      ))}
    </div>
  )
}
