"use client"

import Image from "next/image"
import Link from "next/link"
import { checkoutItems } from "@/entities/order/model/orders"
import { formatPrice } from "@/shared/lib/format-price"

interface CartItem {
  id: string
  name: string
  description?: string
  price: number
  quantity: number
  image: string
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  items?: CartItem[]
}

function CloseIcon() {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
      >
        <path
            d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </svg>
  )
}

function MinusIcon() {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
      >
        <path
            d="M7 12H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </svg>
  )
}

function PlusIcon() {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
      >
        <path
            d="M7 12H12M12 12H17M12 12V17M12 12V7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </svg>
  )
}

const defaultItems: CartItem[] = checkoutItems.map((item) => ({
  ...item,
  description: "Авторский светильник из актуальной коллекции LUMINAT",
}))

export function CartModal({
                            isOpen,
                            onClose,
                            items = defaultItems,
                          }: CartModalProps) {
  if (!isOpen) {
    return null
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
      <section className="fixed inset-0 z-[1200]" role="dialog" aria-modal="true">
        <div
            className="absolute inset-0 bg-[rgba(17,17,17,0.55)]"
            onClick={onClose}
            aria-hidden="true"
        />

        <div className="absolute inset-y-0 right-0 flex justify-end ">
          <div className="flex h-full w-full max-w-2xl flex-col bg-bwhite shadow-[0_0_40px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between border-b border-[rgba(81,88,98,0.14)] p-20 md:px-8">
              <h3 className="text-xl font-semibold text-green md:text-2xl">
                Корзина
              </h3>
              <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 w-11 items-center justify-center border border-[rgba(81,88,98,0.16)] text-gray transition-colors hover:border-green hover:text-green"
                  aria-label="Закрыть корзину"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 md:px-8">
              <div className="flex flex-col gap-5">
                {items.map((item) => (
                    <article
                        key={item.id}
                        className="flex flex-col gap-4 border border-[rgba(81,88,98,0.12)] p-4 m-4 sm:flex-row"
                    >
                      <div className="relative aspect-square w-full shrink-0 overflow-hidden sm:w-28">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 112px"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h6 className="font-medium text-green">{item.name}</h6>
                            {item.description && (
                                <p className="mt-2 text-sm text-gray">
                                  {item.description}
                                </p>
                            )}
                          </div>
                          <button
                              type="button"
                              className="shrink-0 text-gray transition-colors hover:text-green"
                              aria-label={`Удалить ${item.name}`}
                          >
                            <CloseIcon />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <div className="inline-flex items-center border border-[rgba(81,88,98,0.16)]">
                            <button
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center text-gray transition-colors hover:text-green"
                                aria-label="Уменьшить количество"
                            >
                              <MinusIcon />
                            </button>
                            <span className="inline-flex min-w-10 justify-center text-green">
                          {item.quantity}
                        </span>
                            <button
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center text-gray transition-colors hover:text-green"
                                aria-label="Увеличить количество"
                            >
                              <PlusIcon />
                            </button>
                          </div>
                          <span className="shrink-0 font-medium text-green">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                        </div>
                      </div>
                    </article>
                ))}
              </div>
            </div>

            <div className="border-t border-[rgba(81,88,98,0.14)] p-20 md:px-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-green">Итого</p>
                <span className="text-lg font-semibold text-green">
                {formatPrice(total)}
              </span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                    href="/checkout"
                    className="inline-flex min-h-12 flex-1 items-center justify-center bg-green px-5 font-medium text-bwhite transition-colors hover:bg-green/90"
                    onClick={onClose}
                >
                  Перейти к оформлению
                </Link>
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex min-h-12 flex-1 items-center justify-center border border-[rgba(81,88,98,0.16)] px-5 font-medium text-green transition-colors hover:border-green hover:bg-green/5"
                >
                  Продолжить выбор
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
