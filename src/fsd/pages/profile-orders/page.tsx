"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
    orders,
    sortOptions,
    type OrderStatus,
} from "@/entities/order/model/orders"
import { formatPrice } from "@/shared/lib/format-price"
import { Header } from "@/widgets/layout/header"
import { CartModal } from "@/widgets/cart/cart-modal"
import { ProfileSidebar } from "@/widgets/profile/profile-sidebar"

export default function OrdersPage() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("completed")

    const visibleOrders = orders.filter((order) => order.status === selectedStatus)

    return (
        <main className="min-h-screen bg-bwhite">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <section className="pb-16">
                <div className="container-32 mt-120 grid items-start gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
                    <ProfileSidebar title="Мои заказы" />

                    <div className="min-w-0 lg:pt-2">
                        {/* Sort dropdown */}
                        <div className="relative mb-8 inline-block">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 border-b border-[rgba(81,88,98,0.16)] pb-2 text-green transition-colors hover:border-green"
                                onClick={() => setIsSortOpen((value) => !value)}
                                aria-expanded={isSortOpen}
                                aria-haspopup="listbox"
                            >
                <span className="text-base font-medium md:text-lg">
                  Сортировка
                </span>
                                <ChevronDown className="h-5 w-5" />
                            </button>

                            {isSortOpen && (
                                <ul
                                    className="absolute left-0 top-full z-20 mt-3 min-w-64 border border-[rgba(81,88,98,0.16)] bg-bwhite p-2 shadow-lg"
                                    role="listbox"
                                >
                                    {sortOptions.map((option) => (
                                        <li key={option.key}>
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={option.key === selectedStatus}
                                                className={
                                                    option.key === selectedStatus
                                                        ? "flex w-full px-4 py-3 text-left text-bwhite bg-green"
                                                        : "flex w-full px-4 py-3 text-left text-green transition hover:bg-[rgba(81,88,98,0.06)]"
                                                }
                                                onClick={() => {
                                                    setSelectedStatus(option.key)
                                                    setIsSortOpen(false)
                                                }}
                                            >
                                                {option.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Orders list */}
                        {visibleOrders.length > 0 ? (
                            <div className="flex flex-col gap-6 pb-12">
                                {visibleOrders.map((order) => (
                                    <article
                                        key={order.id}
                                        className="flex flex-col gap-5 border border-[rgba(81,88,98,0.14)] bg-bwhite p-4 lg:flex-row lg:items-center lg:justify-between"
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                            <div className="relative aspect-square w-full shrink-0 overflow-hidden sm:w-32">
                                                <Image
                                                    src={order.items[0]?.image ?? "/images/products/product-1.webp"}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 640px) 100vw, 128px"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col gap-4">
                                                <div className="space-y-2">
                                                    <h6 className="font-medium text-green">
                                                        Заказ №{order.id}
                                                    </h6>
                                                    <div className="flex flex-col gap-1">
                                                        <p className={order.className}>{order.label}</p>
                                                        <p className="text-sm text-gray">{order.date}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray">
                                                    {order.deliveryMethod}
                                                </p>
                                                <p className="font-medium text-green">
                                                    Сумма: {formatPrice(order.total)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-start lg:justify-end">
                                            <Link
                                                href={`/profile/orders/${order.id}`}
                                                className="inline-flex min-h-12 items-center justify-center border border-[rgba(81,88,98,0.2)] px-5 text-green transition hover:border-green hover:bg-green/5"
                                            >
                                                Подробнее
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="border border-dashed border-[rgba(81,88,98,0.2)] px-6 py-10 text-center">
                                <h6 className="font-medium text-green">
                                    Заказов с этим статусом пока нет
                                </h6>
                                <p className="mt-3 text-sm text-gray">
                                    Выберите другой статус в сортировке или оформите новый заказ.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}
