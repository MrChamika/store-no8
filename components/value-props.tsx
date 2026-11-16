import { PackageCheck, RotateCcw, ShieldCheck, Store } from "lucide-react"

import { ScrollItem } from "@/components/motion/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"

const valueProps = [
  {
    icon: PackageCheck,
    title: "Free delivery over LKR 5,000",
    description:
      "Island-wide delivery in 2-4 working days. Below that, a flat LKR 450 applies.",
  },
  {
    icon: RotateCcw,
    title: "7-day easy returns",
    description:
      "Changed your mind? Bring the item back within a week for a full refund.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    description:
      "Pay by card, cash on delivery or bank transfer. Your details stay private.",
  },
  {
    icon: Store,
    title: "Click & collect in Kegalle",
    description:
      "Order online and pick it up at the store on Kandy Road within two hours.",
  },
]

export function ValueProps() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {valueProps.map((item, index) => (
        <ScrollItem key={item.title} index={index} className="h-full">
          <Card className="hover-lift h-full">
            <CardContent>
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </ScrollItem>
      ))}
    </div>
  )
}
