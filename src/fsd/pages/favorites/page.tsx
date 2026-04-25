"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { formatPrice } from "@/shared/lib/format-price"
import {
  favoriteProductNames,
  getProductPreviews,
} from "@/entities/product/model/products"
import { Header } from "@/widgets/layout/header"
import { CartModal } from "@/widgets/cart/cart-modal"
import { ProfileSidebar } from "@/widgets/profile/profile-sidebar"
import { HeartOffIcon} from "lucide-react";

const initialFavorites = getProductPreviews(favoriteProductNames)



interface FavoriteCardProps {
  name: string
  price: number
  image: string
  onRemove: () => void
  onAddToCart: () => void
}

function FavoriteCard({
                        name,
                        price,
                        image,
                        onRemove,
                        onAddToCart,
                      }: FavoriteCardProps) {
  return (
      <article className="flex min-w-0 flex-col gap-3   bg-bwhite p-4">
        <div className="relative">
          <div className="relative aspect-4/4 w-full overflow-hidden">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <button
              type="button"
              onClick={onRemove}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center transition-colors hover:bg-bwhite"
              aria-label={`Убрать ${name} из избранного`}
          >
            <HeartOffIcon color="red"  />
          </button>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h6 className="font-medium text-green">{name}</h6>
          <span className="shrink-0 text-end font-medium text-green">
          {formatPrice(price)}
        </span>
        </div>

        <button
            type="button"
            onClick={onAddToCart}
            className="w-fit self-end text-sm text-green transition hover:opacity-70"
        >
          В корзину →
        </button>
      </article>
  )
}

function getPluralForm(count: number): string {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "позиций"
  }
  if (lastDigit === 1) {
    return "позиция"
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return "позиции"
  }
  return "позиций"
}

export default function FavoritesPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [items, setItems] = useState(initialFavorites)

  const hasItems = items.length > 0
  const totalItemsLabel = useMemo(
      () => `${items.length} ${getPluralForm(items.length)}`,
      [items.length]
  )

  return (
      <main className="min-h-screen bg-bwhite">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <section className="pb-16">
          <div className="container-32 mt-120 grid items-start gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <ProfileSidebar title="Избранное" />

            <div className="min-w-0 lg:pt-2">
              {/* Header section */}
              <div className="mb-8 flex flex-col gap-4 border-b border-[rgba(81,88,98,0.14)] pb-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray md:text-base">
                    {hasItems ? totalItemsLabel : "Список пока пуст"}
                  </p>
                </div>
                {hasItems && (
                    <button
                        type="button"
                        onClick={() => setItems([])}
                        className="w-fit text-sm text-green transition hover:opacity-70"
                    >
                      Очистить избранное
                    </button>
                )}
              </div>

              {/* Favorites grid */}
              {hasItems ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
                    {items.map((favorite) => (
                        <FavoriteCard
                            key={favorite.name}
                            {...favorite}
                            onAddToCart={() => setIsCartOpen(true)}
                            onRemove={() =>
                                setItems((current) =>
                                    current.filter((item) => item.name !== favorite.name)
                                )
                            }
                        />
                    ))}
                  </div>
              ) : (
                  <div className="border border-dashed border-[rgba(81,88,98,0.2)] px-6 py-10 text-center">
                    <h6 className="font-medium text-green">
                      В избранном пока ничего нет
                    </h6>
                    <p className="mt-3 text-sm text-gray">
                      Добавьте понравившиеся модели из каталога, чтобы вернуться к
                      ним позже.
                    </p>
                  </div>
              )}
            </div>
          </div>
        </section>
      </main>
  )
}
