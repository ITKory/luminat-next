import Link from "next/link"
import { checkoutItems } from "@/entities/order/model/orders"
import { formatPrice } from "@/shared/lib/format-price"

interface OrderSummaryProps {
  nextStep?: string
  nextLabel?: string
}

const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const discount = Math.round(subtotal * 0.1)
const finalTotal = subtotal - discount

export function OrderSummary({ nextStep, nextLabel = "Далее" }: OrderSummaryProps) {
  return (
    <aside className="border border-[rgba(81,88,98,0.14)] bg-bw-ec p-5 md:p-6 lg:sticky lg:top-28">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="text-[0.72rem] uppercase tracking-[0.14em] text-gray">Ваш заказ</div>
          <h5 className="text-green">Информация о заказе</h5>
          <div className="flex flex-col gap-2 text-sm text-green">
            <div>Осталось 88 800₽ до бесплатной доставки</div>
            <div>Ориентировочная дата доставки: 01.08.2025</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm md:text-base">
            <p className="text-green">Товары ({checkoutItems.length})</p>
            <p className="text-green medium">{formatPrice(subtotal)}</p>
          </div>
          <div className="flex items-center justify-between text-sm md:text-base">
            <p className="text-green">Скидка 10%</p>
            <p className="text-green medium">-{formatPrice(discount)}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              className="min-h-12 w-full border border-green bg-transparent px-4 text-green"
              placeholder="Промокод"
            />
            <button type="button" className="inline-flex min-h-12 items-center justify-center bg-green px-5 text-bwhite">
              Ввести
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[rgba(81,88,98,0.14)] pt-4">
          <div className="flex items-center justify-between">
            <h5 className="text-green">Итого</h5>
            <h5 className="text-green medium">{formatPrice(finalTotal)}</h5>
          </div>
          {nextStep && (
            <Link href={nextStep} className="inline-flex min-h-12 items-center justify-center bg-green px-5 text-bwhite">
              {nextLabel}
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
