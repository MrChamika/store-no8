"use client"

import * as React from "react"

import {
  getServerSnapshot,
  getSnapshot,
  parseItems,
  subscribe,
  writeItems,
  type CartItem,
} from "@/lib/cart-store"

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  hydrated: boolean
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = React.createContext<CartContextValue | null>(null)

const emptySubscribe = () => () => {}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const snapshot = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )
  const hydrated = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const items = React.useMemo(() => parseItems(snapshot), [snapshot])

  const value = React.useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    )

    return {
      items,
      itemCount,
      subtotal,
      hydrated,
      addItem: (item, quantity = 1) => {
        const lineId = `${item.id}:${item.option ?? ""}`
        const existing = items.find((line) => line.id === lineId)
        const next = existing
          ? items.map((line) =>
              line.id === lineId
                ? { ...line, quantity: line.quantity + quantity }
                : line
            )
          : [...items, { ...item, id: lineId, quantity }]
        writeItems(next)
      },
      removeItem: (id) => writeItems(items.filter((line) => line.id !== id)),
      setQuantity: (id, quantity) =>
        writeItems(
          quantity <= 0
            ? items.filter((line) => line.id !== id)
            : items.map((line) =>
                line.id === id ? { ...line, quantity } : line
              )
        ),
      clearCart: () => writeItems([]),
    }
  }, [items, hydrated])

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
