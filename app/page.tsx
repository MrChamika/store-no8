import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"

import { CategoryTiles } from "@/components/category-tiles"
import { Hero } from "@/components/hero"
import { AnimatedStat } from "@/components/motion/animated-stat"
import { ScrollItem, ScrollReveal } from "@/components/motion/scroll-reveal"
import { ScrollWords } from "@/components/motion/scroll-words"
import { GlowEffect } from "@/components/motion-primitives/glow-effect"
import { Spotlight } from "@/components/motion-primitives/spotlight"
import { Newsletter } from "@/components/newsletter"
import { ProductCard } from "@/components/product-card"
import { SectionHeading } from "@/components/section-heading"
import { Testimonials } from "@/components/testimonials"
import { TrustMarquee } from "@/components/trust-marquee"
import { ValueProps } from "@/components/value-props"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts } from "@/lib/products"

type Stat = {
  to: number
  label: string
  suffix?: string
  /** Thousands separators, e.g. 1,200. Years stay ungrouped. */
  group?: boolean
}

const stats: Stat[] = [
  { to: 2016, label: "Store opened on Kandy Road" },
  { to: 1200, suffix: "+", group: true, label: "Regular customers" },
  { to: 24, suffix: " hrs", label: "Typical dispatch time" },
  { to: 16, label: "Products restocked weekly" },
]

/** The finished value, used for screen readers and no-JS rendering. */
function statValue(stat: Stat) {
  const number = stat.group ? stat.to.toLocaleString("en-US") : String(stat.to)
  return `${number}${stat.suffix ?? ""}`
}

export default function HomePage() {
  const featured = getFeaturedProducts(8)

  return (
    <>
      <Hero />
      <TrustMarquee />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal blur>
          <SectionHeading
            eyebrow="Shop by category"
            title="Five corners of the store, all under one roof"
            description="From electric ride-on cars and plush toys to designer bags, artistic home sculptures and emoji mugs, explore our curated collections under one roof."
          />
        </ScrollReveal>
        <div className="mt-10">
          <CategoryTiles />
        </div>
      </section>

      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <ScrollReveal blur>
            <SectionHeading
              eyebrow="Featured this week"
              title="Fresh on the shelves"
              description="Restocked every week and priced the way we would want it priced."
            />
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {featured.map((product, index) => (
              <ScrollItem key={product.id} index={index} className="h-full">
                <ProductCard product={product} priority={index < 4} />
              </ScrollItem>
            ))}
          </div>
          <ScrollReveal className="mt-10 flex justify-center" delay={0.1}>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/products" />}
            >
              Browse all products
              <ArrowRight aria-hidden="true" />
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal blur>
          <SectionHeading
            eyebrow="Why shop with us"
            title="The small things that make a difference"
          />
        </ScrollReveal>
        <div className="mt-10">
          <ValueProps />
        </div>
      </section>

      <section className="relative mx-4 overflow-hidden rounded-3xl bg-primary text-primary-foreground sm:mx-6 lg:mx-8">
        <Spotlight
          size={420}
          className="from-white/40 via-white/15 to-transparent mix-blend-soft-light"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <ScrollReveal y={16}>
              <Quote className="size-8 text-primary-foreground/40" aria-hidden="true" />
            </ScrollReveal>
            <ScrollWords
              as="h2"
              dim={0.32}
              text="A store built around the people who walk through the door."
              className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl"
            />
            <ScrollReveal delay={0.1}>
              <p className="mt-4 max-w-xl leading-relaxed text-primary-foreground/85 text-pretty">
                Store No. 8 started as a single counter on Kandy Road. Today we
                still pick, pack and post every order ourselves - which means the
                person who chose your item is the same person who wraps it.
              </p>
              <div className="relative mt-8 inline-block">
                <GlowEffect
                  colors={["#7dd3fc", "#4f8cff", "#0377E6", "#1d4ed8"]}
                  mode="rotate"
                  blur="stronger"
                  duration={7}
                  scale={0.92}
                  className="opacity-80"
                />
                <Button
                  size="lg"
                  variant="secondary"
                  className="relative z-10"
                  nativeButton={false}
                  render={<Link href="/about" />}
                >
                  Read our story
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
          <dl className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <ScrollItem
                key={stat.label}
                index={index}
                y={20}
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5"
              >
                <dt className="font-heading text-2xl font-bold tabular-nums sm:text-3xl">
                  <span aria-hidden="true">
                    <AnimatedStat
                      to={stat.to}
                      suffix={stat.suffix}
                      group={stat.group}
                      delay={index * 0.12}
                    />
                  </span>
                  <span className="sr-only">{statValue(stat)}</span>
                </dt>
                <dd className="mt-1 text-sm text-primary-foreground/75">
                  {stat.label}
                </dd>
              </ScrollItem>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal blur>
          <SectionHeading
            eyebrow="Customer stories"
            title="What people say after they leave"
          />
        </ScrollReveal>
        <div className="mt-10">
          <Testimonials />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <ScrollReveal blur>
          <div className="rounded-3xl border bg-card px-6 py-12 text-center sm:px-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              Be first to know about new arrivals
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-pretty">
              One short email a week with new stock, restocks and the occasional
              bundle offer. No spam, unsubscribe any time.
            </p>
            <div className="mt-8">
              <Newsletter />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
