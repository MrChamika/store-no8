import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Leaf, PackageCheck, Users } from "lucide-react"

import { ParallaxImage } from "@/components/motion/parallax"
import { ScrollItem, ScrollReveal } from "@/components/motion/scroll-reveal"
import { ScrollWords } from "@/components/motion/scroll-words"
import { SectionHeading } from "@/components/section-heading"
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Our Story — Neighbourhood Retail Since 2016",
  description:
    "How Store No. 8 grew from a single counter on Kandy Road into a neighbourhood store the people of Kegalle trust. Hand-picked goods, fair prices, and personal service.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `Our Story | ${site.name}`,
    description:
      "How Store No. 8 grew from a single counter on Kandy Road into a neighbourhood store the people of Kegalle trust.",
    url: `${site.url}/about`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Inside Store No. 8 Kegalle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Story | ${site.name}`,
    description:
      "How Store No. 8 grew from a single counter on Kandy Road into a neighbourhood store the people of Kegalle trust.",
  },
}

const pillars = [
  {
    icon: PackageCheck,
    title: "Curated, not stocked",
    description:
      "We carry fewer things on purpose, and we test every new line before it reaches the shelf.",
  },
  {
    icon: Users,
    title: "People first",
    description:
      "Most of our team is from Kegalle. We know the regulars by name and remember their sizes.",
  },
  {
    icon: Leaf,
    title: "Lighter footprint",
    description:
      "Paper bags, recycled packaging and consolidated island-wide deliveries to cut waste.",
  },
]

const timeline = [
  {
    year: "2016",
    title: "One counter on Kandy Road",
    description:
      "The shop opens with a hundred products and one rule: only sell what you would use at home.",
  },
  {
    year: "2019",
    title: "Gifts, toys & home accents",
    description:
      "Customer love for memorable gifts pushes us into toys, artistic statues, ceramics and curated fashion accessories.",
  },
  {
    year: "2022",
    title: "Island-wide delivery",
    description:
      "We start packing orders across Sri Lanka after regulars ask us to post items to relatives.",
  },
  {
    year: "Today",
    title: "Sixteen products restocked weekly",
    description:
      "Same counter, same team, and a bigger range — still picked, packed and posted by us.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Our story
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          <KineticTextReveal
            text="A neighbourhood store built one customer at a time."
            splitBy="words"
            direction="up"
            distance={26}
            stagger={0.045}
            delay={0.15}
          />
        </h1>
        <ScrollWords
          className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty"
          text="Store No. 8 opened in 2016 with a narrow idea: carry a small range of good things, priced fairly, and treat every person who walks in like a regular — because within a week, they are."
        />
      </header>

      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ScrollItem index={0} className="sm:col-span-2 lg:col-span-1">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80"
            alt="Shoppers exploring curated boutique items on the Store No. 8 shop floor"
            priority
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="aspect-4/3 rounded-3xl border"
            distance={4}
          />
        </ScrollItem>
        <ScrollItem index={1}>
          <ParallaxImage
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
            alt="Curated gifts, toys and home accents on display in Store No. 8"
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="aspect-4/3 rounded-3xl border"
            distance={6}
          />
        </ScrollItem>
        <ScrollItem index={2}>
          <ParallaxImage
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80"
            alt="Handcrafted ceramics, decor and lifestyle goods on shelves"
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="aspect-4/3 rounded-3xl border"
            distance={5}
          />
        </ScrollItem>
      </section>

      <section className="mt-20">
        <ScrollReveal blur>
          <SectionHeading
            eyebrow="What we stand for"
            title="Three rules we have not broken"
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <ScrollItem key={pillar.title} index={index} className="h-full">
              <Card className="hover-lift h-full">
                <CardContent>
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <pillar.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollItem>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <ScrollReveal blur>
          <SectionHeading
            eyebrow="How we got here"
            title="From one counter to a store the town recommends"
            align="left"
          />
        </ScrollReveal>
        <ol className="mt-10 grid gap-6 border-l pl-6 sm:grid-cols-2">
          {timeline.map((entry, index) => (
            <li key={entry.year} className="relative">
              <ScrollItem index={index} y={18}>
                <span
                  className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background bg-primary"
                  aria-hidden="true"
                />
                <p className="font-heading text-sm font-bold tracking-[0.14em] text-primary">
                  {entry.year}
                </p>
                <h3 className="mt-1 font-heading text-lg font-semibold">
                  {entry.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </ScrollItem>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 overflow-hidden rounded-3xl bg-primary text-primary-foreground">
        <div className="grid gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              Come say hello — the kettle is always on.
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-primary-foreground/85">
              We are at {site.address.line1}, {site.address.city}. Open{" "}
              {site.hours[0].days.toLowerCase()} from {site.hours[0].time}.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="secondary"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                Plan your visit
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                nativeButton={false}
                render={<Link href="/products" />}
              >
                Shop the collection
              </Button>
            </div>
          </ScrollReveal>
          <ParallaxImage
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
            alt="The Store No. 8 shop floor"
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="aspect-4/3 rounded-2xl"
            distance={4}
          />
        </div>
      </section>
    </div>
  )
}
