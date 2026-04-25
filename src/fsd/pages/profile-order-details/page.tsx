"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import type { TimelineStep } from "@/entities/order/model/orders"
import { getOrderById, getOrderStatusClass } from "@/entities/order/model/orders"
import { formatPrice } from "@/shared/lib/format-price"
import { CartModal } from "@/widgets/cart/cart-modal"
import { Header } from "@/widgets/layout/header"
import { ProfileSidebar } from "@/widgets/profile/profile-sidebar"

interface OrderDetailsPageProps {
  orderId: string
}

const SUMMARY_ROW_CLASS =
    "flex items-baseline gap-3 py-3 text-[1.1rem] text-[rgba(81,88,98,0.82)] md:text-[20px]"

const SUMMARY_LINE_CLASS =
    "relative top-[-0.15em] flex-1 border-b border-dashed border-[rgba(81,88,98,0.18)]"

function MagazineRow({
                       label,
                       value,
                     }: {
  label: ReactNode
  value: ReactNode
}) {
  return (
      <div className={SUMMARY_ROW_CLASS}>
        <span className="shrink-0">{label}</span>
        <span aria-hidden="true" className={SUMMARY_LINE_CLASS} />
        <span className="shrink-0">{value}</span>
      </div>
  )
}

function OrderTimeline({ steps }: { steps: TimelineStep[] }) {
  const lastCompletedIndex = steps.reduce((lastIndex, step, index) => {
    return step.done ? index : lastIndex
  }, -1)

  return (
      <div className="overflow-x-auto pb-3">
        <div
            className="grid min-w-[248px]"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          {steps.map((step, index) => {
            const isLastStep = index === steps.length - 1
            const isDone = step.done
            const isActive = !isDone && index === lastCompletedIndex + 1
            const isCompletedLine = index <= lastCompletedIndex

            return (
                <div key={`${step.title}-${index}`} className="relative">
                  {!isLastStep && (
                      <div
                          aria-hidden="true"
                          className={`absolute left-[2.05rem] top-[1.1rem] h-px w-[calc(100%-2.5rem)] ${
                              isCompletedLine ? "bg-green" : "bg-[rgba(81,88,98,0.18)]"
                          }`}
                      />
                  )}

                  <div className="relative z-10 flex flex-col gap-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bwhite">
                      <Image
                          src={isDone ? "/images/done.png" : "/images/notdone.png"}
                          alt=""
                          width={32}
                          height={32}
                          className={isDone || isActive ? "opacity-100" : "opacity-70"}
                      />
                    </div>

                    <p
                        className={`max-w-44 text-[12px] leading-[1.35] ${
                            isDone || isActive
                                ? "text-green"
                                : "text-[rgba(81,88,98,0.34)]"
                        }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
            )
          })}
        </div>
      </div>
  )
}

function OrderItemRow({
                        image,
                        name,
                        description,
                        quantity,
                        status,
                        statusClassName,
                        total,
                      }: {
  image: string
  name: string
  description?: string
  quantity: number
  status?: string
  statusClassName?: string
  total: number
}) {
  return (
      <div className="grid gap-6 py-6 md:grid-cols-[minmax(0,1.7fr)_9rem_13rem_10rem] md:items-center md:gap-9">
        <div className="flex min-w-0 gap-6 md:gap-8">
          <div className="relative h-[9.75rem] w-[7.5rem] shrink-0 overflow-hidden bg-[rgba(81,88,98,0.05)] md:h-[10.75rem] md:w-[8.5rem]">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 120px, 144px"
            />
          </div>

          <div className="min-w-0 self-center space-y-2">
            <div className="w-full max-w-[17rem] text-[36px] leading-[0.94] tracking-[-0.045em] text-green">
              {name}
            </div>

            {description ? (
                <p className="text-[12px] text-[rgba(81,88,98,0.78)]">
                  {description}
                </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 md:contents">
          <div className="space-y-2 md:self-center md:text-center">
            <div className="text-[0.8rem] text-gray md:hidden">Количество</div>
            <div className="text-[20px] leading-none tracking-[-0.04em] text-green">
              {quantity} шт
            </div>
          </div>

          <div className="space-y-2 md:self-center">
            <div className="text-[0.8rem] text-gray md:hidden">Статус</div>
            <div
                className={`max-w-48 text-[20px] leading-[1.15] ${getOrderStatusClass(
                    status,
                    statusClassName
                )}`}
            >
              {status || "—"}
            </div>
          </div>

          <div className="space-y-2 md:self-center md:text-right">
            <div className="text-[0.8rem] text-gray md:hidden">Сумма</div>
            <div className="text-[36px] leading-none tracking-[-0.05em] text-green">
              {formatPrice(total)}
            </div>
          </div>
        </div>
      </div>
  )
}

export default function OrderDetailsPage({ orderId }: OrderDetailsPageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const order = getOrderById(orderId)

  if (!order) {
    return (
        <main className="min-h-screen bg-bwhite">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          <section className="pb-20">
            <div className="container-32 mt-120 grid items-start gap-8 xl:grid-cols-[15rem_minmax(0,1fr)]">
              <ProfileSidebar title="Заказ" />

              <div className="border border-dashed border-[rgba(81,88,98,0.2)] px-6 py-10 md:px-8">
                <div className="text-2xl leading-tight text-green">
                  Заказ не найден
                </div>
                <p className="mt-3 max-w-xl text-sm leading-6 text-gray md:text-base">
                  Проверьте номер заказа или вернитесь к списку заказов.
                </p>
                <Link
                    href="/profile/orders"
                    className="mt-6 inline-flex items-center gap-2 text-green hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Вернуться к заказам
                </Link>
              </div>
            </div>
          </section>
        </main>
    )
  }

  const itemsSubtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
  )
  const discountAmount = order.discount ? (itemsSubtotal * order.discount) / 100 : 0
  const lineItemsCount = order.items.length

  return (
      <main className="min-h-screen bg-bwhite">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <section className="pb-24">
          <div className="container-32 mt-120 grid items-start gap-10 xl:grid-cols-[15rem_minmax(0,1fr)]">
            <ProfileSidebar title="Заказ" />

            <div className="min-w-0 space-y-14 xl:max-w-[72rem]">
              <section className="space-y-9">
                <div className="text-[72px] leading-none tracking-[-0.05em] text-green md:text-[3rem] xl:text-[3.45rem]">
                  Заказ №{order.id}
                </div>
                <OrderTimeline steps={order.timeline} />
              </section>

              <section className="space-y-5">
                <div className="text-[20px] leading-none tracking-[-0.05em] text-green">
                  Товары
                </div>

                <div className="hidden grid-cols-[minmax(0,1.7fr)_16rem_14rem_10rem] border-b border-[rgba(81,88,98,0.14)] pb-4 text-[1.08rem] leading-none text-[rgba(81,88,98,0.72)] md:grid md:text-[1.22rem]">
                  <span>Товар</span>
                  <span className="text-center">Количество</span>
                  <span>Статус</span>
                  <span className="text-right">Сумма</span>
                </div>

                <div className="divide-y divide-[rgba(81,88,98,0.08)] border-t border-[rgba(81,88,98,0.06)] md:border-t-0">
                  {order.items.map((item) => (
                      <OrderItemRow
                          key={item.id}
                          image={item.image}
                          name={item.name}
                          description={item.description}
                          quantity={item.quantity}
                          status={item.status}
                          statusClassName={item.statusClassName}
                          total={item.price * item.quantity}
                      />
                  ))}
                </div>
              </section>

              <section className="pt-2">
                <MagazineRow
                    label={`Товары (${lineItemsCount})`}
                    value={formatPrice(itemsSubtotal)}
                />

                {order.discount ? (
                    <MagazineRow
                        label={`Скидка ${order.discount}%`}
                        value={`-${formatPrice(discountAmount)}`}
                    />
                ) : null}

                <div className="flex items-baseline gap-3 py-5 md:py-6">
                <span className="shrink-0 text-[1.05rem] leading-none tracking-[-0.05em] text-green md:text-[40px]">
                  Итого
                </span>
                  <span
                      aria-hidden="true"
                      className="relative top-[-0.15em] flex-1 border-b border-dashed border-[rgba(81,88,98,0.18)]"
                  />
                  <span className="shrink-0 text-[1.05rem] leading-none tracking-[-0.06em] text-green md:text-[40px]">
                  {formatPrice(order.total)}
                </span>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
  )
}
