import Link from "next/link"
import { checkoutItems } from "@/entities/order/model/orders"
import { formatPrice } from "@/shared/lib/format-price"

const checkoutTotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

export default function CheckoutStartPage() {
  return (
    <section className="pb-16">
      <div className="container-32 mt-120 grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-gray">Оформление заказа</p>
            <h1 className="text-[2.3rem] leading-none tracking-[-0.04em] text-green md:text-[3rem]">
              Проверка корзины
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-gray md:text-base">
              Проверьте состав заказа, итоговую сумму и переходите к заполнению данных. Основной flow
              оформления остаётся пошаговым.
            </p>
          </div>

          <div className="grid gap-4">
            {checkoutItems.map((item) => (
              <article key={item.id} className="flex flex-col gap-4 border border-[rgba(81,88,98,0.14)] bg-bwhite p-4 md:p-5 sm:flex-row">
                <div className="w-full sm:w-28">
                  <img src={item.image} alt={item.name} className="responsive-img-1-1 w-full" />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div>
                    <h6 className="text-green">{item.name}</h6>
                    <p className="mt-1 text-sm leading-6 text-gray">Количество: {item.quantity}</p>
                  </div>
                  <p className="text-lg leading-none text-green md:text-xl">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="border border-[rgba(81,88,98,0.14)] bg-bwhite p-5 md:p-6">
          <div className="space-y-4">
            <h6 className="text-green">Итог по заказу</h6>
            <div className="flex items-center justify-between text-sm md:text-base">
              <p className="text-gray">Товары</p>
              <p className="text-green">{formatPrice(checkoutTotal)}</p>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm md:text-base">
              <p className="text-gray">Доставка</p>
              <p className="text-right text-green">Рассчитывается на следующем шаге</p>
            </div>
            <div className="border-t border-[rgba(81,88,98,0.14)] pt-4">
              <div className="flex items-center justify-between">
                <h6 className="text-green">Итого</h6>
                <h6 className="text-green">{formatPrice(checkoutTotal)}</h6>
              </div>
            </div>
            <Link href="/checkout/personal-info" className="inline-flex min-h-12 w-full items-center justify-center bg-green px-5 text-bwhite">
              Перейти к оформлению
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}
