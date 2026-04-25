import Link from "next/link"
import { checkoutItems } from "@/entities/order/model/orders"
import { formatPrice } from "@/shared/lib/format-price"

const total = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const confirmedOrderId = "1"

export default function CheckoutConfirmationPage() {
  return (
    <section className="pb-16">
      <div className="container-32 mt-120 grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="border border-[rgba(81,88,98,0.14)] bg-bwhite p-6 md:p-8">
          <p className="text-[0.72rem] uppercase tracking-[0.14em] text-gray">Заказ оформлен</p>
          <h1 className="mt-3 text-[2.3rem] leading-none tracking-[-0.04em] text-green md:text-[3rem]">
            Спасибо за заказ
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray md:text-base">
            Мы отправили подтверждение на почту и передали заказ менеджеру. Следить за его статусом можно в
            разделе с заказами.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="border border-[rgba(81,88,98,0.12)] p-4">
              <p className="text-gray">Номер заказа</p>
              <h6 className="mt-2 text-green">№{confirmedOrderId}</h6>
            </div>
            <div className="border border-[rgba(81,88,98,0.12)] p-4">
              <p className="text-gray">Сумма</p>
              <h6 className="mt-2 text-green">{formatPrice(total)}</h6>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/profile/orders/${confirmedOrderId}`}
              className="inline-flex min-h-12 items-center justify-center bg-green px-5 text-bwhite"
            >
              Подробнее о заказе
            </Link>
            <Link href="/" className="inline-flex min-h-12 items-center justify-center border border-[rgba(81,88,98,0.2)] px-5 text-green">
              На главную
            </Link>
          </div>
        </div>

        <aside className="border border-[rgba(81,88,98,0.14)] bg-bwhite p-5 md:p-6">
          <h6 className="text-green">Что дальше</h6>
          <div className="mt-4 space-y-4 text-sm">
            <p className="text-gray">Менеджер свяжется с вами для подтверждения деталей и сроков доставки.</p>
            <div className="border-t border-[rgba(81,88,98,0.14)] pt-4">
              <p className="text-gray">В заказе</p>
              <ul className="mt-2 space-y-2">
                {checkoutItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-4">
                    <span className="text-green">{item.name}</span>
                    <span className="text-green">{formatPrice(item.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
