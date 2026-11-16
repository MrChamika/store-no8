import { Quote } from "lucide-react"

import { ScrollItem } from "@/components/motion/scroll-reveal"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"

const testimonials = [
  {
    name: "Nadeesha Perera",
    role: "Kegalle",
    rating: 5,
    quote:
      "I came in for a gift and left with half the shop. The staff actually remembered my size three months later, which is rare.",
  },
  {
    name: "Ruwan Jayasuriya",
    role: "Mawanella",
    rating: 4.5,
    quote:
      "Delivery to my door in two days and the tea was packed properly. The packaging alone made it feel worth the price.",
  },
  {
    name: "Shalini Fernando",
    role: "Hemmatha",
    rating: 5,
    quote:
      "Found a linen shirt here that I have not been able to find anywhere else in the district. Worth the trip from Colombo.",
  },
]

export function Testimonials() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <ScrollItem key={testimonial.name} index={index} className="h-full">
          <Card className="hover-lift h-full">
            <CardContent>
              <Quote className="size-7 text-primary/40" aria-hidden="true" />
              <p className="mt-4 leading-relaxed text-pretty">
                “{testimonial.quote}”
              </p>
            </CardContent>
            <CardFooter className="mt-auto justify-between border-t">
              <div>
                <p className="font-heading text-sm font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
              <StarRating rating={testimonial.rating} />
            </CardFooter>
          </Card>
        </ScrollItem>
      ))}
    </div>
  )
}
