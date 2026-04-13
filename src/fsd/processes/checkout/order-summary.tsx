import Link from "next/link"

interface OrderSummaryProps {
  nextStep?: string
  nextLabel?: string
}

export function OrderSummary({ nextStep, nextLabel = "Далее" }: OrderSummaryProps) {
  return (
    <div className="bg-bw-ec df column-dir gap-48 mr-32 px-32 py-64">
      <div className="df column-dir gap-16">
        <h5 className="text-green">Информация о заказе</h5>
        <div className="df column-dir gap-8">
          <div className="caption text-green">Осталось 88 800₽ до бесплатной доставки</div>
          <div className="caption text-green">Ориентировочная дата доставки: 01.08.2025</div>
        </div>
      </div>

      <div className="df column-dir gap-16">
        <div className="df jcsb">
          <p className="text-green">Товары (3)</p>
          <p className="text-green medium">146 125₽</p>
        </div>
        <div className="df jcsb">
          <p className="text-green">Скидка 10%</p>
          <p className="text-green medium">14 612,5₽</p>
        </div>
        <div className="df gap-8">
          <input type="text" className="input-wrapper bg-bw-ec text-green input-promo w-100" placeholder="Промокод" />
          <button type="button" className="btn-green p-20">
            Ввести
          </button>
        </div>
      </div>

      <div className="df column-dir gap-16">
        <div className="df jcsb">
          <h5 className="text-green">Итого</h5>
          <h5 className="text-green medium">146 125₽</h5>
        </div>
        {nextStep && (
          <Link href={nextStep} className="btn-green">
            {nextLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
