"use client"

import { useState } from "react"
import { CheckoutSteps } from "@/processes/checkout/checkout-steps"
import { OrderSummary } from "@/processes/checkout/order-summary"
import { CartItemsList } from "@/processes/checkout/cart-items-list"
import { cn } from "@/shared/lib/cn"

type PaymentMethod = "online" | "onsite" | "manager"

const paymentMethods: { id: PaymentMethod; label: string }[] = [
  { id: "online", label: "Оплатить на сайте" },
  { id: "onsite", label: "Оплатить на месте" },
  { id: "manager", label: "Уточнить у менеджера" },
]

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("online")

  return (
    <section className="personal-info">
      <div className="container-32 df mt-120">
        <div className="col-7 df column-dir gap-48">
          <h2 className="text-green">Оформление заказа</h2>
          <CheckoutSteps currentStep={3} />

          <div className="df column-dir gap-32">
            <h5 className="text-green">Способы оплаты</h5>
            <div className="df">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={selectedMethod === method.id ? "w-100 btn-green" : "w-100 btn-green-sec"}
                >
                  <div className="caption text-center">{method.label}</div>
                </button>
              ))}
            </div>
            <div className="df column-dir gap-16">
              <h6 className="text-green">Комментарий к заказу:</h6>
              <div className="df gap-8">
                <input type="text" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Введите текст" />
              </div>
            </div>
            <div className="df column-dir gap-16">
              <h6 className="text-green">Как вы узнали о нас?</h6>
              <div className="df gap-8">
                <input type="text" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Выберите источник" />
              </div>
            </div>
          </div>

          <CartItemsList />
        </div>

        <div className="col-5 df column-dir order-info">
          <OrderSummary nextStep="/checkout/confirmation" nextLabel="Оплатить заказ" />
        </div>
      </div>
    </section>
  )
}
