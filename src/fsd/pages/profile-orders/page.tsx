"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
    getOrderStatusClass,
    orders,
    sortOptions,
    type OrderItem,
    type OrderStatus,
} from "@/entities/order/model/orders"
import { formatPrice } from "@/shared/lib/format-price"
import { Header } from "@/widgets/layout/header"
import { CartModal } from "@/widgets/cart/cart-modal"
import { ProfileSidebar } from "@/widgets/profile/profile-sidebar"

function OrderItemsPreview({ items }: { items: OrderItem[] }) {
    const previewItems = items.slice(0, 4)

    return (
        <div className="grid w-[7.75rem] shrink-0 grid-cols-2 gap-1 sm:w-[8.5rem]">
            {previewItems.map((item) => (
                <div
                    key={item.id}
                    className="relative aspect-square overflow-hidden bg-[rgba(81,88,98,0.06)]"
                >
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 3.875rem, 4.25rem"
                    />
                </div>
            ))}
        </div>
    )
}

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
                        <div className="relative mb-8 inline-block">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 border-b border-[rgba(81,88,98,0.16)] pb-2 text-green transition-colors hover:border-green"
                                onClick={() => setIsSortOpen((v) => !v)}
                                aria-expanded={isSortOpen}
                                aria-haspopup="listbox"
                            >
                                <span className="text-base font-medium md:text-lg">Сортировка</span>
                                <ChevronDown className="h-5 w-5" />
                            </button>

                            {isSortOpen && (
                                <ul
                                    className="absolute left-0 top-full z-20 mt-3 min-w-64 border border-[rgba(81,88,98,0.16)] bg-bwhite p-2 shadow-lg"
                                    role="listbox"
                                >
                                    {sortOptions.map((option) => {
                                        const isActive = option.key === selectedStatus

                                        return (
                                            <li key={option.key}>
                                                <button
                                                    type="button"
                                                    role="option"
                                                    aria-selected={isActive}
                                                    className={
                                                        isActive
                                                            ? "flex w-full px-4 py-3 text-left bg-green text-bwhite"
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
                                        )
                                    })}
                                </ul>
                            )}
                        </div>

                        {visibleOrders.length > 0 ? (
                            <div className="flex flex-col gap-6 pb-12">
                                {visibleOrders.map((order) => (
                                    <article
                                        key={order.id}
                                        className="grid gap-5  md:grid-cols-[8.5rem_minmax(0,1fr)_auto] md:items-center md:gap-6"
                                    >
                                        <OrderItemsPreview items={order.items} />
                                        <div className="min-w-0 space-y-6">
                                            <h6 className="font-medium  text-green md:text-[2rem] md:leading-none md:tracking-[-0.04em]">
                                                Заказ №{order.id}
                                            </h6>
                                            <div/>
                                            <div className="space-y-3">
                                                <p className={getOrderStatusClass(order.label, order.className)}>
                                                    {order.label}
                                                </p>
                                                <p className="text-sm text-gray">{order.date}</p>
                                            </div>

                                            <p className="text-xl text-green md:text-[2rem] md:leading-none md:tracking-[-0.04em]">
                                                Сумма: {formatPrice(order.total)}
                                            </p>
                                        </div>

                                        <div className="flex justify-start md:justify-end">
                                            <Link
                                                href={`/profile/orders/${order.id}`}
                                                className="inline-flex min-h-12 items-center justify-center border border-[rgba(81,88,98,0.2)] px-6 text-green transition hover:border-green hover:bg-green/5"
                                            >
                                                Подробнее
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="border border-dashed border-[rgba(81,88,98,0.2)] px-6 py-10 text-center">
                                <h6 className="font-medium text-green">Заказов с этим статусом пока нет</h6>
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
