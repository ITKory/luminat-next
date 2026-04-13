"use client"

import { useState } from "react"
import { CheckoutSteps } from "@/processes/checkout/checkout-steps"
import { OrderSummary } from "@/processes/checkout/order-summary"
import { CartItemsList } from "@/processes/checkout/cart-items-list"
import { cn } from "@/shared/lib/cn"

type DeliveryMethod = "local" | "russia" | "pickup"

const deliveryMethods: { id: DeliveryMethod; label: string; details: string }[] = [
  { id: "local", label: "Доставка по Н. Новгороду", details: "~1 000₽ ~7 дней" },
  { id: "russia", label: "Доставка по России", details: "~1 000₽ ~30 дней" },
  { id: "pickup", label: "Самовывоз", details: "бесплатно ~3 дня" },
]

export default function DeliveryPage() {
  const [selectedMethod, setSelectedMethod] = useState<DeliveryMethod>("russia")

  return (
    <section className="personal-info">
      <div className="container-32 df mt-120">
        <div className="col-7 df column-dir gap-48">
          <h2 className="text-green">Оформление заказа</h2>
          <CheckoutSteps currentStep={2} />

          <div className="df column-dir gap-32">
            <h5 className="text-green">Способы получения</h5>
            <div className="df">
              {deliveryMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={selectedMethod === method.id ? "w-100 btn-green" : "w-100 btn-green-sec"}
                >
                  <div className="caption text-center">
                    {method.label} <br />
                    {method.details}
                  </div>
                </button>
              ))}
            </div>
            <h6 className="text-green">Среднее время ожидания: до 30 рабочих дней</h6>
            <div className="df column-dir gap-8">
              <div className="df gap-8">
                <input type="text" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Выберите город" />
              </div>
              <div className="df gap-8">
                <input type="text" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Улица, дом" />
              </div>
              <div className="df gap-8">
                <input type="text" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Квартира/офис" />
                <input type="text" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Подъезд" />
                <input type="text" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Этаж" />
              </div>
            </div>
          </div>

          <div className="df column-dir gap-32">
            <h6 className="text-green">Как вам отправить заказ?</h6>
            <div className="df gap-16">
              <a href="#" className="btn-link-green-sec">Отправить все вместе</a>
              <a href="#" className="btn-link-gray-sec">Отправлять по мере готовности</a>
            </div>
          </div>

          <CartItemsList />
        </div>

        <div className="col-5 df column-dir order-info">
          <OrderSummary nextStep="/checkout/payment" nextLabel="Далее" />
        </div>
      </div>
    </section>
  )
}
