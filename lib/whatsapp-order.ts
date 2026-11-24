import { site } from "@/lib/site"

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  option?: string
  slug?: string
}

export interface WhatsAppOrderDetails {
  items: OrderItem[]
  subtotal: number
  delivery: number
  giftWrapping?: boolean
  giftWrappingFee?: number
  giftMessage?: string
  total: number
  customerName?: string
  phone?: string
  address?: string
  city?: string
  paymentMethod?: string
  notes?: string
}

export function generateWhatsAppOrderUrl(details: WhatsAppOrderDetails): string {
  const phoneClean = site.phoneHref.replace(/\+/g, "")
  const lines: string[] = []

  lines.push("🛍️ *NEW ORDER - STORE NO. 8*")
  lines.push("================================")

  if (details.customerName?.trim()) {
    lines.push(`👤 *Customer:* ${details.customerName.trim()}`)
  }
  if (details.phone?.trim()) {
    lines.push(`📞 *Phone:* ${details.phone.trim()}`)
  }
  if (details.address?.trim()) {
    const fullAddr = [details.address.trim(), details.city?.trim()]
      .filter(Boolean)
      .join(", ")
    lines.push(`📍 *Delivery Address:* ${fullAddr}`)
  }
  if (details.paymentMethod) {
    lines.push(`💳 *Payment Preference:* ${details.paymentMethod}`)
  }
  if (details.notes?.trim()) {
    lines.push(`📝 *Special Note:* ${details.notes.trim()}`)
  }

  if (details.customerName || details.phone || details.address) {
    lines.push("================================")
  }

  lines.push("📦 *ORDER ITEMS:*")
  details.items.forEach((item, index) => {
    const optionText = item.option ? ` [${item.option}]` : ""
    const lineTotal = item.price * item.quantity
    lines.push(
      `${index + 1}. *${item.name}*${optionText}`,
      `   Qty: ${item.quantity} × LKR ${item.price.toLocaleString("en-LK")} = *LKR ${lineTotal.toLocaleString("en-LK")}*`
    )
  })

  lines.push("================================")
  lines.push(`💵 *Subtotal:* LKR ${details.subtotal.toLocaleString("en-LK")}`)
  lines.push(
    `🚚 *Island-Wide Delivery:* ${
      details.delivery === 0
        ? "FREE (Order over LKR 5,000)"
        : `LKR ${details.delivery.toLocaleString("en-LK")}`
    }`
  )
  if (details.giftWrapping) {
    const fee = details.giftWrappingFee ?? site.giftWrapping.fee
    lines.push(`🎁 *Gift Wrapping:* LKR ${fee.toLocaleString("en-LK")} (Boutique box & satin ribbon)`)
    if (details.giftMessage?.trim()) {
      lines.push(`💌 *Gift Card Note:* "${details.giftMessage.trim()}"`)
    }
  }
  lines.push(`💰 *TOTAL AMOUNT:* *LKR ${details.total.toLocaleString("en-LK")}*`)
  lines.push("================================")
  lines.push("✨ Please confirm order availability and dispatch date. Thank you!")

  const message = lines.join("\n")
  return `https://wa.me/${phoneClean}?text=${encodeURIComponent(message)}`
}
