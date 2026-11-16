import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Star } from "lucide-react"

import { SlidingCounter } from "@/components/motion/sliding-counter"
import { TextEffect } from "@/components/motion-primitives/text-effect"
import { TextLoop } from "@/components/motion-primitives/text-loop"
import { Tilt } from "@/components/motion-primitives/tilt"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type HeroStat = {
  label: string
  to: number
  suffix?: string
  decimals?: number
  grouping?: boolean
  duration?: number
}

const stats: HeroStat[] = [
  {
    label: "Happy shoppers",
    to: 1200,
    grouping: true,
    suffix: "+",
    duration: 1700,
  },
  { label: "Average rating", to: 4.8, decimals: 1, duration: 1200 },
  { label: "Curated categories", to: 5, duration: 1000 },
]

export function Hero() {
  return (
    <section className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-32 -right-24 size-96 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute top-1/3 -left-32 size-80 rounded-full bg-accent/12 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <div className="animate-fade-up">
            <Badge
              variant="outline"
              className="gap-1.5 rounded-full bg-background/80 py-1.5 pr-3 backdrop-blur"
            >
              <MapPin className="size-3.5 text-primary" aria-hidden="true" />
              Kandy Road, Kegalle
            </Badge>
          </div>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <span className="sr-only">Everyday essentials, curated with care.</span>
            <span aria-hidden="true">
              <TextEffect
                as="span"
                per="word"
                preset="fade-in-blur"
                delay={0.05}
                speedReveal={1.1}
              >
                Everyday essentials,
              </TextEffect>{" "}
              <TextEffect
                as="span"
                per="word"
                preset="fade-in-blur"
                delay={0.35}
                speedReveal={1.1}
                className="text-primary"
              >
                curated with
              </TextEffect>{" "}
              <span className="relative inline-block pr-[0.08em] align-baseline">
                <span className="invisible" aria-hidden="true">
                  intent.
                </span>
                <TextLoop
                  className="absolute inset-y-0 left-0 overflow-y-clip text-primary [perspective:600px]"
                  interval={2.4}
                  transition={{
                    type: "spring",
                    stiffness: 900,
                    damping: 80,
                    mass: 10,
                  }}
                  variants={{
                    initial: {
                      y: 24,
                      rotateX: 90,
                      opacity: 0,
                      filter: "blur(4px)",
                    },
                    animate: {
                      y: 0,
                      rotateX: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                    },
                    exit: {
                      y: -24,
                      rotateX: -90,
                      opacity: 0,
                      filter: "blur(4px)",
                    },
                  }}
                >
                  <span>care.</span>
                  <span>intent.</span>
                  <span>detail.</span>
                  <span>heart.</span>
                  <span>pride.</span>
                </TextLoop>
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty animate-fade-up animate-fade-up-delay-1">
            Toys & collectibles, fashion bags, beauty & hair accessories,
            artistic home decor and fine ceramics — chosen in small batches,
            priced for everyday life, and packed by the same team you meet at the counter.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up animate-fade-up-delay-1">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/products" />}
            >
              Shop the collection
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              Visit the store
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t pt-8 animate-fade-up animate-fade-up-delay-2">
            {stats.map((stat, index) => {
              const finalValue = stat.to.toLocaleString("en-US", {
                minimumFractionDigits: stat.decimals ?? 0,
                maximumFractionDigits: stat.decimals ?? 0,
                useGrouping: stat.grouping ?? false,
              })

              return (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-2xl font-bold sm:text-3xl">
                    <span className="sr-only">{finalValue}{stat.suffix}</span>
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center tabular-nums"
                    >
                      <SlidingCounter
                        to={stat.to}
                        duration={stat.duration}
                        delay={250 + index * 120}
                        decimals={stat.decimals}
                        grouping={stat.grouping}
                      />
                      {stat.suffix}
                    </span>
                  </dd>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </dl>
        </div>

        <div className="relative animate-fade-up animate-fade-up-delay-2">
          <Tilt
            rotationFactor={6}
            springOptions={{ stiffness: 110, damping: 16 }}
            className="relative mx-auto aspect-4/5 w-full max-w-lg"
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl border border-border/60 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2400&q=90"
                alt="Inside Store No. 8 curated boutique retail store on Kandy Road, Kegalle"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -left-6 hidden size-40 overflow-hidden rounded-2xl border-4 border-background shadow-lg sm:block">
              <Image
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80"
                alt="Inside Store No. 8 curated art statues and boutique goods"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>

            <div className="absolute -top-5 -right-2 flex items-center gap-2.5 rounded-2xl border bg-background px-4 py-3 shadow-lg">
              <span className="grid size-9 place-items-center rounded-xl bg-accent/15 text-accent">
                <Star className="size-4 fill-current" aria-hidden="true" />
              </span>
              <span className="text-sm">
                <span className="block font-heading font-bold leading-tight">
                  4.8 average rating
                </span>
                <span className="text-xs text-muted-foreground">
                  from 1,200+ reviews
                </span>
              </span>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  )
}
