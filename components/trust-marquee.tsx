import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider"

const items = [
  "Island-wide delivery",
  "7-day returns",
  "Click & collect in Kegalle",
  "Secure checkout",
  "Cash on delivery",
  "Genuine quality checked in store",
]

export function TrustMarquee() {
  return (
    <div className="border-y bg-card py-4">
      <InfiniteSlider gap={40} speed={55} speedOnHover={20}>
        {items.map((item) => (
          <span
            key={item}
            className="flex items-center gap-3 text-sm font-medium text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            {item}
          </span>
        ))}
      </InfiniteSlider>
    </div>
  )
}
