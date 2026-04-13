"use client"

import Image from "next/image"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: string
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  items?: CartItem[]
}

const defaultItems: CartItem[] = [
  {
    id: "1",
    name: "Blur",
    description: "It is a long established fact that a reader will be distracted by the readable",
    price: 12000,
    quantity: 1,
    image: "/images/Blurglass.webp",
  },
  {
    id: "2",
    name: "Fossil",
    description: "It is a long established fact that a reader will be distracted by the readable",
    price: 12000,
    quantity: 1,
    image: "/images/Fossil.webp",
  },
  {
    id: "3",
    name: "Dot",
    description: "It is a long established fact that a reader will be distracted by the readable",
    price: 12000,
    quantity: 1,
    image: "/images/Dot.webp",
  },
]

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
        stroke="#40423D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" fill="#40423D" />
      <path d="M12 16H20" stroke="#FFFEF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" fill="#40423D" />
      <path
        d="M12 16H16M16 16H20M16 16V20M16 16V12"
        stroke="#FFFEF7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CartModal({ isOpen, onClose, items = defaultItems }: CartModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <section className="cart">
      <div className="modal" onClick={onClose}>
        <div className="modal-content bg-bwhite px-32" onClick={(event) => event.stopPropagation()}>
          <div className="modal-header df jcsb mt-32 pb-24">
            <h2 className="text-green">Корзина</h2>
            <button type="button" onClick={onClose} className="close btn-green-sec px-16">
              Закрыть
            </button>
          </div>

          <div className="modal-body df my-32 gap-32 column-dir">
            {items.map((item) => (
              <div key={item.id} className="df gap-32 jcsb order cart-item">
                <div className="df gap-32">
                  <div className="col-4">
                    <Image src={item.image} alt={item.name} width={400} height={400} className="responsive-img-1-1" />
                  </div>
                  <div className="df column-dir jcsb py-16">
                    <div className="df column-dir gap gap-16">
                      <h6 className="text-green">{item.name}</h6>
                      <div className="df column-dir gap-8">
                        <div className="caption text-bw-7">{item.description}</div>
                      </div>
                    </div>
                    <h6 className="text-green">{item.price.toLocaleString("ru-RU")}₽</h6>
                  </div>
                </div>

                <div className="df right jcsb py-16">
                  <div className="df column-dir jcsb aie">
                    <button type="button" className="border-0 bg-transparent p-0">
                      <CloseIcon />
                    </button>
                    <div className="df gap-8 aic">
                      <button type="button" className="border-0 bg-transparent p-0">
                        <MinusIcon />
                      </button>
                      <h6 className="text-green">{item.quantity}</h6>
                      <button type="button" className="border-0 bg-transparent p-0">
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/checkout/personal-info" className="btn-green-sec" onClick={onClose}>
              Перейти к оформлению
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
