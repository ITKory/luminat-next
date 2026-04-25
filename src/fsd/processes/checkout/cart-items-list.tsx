import type { ReactNode } from "react"
import Image from "next/image"
import { checkoutItems } from "@/entities/order/model/orders"
import { formatPrice } from "@/shared/lib/format-price"

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
        stroke="#515862"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StepperButton({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(81,88,98,0.16)] text-green"
      aria-label={label}
    >
      {children}
    </button>
  )
}

export function CartItemsList() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-[0.72rem] uppercase tracking-[0.14em] text-gray">Корзина</p>
        <h5 className="text-green">Состав заказа</h5>
      </div>
      <div className="flex flex-col gap-4">
        {checkoutItems.map((item) => (
          <article key={item.id} className="flex flex-col gap-4 border border-[rgba(81,88,98,0.14)] bg-bwhite p-4 md:p-5">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="w-full sm:w-28">
                <Image src={item.image} alt={item.name} width={400} height={400} className="responsive-img-1-1 w-full" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h6 className="text-green">{item.name}</h6>
                    <p className="mt-2 max-w-[26rem] text-sm leading-6 text-bw-7">
                      Авторский светильник из актуальной коллекции LUMINAT
                    </p>
                  </div>
                  <button type="button" className="shrink-0 text-green" aria-label={`Удалить ${item.name}`}>
                    <CloseIcon />
                  </button>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex w-fit items-center border border-[rgba(81,88,98,0.14)]">
                    <StepperButton label="Уменьшить количество">−</StepperButton>
                    <span className="inline-flex min-w-12 justify-center text-green">{item.quantity}</span>
                    <StepperButton label="Увеличить количество">+</StepperButton>
                  </div>
                  <h6 className="text-green">{formatPrice(item.price * item.quantity)}</h6>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
