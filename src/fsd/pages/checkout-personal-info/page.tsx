"use client"

import { CheckoutSteps } from "@/processes/checkout/checkout-steps"
import { OrderSummary } from "@/processes/checkout/order-summary"
import { CartItemsList } from "@/processes/checkout/cart-items-list"

export default function PersonalInfoPage() {
  return (
    <section className="personal-info pb-16">
      <div className="container-32 mt-120 grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-10">
          <div className="space-y-3">
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-gray">Оформление заказа</p>
            <h1 className="text-[2.3rem] leading-none tracking-[-0.04em] text-green md:text-[3rem]">Оформление заказа</h1>
          </div>
          <CheckoutSteps currentStep={1} />

          <div className="flex flex-col gap-8">
            <h5 className="text-green">Личные данные</h5>
            <div className="flex flex-col gap-3">
              <div className="grid gap-3 md:grid-cols-3">
                <input type="text" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Имя" />
                <input type="text" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Фамилия" />
                <input type="text" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Отчество" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input type="tel" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Номер телефона" />
                <input type="email" className="min-h-12 border border-transparent bg-bw-ec px-4 text-green placeholder:text-bw-7" placeholder="Электронная почта" />
              </div>
            </div>
          </div>

          <CartItemsList />
        </div>

        <OrderSummary nextStep="/checkout/delivery" nextLabel="Далее" />
      </div>
    </section>
  )
}
