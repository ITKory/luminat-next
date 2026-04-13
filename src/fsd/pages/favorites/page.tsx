"use client"

import { useState } from "react"
import { favoriteProductNames, getProductPreviews } from "@/entities/product/model/products"
import { Header } from "@/widgets/layout/header"
import { CartModal } from "@/widgets/cart/cart-modal"
import { ProfileSidebar } from "@/widgets/profile/profile-sidebar"

const favoriteProducts = getProductPreviews(favoriteProductNames)

function formatPrice(price: number) {
  return `${price.toLocaleString("ru-RU").replace(/\u00A0/g, " ")}₽`
}

function FavoriteCard({ name, price, image }: { name: string; price: number; image: string }) {
  return (
    <div className="product-item df column-dir gap-12">
      <div className="product-image-wrapper relative df jce">
        <img src={image} alt="" className="responsive-img-3-4" />
        <a href="#" className="like-btn absolute top-0 right-0 mt-12 mr-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 10.2589C13.3333 3.99967 4 4.66634 4 12.6664C4 20.6664 16 27.3333 16 27.3333C16 27.3333 28 20.6664 28 12.6664C28 4.66634 18.6667 3.99967 16 10.2589Z"
              stroke="#FFFEF7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
      <div className="df jcsb">
        <h6 className="text-green">{name}</h6>
        <h6 className="text-green text-end">{formatPrice(price)}</h6>
      </div>
      <div className="to-cart text-end">
        <a href="#" className="btn-link-green-sec">В корзину→</a>
      </div>
    </div>
  )
}

export default function FavoritesPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <main className="bg-bwhite">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <section className="fav">
        <div className="container-32 df mt-120 gap-32">
          <ProfileSidebar title="Избранное" />
          <div className="catalog">
            <div className="products-grid soft-modern">
              {favoriteProducts.map((favorite) => (
                <FavoriteCard key={favorite.name} {...favorite} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
