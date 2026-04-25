"use client"

import { useState } from "react"
import { CheckoutSteps } from "@/processes/checkout/checkout-steps"
import { OrderSummary } from "@/processes/checkout/order-summary"
import { CartItemsList } from "@/processes/checkout/cart-items-list"

type PaymentMethod = "online" | "onsite" | "manager"

const paymentMethods: { id: PaymentMethod; label: string }[] = [
  { id: "online", label: "Оплатить на сайте" },
  { id: "onsite", label: "Оплатить на месте" },
  { id: "manager", label: "Уточнить у менеджера" },
]

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("online")

  return (
    <section className="personal-info pb-16">
      <div className="container-32 mt-120 grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-10">
          <div className="space-y-3">
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-gray">Оформление заказа</p>
            <h1 className="text-[2.3rem] leading-none tracking-[-0.04em] text-green md:text-[3rem]">Оформление заказа</h1>
          </div>
          <CheckoutSteps currentStep={3} />

          <div className="flex flex-col gap-8">
            <h5 className="text-green">Способы оплаты</h5>
            <div className="grid gap-3 md:grid-cols-3">
              {paymentMethods.map((method) => (
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
                  <div className="text-center text-sm leading-5 md:text-base">{method.label}</div>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="text-green">Комментарий к заказу:</h6>
              <div className="grid gap-3">
                <textarea className="min-h-28 border border-transparent bg-bw-ec px-4 py-3 text-green placeholder:text-bw-7" placeholder="Введите текст" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="text-green">Как вы узнали о нас?</h6>
              <div className="grid gap-3">
                <input type="text" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Выберите источник" />
              </div>
            </div>
          </div>

          <CartItemsList />
        </div>

        <OrderSummary nextStep="/checkout/confirmation" nextLabel="Оплатить заказ" />
      </div>
    </section>
  )
}
