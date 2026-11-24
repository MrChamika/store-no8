"use client"

import * as React from "react"
import { Check, Copy, ExternalLink, MapPin, PackageCheck, Truck } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatLKR, site } from "@/lib/site"
import {
  generateWhatsAppOrderUrl,
  type OrderItem,
} from "@/lib/whatsapp-order"

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.2-.351.226-.652.075-.3-.151-1.267-.467-2.414-1.489-.893-.796-1.496-1.78-1.672-2.08-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.175.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.151-.677-1.632-.927-2.233-.244-.585-.492-.506-.677-.515-.175-.008-.376-.01-.576-.01s-.527.075-.803.376c-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.176-1.43-.076-.125-.276-.201-.577-.351zM12.04 2c-5.522 0-10 4.478-10 10 0 1.768.46 3.427 1.261 4.871l-1.341 4.9 5.02-1.317c1.402.766 2.997 1.206 4.697 1.206 5.522 0 10-4.478 10-10s-4.478-10-10-10zm0 18.28c-1.554 0-3.011-.424-4.269-1.163l-.306-.182-3.17.832.846-3.088-.2-.318c-.808-1.288-1.261-2.803-1.261-4.421 0-4.609 3.751-8.36 8.36-8.36 4.609 0 8.36 3.751 8.36 8.36 0 4.609-3.751 8.36-8.36 8.36z" />
    </svg>
  )
}

