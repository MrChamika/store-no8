"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Gift, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react"
import { toast } from "sonner"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { WhatsAppCheckoutModal, WhatsAppIcon } from "@/components/whatsapp-checkout-modal"
import { formatLKR, site } from "@/lib/site"

export default function CartPage() {
  const { items, itemCount, subtotal, hydrated, removeItem, setQuantity } =
    useCart()

  const [giftWrapping, setGiftWrapping] = React.useState(false)
  const [giftMessage, setGiftMessage] = React.useState("")

  const delivery = subtotal >= site.delivery.freeOver ? 0 : site.delivery.fee
  const giftFee = giftWrapping ? site.giftWrapping.fee : 0
  const total = subtotal + delivery + giftFee

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="mt-8 h-64 animate-pulse rounded-2xl bg-muted" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
          <ShoppingBag className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight">
          Your cart is empty
        </h1>
        <p className="mt-3 text-muted-foreground text-pretty">
          Nothing in here yet. Have a look through the shelves — everything we
          stock is something we would use ourselves.
        </p>
        <Button
          size="lg"
          className="mt-8"
          nativeButton={false}
          render={<Link href="/products" />}
        >
          Browse the collection
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Cart
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Your basket
        </h1>
        <p className="mt-3 text-muted-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"} ready to pack.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.id}>
              <Card>
                <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-heading font-semibold transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    {item.option && (
                      <p className="text-sm text-muted-foreground">
                        Option: {item.option}
                      </p>
                    )}
                    <p className="mt-1 font-medium">
                      {formatLKR(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center gap-1 rounded-lg border p-1">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(item.id, item.quantity - 1)
                        }
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Minus className="size-4" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${item.name}`}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        removeItem(item.id)
                        toast.info(`${item.name} removed`)
                      }}
                      aria-label={`Remove ${item.name} from cart`}
                      className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <Card className="h-fit lg:sticky lg:top-28">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <dl className="flex flex-col gap-2.5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatLKR(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-medium">
                  {delivery === 0 ? "Free" : formatLKR(delivery)}
                </dd>
              </div>
              {giftWrapping && (
                <div className="flex items-center justify-between text-pink-600 dark:text-pink-400">
                  <dt className="flex items-center gap-1">🎁 Gift wrapping</dt>
                  <dd className="font-medium">+{formatLKR(giftFee)}</dd>
                </div>
              )}
            </dl>

            {/* Gift Wrapping Option Box */}
            <div className="rounded-xl border border-pink-200/90 bg-gradient-to-r from-pink-50/70 via-rose-50/40 to-amber-50/40 dark:border-pink-900/50 dark:from-pink-950/25 dark:via-rose-950/20 dark:to-background p-3 transition-all">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                  className="mt-0.5 size-4 rounded border-pink-300 text-pink-600 focus:ring-pink-500 accent-pink-600 cursor-pointer"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-foreground">
                    <span className="flex items-center gap-1 text-pink-700 dark:text-pink-300">
                      <Gift className="size-3.5" aria-hidden="true" />
                      Add gift wrapping
                    </span>
                    <span className="text-pink-700 dark:text-pink-300 font-bold">
                      +{formatLKR(site.giftWrapping.fee)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-muted-foreground text-[11px] leading-tight">
                    {site.giftWrapping.description}
                  </p>
                </div>
              </label>

              {giftWrapping && (
                <div className="mt-2.5 pt-2 border-t border-pink-200/80 dark:border-pink-900/40">
                  <Input
                    placeholder="Gift card note (e.g. Happy Birthday!)"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="text-xs h-8 bg-background/90 border-pink-200 dark:border-pink-900"
                  />
                </div>
              )}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-heading font-semibold">Total</span>
              <span className="font-heading text-xl font-bold">
                {formatLKR(total)}
              </span>
            </div>

            {delivery > 0 && (
              <p className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                Spend {formatLKR(site.delivery.freeOver - subtotal)} more for
                free island-wide delivery.
              </p>
            )}

            <WhatsAppCheckoutModal
              items={items.map((i) => ({
                id: i.id,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
                option: i.option,
                slug: i.slug,
              }))}
              subtotal={subtotal}
              delivery={delivery}
              total={total}
              defaultGiftWrapping={giftWrapping}
              defaultGiftMessage={giftMessage}
              trigger={
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold shadow-md shadow-emerald-500/20 text-base h-12 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <WhatsAppIcon className="size-5 shrink-0" />
                  <span>Proceed to WhatsApp Checkout</span>
                </Button>
              }
            />

            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Truck className="size-3.5" aria-hidden="true" />
              {site.delivery.note}
            </p>

            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<Link href="/products" />}
            >
              Continue shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
