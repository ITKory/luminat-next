"use client"

import { useState } from "react"
import { CheckoutSteps } from "@/processes/checkout/checkout-steps"
import { OrderSummary } from "@/processes/checkout/order-summary"
import { CartItemsList } from "@/processes/checkout/cart-items-list"

type DeliveryMethod = "local" | "russia" | "pickup"

const deliveryMethods: { id: DeliveryMethod; label: string; details: string }[] = [
  { id: "local", label: "Доставка по Н. Новгороду", details: "~1 000₽ ~7 дней" },
  { id: "russia", label: "Доставка по России", details: "~1 000₽ ~30 дней" },
  { id: "pickup", label: "Самовывоз", details: "бесплатно ~3 дня" },
]

export default function DeliveryPage() {
  const [selectedMethod, setSelectedMethod] = useState<DeliveryMethod>("russia")

  return (
    <section className="personal-info pb-16">
      <div className="container-32 mt-120 grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-10">
          <div className="space-y-3">
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-gray">Оформление заказа</p>
            <h1 className="text-[2.3rem] leading-none tracking-[-0.04em] text-green md:text-[3rem]">Оформление заказа</h1>
          </div>
          <CheckoutSteps currentStep={2} />

          <div className="flex flex-col gap-8">
            <h5 className="text-green">Способы получения</h5>
            <div className="grid gap-3 md:grid-cols-3">
              {deliveryMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={
                    selectedMethod === method.id
                      ? "min-h-24 bg-green px-4 py-4 text-bwhite"
                      : "min-h-24 border border-[rgba(81,88,98,0.18)] px-4 py-4 text-green"
                  }
                >
                  <div className="space-y-1 text-center">
                    <div className="text-sm leading-5 md:text-base">{method.label}</div>
                    <div className={selectedMethod === method.id ? "text-[0.72rem] text-bwhite/80" : "text-[0.72rem] text-bw-7"}>
                      {method.details}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <h6 className="text-green">Среднее время ожидания: до 30 рабочих дней</h6>
            <div className="flex flex-col gap-3">
              <div className="grid gap-3">
                <input type="text" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Выберите город" />
              </div>
              <div className="grid gap-3">
                <input type="text" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Улица, дом" />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <input type="text" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Квартира/офис" />
                <input type="text" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Подъезд" />
                <input type="text" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Этаж" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h6 className="text-green">Как вам отправить заказ?</h6>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" className="w-fit border-b border-current pb-1 text-left text-green transition hover:opacity-70">
                Отправить все вместе
              </button>
              <button type="button" className="w-fit text-left text-bw-7 transition hover:text-green">
                Отправлять по мере готовности
              </button>
            </div>
          </div>

          <CartItemsList />
        </div>

        <OrderSummary nextStep="/checkout/payment" nextLabel="Далее" />
      </div>
    </section>
  )
}
