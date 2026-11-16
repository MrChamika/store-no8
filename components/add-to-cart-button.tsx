"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Check, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"

type AddToCartButtonProps = {
  product: Product
  option?: string
  quantity?: number
  variant?: "default" | "secondary" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  label?: string
}

export function AddToCartButton({
  product,
  option,
  quantity = 1,
  variant = "default",
  size = "default",
  className,
  label = "Add to cart",
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const router = useRouter()
  const [added, setAdded] = React.useState(false)

  function handleAdd() {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        option,
      },
      quantity
    )
    toast.success(`${product.name} added to cart`, {
      description: option ? `Option: ${option}` : undefined,
      action: {
        label: "View cart",
        onClick: () => router.push("/cart"),
      },
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleAdd}
      disabled={!product.inStock}
    >
      {added ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <ShoppingBag className="size-4" aria-hidden="true" />
      )}
      {product.inStock ? (added ? "Added" : label) : "Out of stock"}
    </Button>
  )
}

