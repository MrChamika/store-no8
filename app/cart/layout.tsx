import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review items in your Store No. 8 basket, update quantities, or proceed to checkout.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
