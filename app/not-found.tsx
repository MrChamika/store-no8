import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="font-heading text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight">
        That shelf is empty
      </h1>
      <p className="mt-3 text-muted-foreground text-pretty">
        The page you were looking for has been moved, sold out, or never
        existed. Let us point you somewhere useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Back to home
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href="/products" />}
        >
          Browse products
        </Button>
      </div>
    </div>
  )
}
