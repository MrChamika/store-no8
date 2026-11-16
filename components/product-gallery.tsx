"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function ProductGallery({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [active, setActive] = React.useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border bg-muted">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover transition-opacity duration-200"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-current={index === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl border-2 transition-colors",
                index === active
                  ? "border-primary"
                  : "border-transparent hover:border-border"
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
