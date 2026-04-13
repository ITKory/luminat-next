"use client"

import { useState } from "react"
import { Header } from "@/widgets/layout/header"
import { CartModal } from "@/widgets/cart/cart-modal"
import { ProfileSidebar } from "@/widgets/profile/profile-sidebar"

type OrderStatus = "completed" | "pending" | "cancelled" | "in_transit" | "ready" | "shipped"

const orders = [
  { id: "123456", date: "13.09.2024", total: "12 000₽", status: "completed" as const, label: "Выполнен", className: "text-success" },
  { id: "123456", date: "13.09.2024", total: "12 000₽", status: "pending" as const, label: "Ожидает оплаты", className: "text-warning" },
  { id: "123456", date: "13.09.2024", total: "12 000₽", status: "cancelled" as const, label: "Отменен", className: "text-danger" },
]

const sortOptions: { key: OrderStatus; label: string }[] = [
  { key: "completed", label: "Выполнен" },
  { key: "in_transit", label: "В пути" },
  { key: "pending", label: "Ожидает оплаты" },
  { key: "ready", label: "Готов к выдаче" },
  { key: "shipped", label: "Передан в доставку" },
  { key: "cancelled", label: "Отменен" },
]

export default function OrdersPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("completed")

  const visibleOrders = orders.filter((order) => order.status === selectedStatus)

  return (
    <main className="bg-bwhite">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <section className="profile">
        <div className="container-32 df mt-120 gap-32">
          <ProfileSidebar title="Мои заказы" />
          <div className="col-9 df column-dir gap-48">
            <div className="sort-item mt-16">
              <div className="dropdown">
                <button type="button" className="dropdown-item df gap-8 text-green p-0" onClick={() => setIsSortOpen((value) => !value)}>
                  <h6 className="text-green">Сортировка</h6>
                  <img src="/images/Arrow/Chevron_Down.svg" alt="" />
                </button>
                {isSortOpen && (
                  <ul className="dropdown-menu">
                    {sortOptions.map((option) => (
                      <li key={option.key}>
                        <button
                          type="button"
                          className={option.key === selectedStatus ? "dropdown-item active" : "dropdown-item"}
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
            </div>

            <div className="df column-dir gap-32 pb-48">
              {visibleOrders.map((order, index) => (
                <div key={`${order.status}-${index}`} className="df gap-32 jcsb order">
                  <div className="df gap-32">
                    <div className="col-3">
                      <img src="/images/order-1_4x.webp" alt="" className="responsive-img-1-1" />
                    </div>
                    <div className="df column-dir jcsb py-16">
                      <div className="df column-dir gap gap-16">
                        <h6 className="text-green">Заказ №{order.id}</h6>
                        <div className="df column-dir gap-8">
                          <p className={order.className}>{order.label}</p>
                          <p className="text-bw-7">{order.date}</p>
                        </div>
                      </div>
                      <h6 className="text-green">Сумма:{order.total}</h6>
                    </div>
                  </div>

                  <div className="df aie jce mr-32">
                    <a href="#" className="btn-green-sec px-16">
                      Подробнее
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
