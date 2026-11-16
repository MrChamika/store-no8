import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type StarRatingProps = {
  rating: number
  reviews?: number
  className?: string
  showValue?: boolean
}

export function StarRating({
  rating,
  reviews,
  className,
  showValue = false,
}: StarRatingProps) {
  const percentage = Math.max(0, Math.min(100, (rating / 5) * 100))

  return (
    <div
      className={cn("flex items-center gap-2 text-sm", className)}
      role="img"
      aria-label={`Rated ${rating} out of 5${
        reviews !== undefined ? ` from ${reviews} reviews` : ""
      }`}
    >
      <span className="relative inline-flex">
        <span className="flex gap-0.5 text-muted-foreground/40">
          {[0, 1, 2, 3, 4].map((index) => (
            <Star key={index} className="size-4 fill-current" aria-hidden="true" />
          ))}
        </span>
        <span
          className="pointer-events-none absolute inset-0 flex gap-0.5 overflow-hidden text-amber-500"
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <Star key={index} className="size-4 shrink-0 fill-current" />
          ))}
        </span>
      </span>
      {showValue && (
        <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
      )}
      {reviews !== undefined && (
        <span className="text-muted-foreground">({reviews})</span>
      )}
    </div>
  )
}
