"use client"

import { CheckoutSteps } from "@/processes/checkout/checkout-steps"
import { OrderSummary } from "@/processes/checkout/order-summary"
import { CartItemsList } from "@/processes/checkout/cart-items-list"

export default function PersonalInfoPage() {
  return (
    <section className="personal-info">
      <div className="container-32 df mt-120">
        <div className="col-7 df column-dir gap-48">
          <h2 className="text-green">Оформление заказа</h2>
          <CheckoutSteps currentStep={1} />

          <div className="df column-dir gap-32">
            <h5 className="text-green">Личные данные</h5>
            <div className="df column-dir gap-8">
              <div className="df gap-8">
                <input type="text" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Имя" />
                <input type="text" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Фамилиилия" />
                <input type="text" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Отчество" />
              </div>
              <div className="df gap-8">
                <input type="tel" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Номер телефона" />
                <input type="email" className="input-wrapper bg-bw-ec text-green input-info w-100" placeholder="Электронная почта" />
              </div>
            </div>
          </div>

          <CartItemsList />
        </div>

        <div className="col-5 df column-dir order-info">
          <OrderSummary nextStep="/checkout/delivery" nextLabel="Далее" />
        </div>
      </div>
    </section>
  )
}
