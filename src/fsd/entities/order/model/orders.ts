export type OrderStatus = "completed" | "processing" | "canceled" | "pending"

const ORDER_ITEM_PRESETS = {
  edge: {
    name: "Edge",
    image: "/images/Edge.webp",
    description: "Подвесной светильник с мягким рассеянным свечением",
    price: 17400,
  },
  fold: {
    name: "Fold",
    image: "/images/Fold.webp",
    description: "Настенный светильник со сложной геометрией",
    price: 23000,
  },
  sphere: {
    name: "Sphere",
    image: "/images/Sphere.webp",
    description: "Сферический светильник с равномерной засветкой",
    price: 12000,
  },
  threshold: {
    name: "Threshold",
    image: "/images/Threshold.webp",
    description: "Настенный световой акцент для переходных зон",
    price: 12000,
  },
  luna: {
    name: "Настольная лампа LUNA",
    image: "/images/Glow.webp",
    description: "Элегантная настольная лампа с латунным основанием",
    price: 45900,
  },
  aurora: {
    name: "Торшер AURORA",
    image: "/images/Drift.webp",
    description: "Современный торшер с регулируемой яркостью",
    price: 32500,
  },
  cosmos: {
    name: "Люстра COSMOS",
    image: "/images/Flux.webp",
    description: "Дизайнерская люстра с геометрическим каркасом",
    price: 78400,
  },
  stellar: {
    name: "Бра STELLAR",
    image: "/images/Whisper.webp",
    description: "Настенный светильник в стиле минимализм",
    price: 23700,
  },
  bloom: {
    name: "Bloom",
    image: "/images/Bloom.webp",
    description: "Органичный световой объект с мягким свечением",
    price: 12000,
  },
  pebble: {
    name: "Pebble",
    image: "/images/Pebble.webp",
    description: "Компактный акцентный светильник для локальных зон",
    price: 12000,
  },
  haze: {
    name: "Haze",
    image: "/images/Haze.webp",
    description: "Подвесной светильник с атмосферным эффектом дымки",
    price: 12000,
  },
  whisper: {
    name: "Whisper",
    image: "/images/Whisper.webp",
    description: "Деликатное освещение с тонкой геометрией",
    price: 12000,
  },
  drift: {
    name: "Drift",
    image: "/images/Drift.webp",
    description: "Напольный светильник с мягким направленным светом",
    price: 12000,
  },
  flux: {
    name: "Flux",
    image: "/images/Flux.webp",
    description: "Динамичный подвесной светильник с выразительным силуэтом",
    price: 12000,
  },
} as const

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

type OrderItemPresetKey = keyof typeof ORDER_ITEM_PRESETS

function createOrderItem(
  id: string,
  presetKey: OrderItemPresetKey,
  quantity: number,
  status?: string,
  statusClassName?: string
): OrderItem {
  const preset = ORDER_ITEM_PRESETS[presetKey]

  return {
    id,
    image: preset.image,
    name: preset.name,
    description: preset.description,
    price: preset.price,
    quantity,
    status,
    statusClassName,
  }
}

function getOrderTotal(items: OrderItem[], discount?: number) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (!discount) {
    return subtotal
  }

  return Math.round(subtotal * (1 - discount / 100))
}

const pendingOrderItems: OrderItem[] = [
  createOrderItem("item-1", "edge", 2, "Ожидает оплаты", "text-amber-600"),
  createOrderItem("item-2", "fold", 1, "Ожидает оплаты", "text-amber-600"),
  createOrderItem("item-3", "sphere", 2, "Ожидает оплаты", "text-amber-600"),
  createOrderItem("item-4", "threshold", 1, "Ожидает оплаты", "text-amber-600"),
]

const completedOrderItemsOne: OrderItem[] = [
  createOrderItem("item-5", "luna", 1, "Доставлен", "text-emerald-600"),
  createOrderItem("item-6", "fold", 1, "Доставлен", "text-emerald-600"),
  createOrderItem("item-7", "sphere", 1, "Доставлен", "text-emerald-600"),
  createOrderItem("item-8", "threshold", 1, "Доставлен", "text-emerald-600"),
]

const completedOrderItemsTwo: OrderItem[] = [
  createOrderItem("item-9", "aurora", 1, "Получен", "text-emerald-600"),
  createOrderItem("item-10", "bloom", 1, "Получен", "text-emerald-600"),
  createOrderItem("item-11", "drift", 1, "Получен", "text-emerald-600"),
  createOrderItem("item-12", "pebble", 1, "Получен", "text-emerald-600"),
]

const processingOrderItems: OrderItem[] = [
  createOrderItem("item-13", "cosmos", 1, "Передан в доставку", "text-[#007AFF]"),
  createOrderItem("item-14", "haze", 1, "В пути", "text-[#007AFF]"),
  createOrderItem("item-15", "flux", 2, "Передан в доставку", "text-[#007AFF]"),
  createOrderItem("item-16", "whisper", 1, "Передан в доставку", "text-[#007AFF]"),
]

const canceledOrderItems: OrderItem[] = [
  createOrderItem("item-17", "stellar", 1, "Отменён", "text-red-600"),
  createOrderItem("item-18", "pebble", 1, "Отменён", "text-red-600"),
  createOrderItem("item-19", "drift", 1, "Отменён", "text-red-600"),
  createOrderItem("item-20", "threshold", 1, "Отменён", "text-red-600"),
]

export const orders: Order[] = [
  {
    id: "1",
    status: "pending",
    label: "Ожидает оплаты",
    className: "text-amber-600",
    date: "20 марта 2024",
    deliveryMethod: "Самовывоз из ПВЗ",
    deliveryAddress: "г. Москва, ул. Примерная, д. 15, ПВЗ №42",
    total: getOrderTotal(pendingOrderItems, 10),
    discount: 10,
    recipient: "Иванов Иван Иванович",
    phone: "+7 (999) 123-45-67",
    email: "ivanov@email.com",
    paymentMethod: "Онлайн оплата картой",
    items: pendingOrderItems,
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
    total: getOrderTotal(completedOrderItemsOne),
    recipient: "Петров Пётр Петрович",
    phone: "+7 (999) 987-65-43",
    email: "petrov@email.com",
    paymentMethod: "Оплата при получении",
    items: completedOrderItemsOne,
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
    total: getOrderTotal(completedOrderItemsTwo),
    recipient: "Сидорова Анна Викторовна",
    phone: "+7 (999) 111-22-33",
    email: "sidorova@email.com",
    paymentMethod: "Онлайн оплата картой",
    items: completedOrderItemsTwo,
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
    total: getOrderTotal(processingOrderItems),
    recipient: "Козлов Дмитрий Сергеевич",
    phone: "+7 (999) 444-55-66",
    email: "kozlov@email.com",
    paymentMethod: "Оплата при получении",
    comment: "Позвонить за час до доставки",
    items: processingOrderItems,
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
    total: getOrderTotal(canceledOrderItems),
    recipient: "Николаев Николай Николаевич",
    phone: "+7 (999) 777-88-99",
    email: "nikolaev@email.com",
    paymentMethod: "Онлайн оплата картой",
    items: canceledOrderItems,
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
    image: ORDER_ITEM_PRESETS.luna.image,
  },
  {
    id: "2",
    name: "Торшер AURORA",
    price: 32500,
    quantity: 2,
    image: ORDER_ITEM_PRESETS.aurora.image,
  },
]
