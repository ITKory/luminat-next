export type OrderStatus = "completed" | "processing" | "canceled" | "pending"

const ORDER_STATUS_CLASS_MAP = {
  completed: "text-[#34C759]",
  pending: "text-[#FF9500]",
  canceled: "text-[#FF3B30]",
  inDelivery: "text-[#007AFF]",
  default: "text-gray",
} as const

export interface OrderItem {
  id: string
  image: string
  name: string
  description?: string
  price: number
  quantity: number
  status?: string
  statusClassName?: string
}

export interface TimelineStep {
  title: string
  date: string
  done: boolean
}

export interface Order {
  id: string
  status: OrderStatus
  label: string
  className: string
  date: string
  deliveryMethod: string
  deliveryAddress: string
  total: number
  discount?: number
  recipient: string
  phone: string
  email: string
  paymentMethod: string
  comment?: string
  items: OrderItem[]
  timeline: TimelineStep[]
}

export const orders: Order[] = [
  {
    id: "1",
    status: "pending",
    label: "Ожидает оплаты",
    className: "text-amber-600",
    date: "20 марта 2024",
    deliveryMethod: "Самовывоз из ПВЗ",
    deliveryAddress: "г. Москва, ул. Примерная, д. 15, ПВЗ №42",
    total: 146125,
    discount: 10,
    recipient: "Иванов Иван Иванович",
    phone: "+7 (999) 123-45-67",
    email: "ivanov@email.com",
    paymentMethod: "Онлайн оплата картой",
    items: [
      {
        id: "item-1",
        image: "/images/products/product-1.webp",
        name: "Edge",
        description: "It is a long established fact that a reader will be distracted by the readable",
        price: 17400,
        quantity: 2,
        status: "Ожидает оплаты",
        statusClassName: "text-amber-600",
      },
      {
        id: "item-2",
        image: "/images/products/product-2.webp",
        name: "Edge",
        description: "It is a long established fact that a reader will be distracted by the readable",
        price: 17400,
        quantity: 2,
        status: "Ожидает оплаты",
        statusClassName: "text-amber-600",
      },
      {
        id: "item-3",
        image: "/images/products/product-3.webp",
        name: "Edge",
        description: "It is a long established fact that a reader will be distracted by the readable",
        price: 17400,
        quantity: 2,
        status: "Ожидает оплаты",
        statusClassName: "text-amber-600",
      },
      {
        id: "item-4",
        image: "/images/products/product-4.webp",
        name: "Edge",
        description: "It is a long established fact that a reader will be distracted by the readable",
        price: 17400,
        quantity: 2,
        status: "Ожидает оплаты",
        statusClassName: "text-amber-600",
      },
    ],
    timeline: [
      { title: "Создан, ожидает оплаты", date: "20 марта 2024", done: true },
      { title: "Оплачен, на сборке", date: "", done: false },
      { title: "Собран и передан в доставку", date: "", done: false },
      { title: "В пути", date: "", done: false },
      { title: "Прибыл на ПВЗ", date: "", done: false },
      { title: "Готов к выдаче", date: "", done: false },
    ],
  },
  {
    id: "2",
    status: "completed",
    label: "Выполнен",
    className: "text-emerald-600",
    date: "15 марта 2024",
    deliveryMethod: "Доставка курьером",
    deliveryAddress: "г. Москва, ул. Ленина, д. 10, кв. 5",
    total: 45900,
    recipient: "Петров Пётр Петрович",
    phone: "+7 (999) 987-65-43",
    email: "petrov@email.com",
    paymentMethod: "Оплата при получении",
    items: [
      {
        id: "item-5",
        image: "/images/products/product-1.webp",
        name: "Настольная лампа LUNA",
        description: "Элегантная настольная лампа с латунным основанием",
        price: 45900,
        quantity: 1,
        status: "Доставлен",
        statusClassName: "text-emerald-600",
      },
    ],
    timeline: [
      { title: "Создан, ожидает оплаты", date: "10 марта 2024", done: true },
      { title: "Оплачен, на сборке", date: "10 марта 2024", done: true },
      { title: "Собран и передан в доставку", date: "12 марта 2024", done: true },
      { title: "В пути", date: "13 марта 2024", done: true },
      { title: "Доставлен", date: "15 марта 2024", done: true },
    ],
  },
  {
    id: "3",
    status: "completed",
    label: "Выполнен",
    className: "text-emerald-600",
    date: "10 марта 2024",
    deliveryMethod: "Самовывоз",
    deliveryAddress: "г. Москва, ТЦ «Мегаполис», пункт выдачи",
    total: 32500,
    recipient: "Сидорова Анна Викторовна",
    phone: "+7 (999) 111-22-33",
    email: "sidorova@email.com",
    paymentMethod: "Онлайн оплата картой",
    items: [
      {
        id: "item-6",
        image: "/images/products/product-2.webp",
        name: "Торшер AURORA",
        description: "Современный торшер с регулируемой яркостью",
        price: 32500,
        quantity: 1,
        status: "Получен",
        statusClassName: "text-emerald-600",
      },
    ],
    timeline: [
      { title: "Создан, ожидает оплаты", date: "5 марта 2024", done: true },
      { title: "Оплачен, на сборке", date: "5 марта 2024", done: true },
      { title: "Собран и передан в доставку", date: "7 марта 2024", done: true },
      { title: "Прибыл на ПВЗ", date: "9 марта 2024", done: true },
      { title: "Получен", date: "10 марта 2024", done: true },
    ],
  },
  {
    id: "4",
    status: "processing",
    label: "В обработке",
    className: "text-amber-600",
    date: "18 марта 2024",
    deliveryMethod: "Доставка курьером",
    deliveryAddress: "г. Санкт-Петербург, Невский пр., д. 100",
    total: 78400,
    recipient: "Козлов Дмитрий Сергеевич",
    phone: "+7 (999) 444-55-66",
    email: "kozlov@email.com",
    paymentMethod: "Оплата при получении",
    comment: "Позвонить за час до доставки",
    items: [
      {
        id: "item-7",
        image: "/images/products/product-3.webp",
        name: "Люстра COSMOS",
        description: "Дизайнерская люстра с геометрическим каркасом",
        price: 78400,
        quantity: 1,
        status: "На сборке",
        statusClassName: "text-amber-600",
      },
    ],
    timeline: [
      { title: "Создан, ожидает оплаты", date: "18 марта 2024", done: true },
      { title: "Оплачен, на сборке", date: "18 марта 2024", done: true },
      { title: "Собран и передан в доставку", date: "", done: false },
      { title: "В пути", date: "", done: false },
      { title: "Доставлен", date: "", done: false },
    ],
  },
  {
    id: "5",
    status: "canceled",
    label: "Отменён",
    className: "text-red-600",
    date: "5 марта 2024",
    deliveryMethod: "Доставка курьером",
    deliveryAddress: "г. Москва, ул. Тверская, д. 25",
    total: 23700,
    recipient: "Николаев Николай Николаевич",
    phone: "+7 (999) 777-88-99",
    email: "nikolaev@email.com",
    paymentMethod: "Онлайн оплата картой",
    items: [
      {
        id: "item-8",
        image: "/images/products/product-4.webp",
        name: "Бра STELLAR",
        description: "Настенный светильник в стиле минимализм",
        price: 23700,
        quantity: 1,
        status: "Отменён",
        statusClassName: "text-red-600",
      },
    ],
    timeline: [
      { title: "Создан, ожидает оплаты", date: "3 марта 2024", done: true },
      { title: "Отменён", date: "5 марта 2024", done: true },
    ],
  },
]