interface WhatsAppCheckoutModalProps {
  items: OrderItem[]
  subtotal: number
  delivery: number
  total?: number
  defaultGiftWrapping?: boolean
  defaultGiftMessage?: string
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function WhatsAppCheckoutModal({
  items,
  subtotal,
  delivery,
  total: passedTotal,
  defaultGiftWrapping = false,
  defaultGiftMessage = "",
  trigger,
  open: controlledOpen,
  onOpenChange,
}: WhatsAppCheckoutModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen

  const [customerName, setCustomerName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [city, setCity] = React.useState("")
  const [paymentMethod, setPaymentMethod] = React.useState("Cash on Delivery (COD)")
  const [notes, setNotes] = React.useState("")
  const [giftWrapping, setGiftWrapping] = React.useState(defaultGiftWrapping)
  const [giftMessage, setGiftMessage] = React.useState(defaultGiftMessage)
  const [copied, setCopied] = React.useState(false)

  // Keep in sync if defaultGiftWrapping/defaultGiftMessage changes from parent
  React.useEffect(() => {
    setGiftWrapping(defaultGiftWrapping)
  }, [defaultGiftWrapping])

  React.useEffect(() => {
    if (defaultGiftMessage) setGiftMessage(defaultGiftMessage)
  }, [defaultGiftMessage])

  const giftFee = giftWrapping ? site.giftWrapping.fee : 0
  const computedTotal = subtotal + delivery + giftFee

  // Load saved details from localStorage
  React.useEffect(() => {
    try {
      const savedName = localStorage.getItem("store_no8_name")
      const savedPhone = localStorage.getItem("store_no8_phone")
      const savedAddr = localStorage.getItem("store_no8_address")
      const savedCity = localStorage.getItem("store_no8_city")
      if (savedName) setCustomerName(savedName)
      if (savedPhone) setPhone(savedPhone)
      if (savedAddr) setAddress(savedAddr)
      if (savedCity) setCity(savedCity)
    } catch {
      // LocalStorage unavailable
    }
  }, [])

  const handleSavePreferences = () => {
    try {
      if (customerName) localStorage.setItem("store_no8_name", customerName)
      if (phone) localStorage.setItem("store_no8_phone", phone)
      if (address) localStorage.setItem("store_no8_address", address)
      if (city) localStorage.setItem("store_no8_city", city)
    } catch {
      // Ignore storage errors
    }
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    handleSavePreferences()

    const url = generateWhatsAppOrderUrl({
      items,
      subtotal,
      delivery,
      giftWrapping,
      giftWrappingFee: giftFee,
      giftMessage: giftWrapping ? giftMessage : undefined,
      total: computedTotal,
      customerName,
      phone,
      address,
      city,
      paymentMethod,
      notes,
    })

    window.open(url, "_blank")
    toast.success("Opening WhatsApp with your order details!", {
      description: "Send the prepared message to confirm your order with Store No. 8.",
    })
    setIsOpen(false)
  }

  const handleInstantQuickSend = () => {
    const url = generateWhatsAppOrderUrl({
      items,
      subtotal,
      delivery,
      giftWrapping,
      giftWrappingFee: giftFee,
      giftMessage: giftWrapping ? giftMessage : undefined,
      total: computedTotal,
    })
    window.open(url, "_blank")
    toast.info("Opening WhatsApp with cart items!", {
      description: "You can provide your delivery address directly in the chat.",
    })
    setIsOpen(false)
  }

  const handleCopyOrder = () => {
    const url = generateWhatsAppOrderUrl({
      items,
      subtotal,
      delivery,
      giftWrapping,
      giftWrappingFee: giftFee,
      giftMessage: giftWrapping ? giftMessage : undefined,
      total: computedTotal,
      customerName,
      phone,
      address,
      city,
      paymentMethod,
      notes,
    })
    const decodedMessage = decodeURIComponent(url.split("text=")[1] || "")
    navigator.clipboard.writeText(decodedMessage)
    setCopied(true)
    toast.success("Order summary copied to clipboard!")
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-7">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <WhatsAppIcon className="size-4" />
            1-Click WhatsApp Checkout
          </div>
          <DialogTitle className="mt-1 text-2xl font-bold font-heading">
            Complete Your Order
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Enter your delivery details below. We will compile your order into a formatted WhatsApp message sent directly to Store No. 8 ({site.phone}).
          </DialogDescription>
        </DialogHeader>

        {/* Order Items Preview */}
        <div className="mt-4 rounded-xl border bg-muted/30 p-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Items ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
            <span className="text-foreground font-bold">Total: {formatLKR(computedTotal)}</span>
          </div>
          <ul className="mt-2.5 max-h-36 overflow-y-auto divide-y divide-border/60 text-sm">
            {items.map((item) => (
              <li key={item.id + (item.option ?? "")} className="py-1.5 flex items-center justify-between gap-2">
                <span className="truncate text-foreground">
                  <span className="font-semibold text-primary">{item.quantity}×</span> {item.name}
                  {item.option && <span className="text-xs text-muted-foreground ml-1.5">({item.option})</span>}
                </span>
                <span className="shrink-0 font-medium">{formatLKR(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex items-center justify-between border-t pt-2 text-xs text-muted-foreground">
            <span>Island-wide delivery</span>
            <span className="font-medium text-foreground">
              {delivery === 0 ? "FREE" : formatLKR(delivery)}
            </span>
          </div>
          {giftWrapping && (
            <div className="mt-1 flex items-center justify-between text-xs text-pink-600 dark:text-pink-400">
              <span className="flex items-center gap-1">🎁 Boutique gift wrapping</span>
              <span className="font-medium">+{formatLKR(giftFee)}</span>
            </div>
          )}
        </div>

        {/* Gift Wrapping Toggle Card */}
        <div className="mt-4 rounded-xl border border-pink-200/90 bg-gradient-to-r from-pink-50/70 via-rose-50/40 to-amber-50/50 dark:border-pink-900/50 dark:from-pink-950/25 dark:via-rose-950/20 dark:to-background p-3.5 transition-all">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={giftWrapping}
              onChange={(e) => setGiftWrapping(e.target.checked)}
              className="mt-0.5 size-4 rounded border-pink-300 text-pink-600 focus:ring-pink-500 accent-pink-600 cursor-pointer"
            />
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between font-semibold text-foreground">
                <span className="flex items-center gap-1.5 text-pink-700 dark:text-pink-300">
                  🎁 Add gift wrapping for {formatLKR(site.giftWrapping.fee)}
                </span>
                <span className="rounded-full bg-pink-100 dark:bg-pink-900/60 px-2 py-0.5 text-[11px] font-bold text-pink-700 dark:text-pink-300">
                  +{formatLKR(site.giftWrapping.fee)}
                </span>
              </div>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                {site.giftWrapping.description}
              </p>
            </div>
          </label>

          {giftWrapping && (
            <div className="mt-3 pt-3 border-t border-pink-200/80 dark:border-pink-900/50 space-y-1.5 animate-in fade-in-50 duration-200">
              <Label htmlFor="checkout-gift-message" className="text-xs font-semibold text-pink-800 dark:text-pink-200">
                💌 Handwritten Gift Card Note (Optional)
              </Label>
              <Input
                id="checkout-gift-message"
                placeholder="e.g. Wishing you a happy birthday, Sanduni! Best wishes from Kasun."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="text-xs bg-background/90 border-pink-200 dark:border-pink-900"
              />
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="checkout-name" className="text-xs font-semibold">
                Your Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="checkout-name"
                required
                placeholder="e.g. Kasun Perera"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="checkout-phone" className="text-xs font-semibold">
                Phone Number (for courier) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="checkout-phone"
                required
                type="tel"
                placeholder="07X XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="checkout-address" className="text-xs font-semibold">
              Delivery Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="checkout-address"
              required
              placeholder="House / Street / Road"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="checkout-city" className="text-xs font-semibold">
              Town / City & District <span className="text-destructive">*</span>
            </Label>
            <Input
              id="checkout-city"
              required
              placeholder="e.g. Kegalle, Colombo, Kandy, Gampaha"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Payment Method Radio Options */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Payment Preference</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: "Cash on Delivery (COD)", label: "Cash on Delivery", icon: Truck },
                { id: "Bank Transfer / Deposit", label: "Bank Transfer", icon: PackageCheck },
                { id: "Pickup at Kegalle Store", label: "Store Pickup", icon: MapPin },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => setPaymentMethod(id)}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs font-medium transition-all text-left ${
                    paymentMethod === id
                      ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500"
                      : "border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="checkout-notes" className="text-xs font-semibold">
              Special Instructions (Optional)
            </Label>
            <Textarea
              id="checkout-notes"
              rows={2}
              placeholder="Any landmark, packaging request, or preferred delivery time..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex flex-col gap-2.5">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold shadow-md shadow-emerald-500/20 text-base h-12"
            >
              <WhatsAppIcon className="size-5 shrink-0" />
              <span>Send Order on WhatsApp</span>
              <ExternalLink className="size-4 opacity-80" />
            </Button>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <button
                type="button"
                onClick={handleInstantQuickSend}
                className="hover:text-foreground underline underline-offset-4"
              >
                Skip form & chat directly on WhatsApp →
              </button>
              <button
                type="button"
                onClick={handleCopyOrder}
                className="flex items-center gap-1 hover:text-foreground"
              >
                {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                <span>{copied ? "Copied" : "Copy details"}</span>
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
