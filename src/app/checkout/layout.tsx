"use client"

import { useState } from "react"
import { Header } from "@/widgets/layout/header"
import { CartModal } from "@/widgets/cart/cart-modal"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <main className="min-h-screen bg-bwhite">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {children}
    </main>
  )
}