export const sortOptions: { key: OrderStatus; label: string }[] = [
  { key: "completed", label: "Выполненные" },
  { key: "processing", label: "В обработке" },
  { key: "canceled", label: "Отменённые" },
  { key: "pending", label: "Ожидают оплаты" },
]

export function getOrderStatusClass(status?: string, fallbackClassName?: string) {
  if (!status) {
    return fallbackClassName ?? ORDER_STATUS_CLASS_MAP.default
  }

  const normalizedStatus = status.toLowerCase()

  if (
    normalizedStatus.includes("отмен") ||
    normalizedStatus === "canceled" ||
    normalizedStatus === "cancelled"
  ) {
    return ORDER_STATUS_CLASS_MAP.canceled
  }

  if (
    normalizedStatus.includes("выполн") ||
    normalizedStatus.includes("доставлен") ||
    normalizedStatus.includes("получ") ||
    normalizedStatus === "completed"
  ) {
    return ORDER_STATUS_CLASS_MAP.completed
  }

  if (
    normalizedStatus.includes("передан в доставку") ||
    normalizedStatus.includes("в пути") ||
    normalizedStatus.includes("в доставк") ||
    normalizedStatus.includes("прибыл") ||
    normalizedStatus.includes("готов к выдаче") ||
    normalizedStatus === "in-delivery"
  ) {
    return ORDER_STATUS_CLASS_MAP.inDelivery
  }

  if (
    normalizedStatus.includes("ожида") ||
    normalizedStatus.includes("сборк") ||
    normalizedStatus.includes("обработ") ||
    normalizedStatus === "pending" ||
    normalizedStatus === "processing"
  ) {
    return ORDER_STATUS_CLASS_MAP.pending
  }

  return fallbackClassName ?? ORDER_STATUS_CLASS_MAP.default
}

export function getOrderById(orderId: string): Order | undefined {
  return orders.find((order) => order.id === orderId)
}

export interface CheckoutItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export const checkoutItems: CheckoutItem[] = [
  {
    id: "1",
    name: "Настольная лампа LUNA",
    price: 45900,
    quantity: 1,
    image: "/images/products/product-1.webp",
  },
  {
    id: "2",
    name: "Торшер AURORA",
    price: 32500,
    quantity: 2,
    image: "/images/products/product-2.webp",
  },
]
