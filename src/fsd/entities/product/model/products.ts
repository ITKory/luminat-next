export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  type: string
  style: string
  material: string
  temperature: string
}

export interface ProductPreview {
  name: string
  price: number
  image: string
}

export const products: Product[] = [
  {
    id: "oval-001",
    name: "Oval.001",
    description: "Минималистичный подвесной светильник с мягким рассеянным светом",
    price: 12000,
    image: "/images/Oval.001.webp",
    category: "pendant",
    type: "Подвесные",
    style: "Минимализм",
    material: "Металл",
    temperature: "Тёплый",
  },
  {
    id: "fold",
    name: "Fold",
    description: "Настенный светильник со сложной геометрией",
    price: 23000,
    image: "/images/Fold.webp",
    category: "wall",
    type: "Настенные",
    style: "Концептуальный",
    material: "Металл",
    temperature: "Нейтральный",
  },
  {
    id: "flux",
    name: "Flux",
    description: "Динамичный светильник с изменяемой формой",
    price: 12000,
    image: "/images/Flux.webp",
    category: "pendant",
    type: "Подвесные",
    style: "Модерн",
    material: "Стекло",
    temperature: "Холодный",
  },
  {
    id: "blur",
    name: "Blur",
    description: "Светильник с эффектом размытия света",
    price: 12000,
    image: "/images/Blur.webp",
    category: "pendant",
    type: "Подвесные",
    style: "Арт-деко",
    material: "Стекло",
    temperature: "Тёплый",
  },
  {
    id: "fossil",
    name: "Fossil",
    description: "Органические формы, вдохновлённые природой",
    price: 12000,
    image: "/images/Fossil.webp",
    category: "floor",
    type: "Напольные",
    style: "Концептуальный",
    material: "Бетон",
    temperature: "Нейтральный",
  },
  {
    id: "dot",
    name: "Dot",
    description: "Точечный акцентный светильник",
    price: 12000,
    image: "/images/Dot.webp",
    category: "track",
    type: "Трековые / споты",
    style: "Минимализм",
    material: "Металл",
    temperature: "RGB / настраиваемый",
  },
  {
    id: "crack",
    name: "Crack",
    description: "Лаконичная форма и направленный акцентный свет",
    price: 12000,
    image: "/images/Crack.webp",
    category: "wall",
    type: "Настенные",
    style: "Концептуальный",
    material: "Металл",
    temperature: "Нейтральный",
  },
  {
    id: "layer",
    name: "Layer",
    description: "Многослойная световая композиция",
    price: 12000,
    image: "/images/Layer.webp",
    category: "pendant",
    type: "Подвесные",
    style: "Модерн",
    material: "Стекло",
    temperature: "Тёплый",
  },
  {
    id: "ash",
    name: "Ash",
    description: "Текстурный светильник с мягким рассеиванием",
    price: 12000,
    image: "/images/Ash.webp",
    category: "floor",
    type: "Напольные",
    style: "Арт-деко",
    material: "Бетон",
    temperature: "Нейтральный",
  },
  {
    id: "rift",
    name: "Rift",
    description: "Геометричная форма для акцентного света",
    price: 12000,
    image: "/images/Rift.webp",
    category: "track",
    type: "Трековые / споты",
    style: "Минимализм",
    material: "Металл",
    temperature: "Холодный",
  },
  {
    id: "void",
    name: "Void",
    description: "Глубокая форма и направленный световой поток",
    price: 12000,
    image: "/images/Void.webp",
    category: "pendant",
    type: "Подвесные",
    style: "Концептуальный",
    material: "Металл",
    temperature: "Нейтральный",
  },
  {
    id: "mold",
    name: "Mold",
    description: "Скульптурный светильник с выразительным объёмом",
    price: 23000,
    image: "/images/Mold.webp",
    category: "art",
    type: "Инсталляции",
    style: "Концептуальный",
    material: "Бетон",
    temperature: "Тёплый",
  },
  {
    id: "threshold",
    name: "Threshold",
    description: "Светильник для мягкого перехода между зонами",
    price: 12000,
    image: "/images/Threshold.webp",
    category: "wall",
    type: "Настенные",
    style: "Модерн",
    material: "Металл",
    temperature: "Нейтральный",
  },
  {
    id: "pulse",
    name: "Pulse",
    description: "Ритмичная форма с выразительной световой линией",
    price: 12000,
    image: "/images/Pulse.webp",
    category: "pendant",
    type: "Подвесные",
    style: "Ретро-футуризм",
    material: "Стекло",
    temperature: "Холодный",
  },
  {
    id: "dome",
    name: "Dome",
    description: "Купольный светильник для мягкого освещения",
    price: 12000,
    image: "/images/Dome.webp",
    category: "pendant",
    type: "Подвесные",
    style: "Минимализм",
    material: "Металл",
    temperature: "Тёплый",
  },
  {
    id: "whisper",
    name: "Whisper",
    description: "Деликатное освещение с тонкой геометрией",
    price: 12000,
    image: "/images/Whisper.webp",
    category: "wall",
    type: "Настенные",
    style: "Минимализм",
    material: "Стекло",
    temperature: "Нейтральный",
  },
  {
    id: "mist",
    name: "Mist",
    description: "Полупрозрачный световой акцент",
    price: 12000,
    image: "/images/Mist.webp",
    category: "wall",
    type: "Настенные",
    style: "Арт-деко",
    material: "Стекло",
    temperature: "Холодный",
  },
  {
    id: "drift",
    name: "Drift",
    description: "Динамичный корпус и мягкий рассеянный свет",
    price: 12000,
    image: "/images/Drift.webp",
    category: "floor",
    type: "Напольные",
    style: "Модерн",
    material: "Металл",
    temperature: "Нейтральный",
  },
  {
    id: "haze",
    name: "Haze",
    description: "Атмосферный свет с эффектом дымки",
    price: 12000,
    image: "/images/Haze.webp",
    category: "pendant",
    type: "Подвесные",
    style: "Концептуальный",
    material: "Стекло",
    temperature: "Тёплый",
  },
  {
    id: "bloom",
    name: "Bloom",
    description: "Органичная форма с равномерной засветкой",
    price: 12000,
    image: "/images/Bloom.webp",
    category: "art",
    type: "Инсталляции",
    style: "Арт-деко",
    material: "Текстиль",
    temperature: "Тёплый",
  },
  {
    id: "pebble",
    name: "Pebble",
    description: "Компактный светильник для акцентных зон",
    price: 12000,
    image: "/images/Pebble.webp",
    category: "track",
    type: "Трековые / споты",
    style: "Минимализм",
    material: "Металл",
    temperature: "Холодный",
  },
  {
    id: "quanto",
    name: "Quanto",
    description: "Световой модуль с выразительным контуром",
    price: 12000,
    image: "/images/Quanto.webp",
    category: "pendant",
    type: "Подвесные",
    style: "Ретро-футуризм",
    material: "Металл",
    temperature: "Нейтральный",
  },
  {
    id: "sphere",
    name: "Sphere",
    description: "Сферический светильник с рассеянным свечением",
    price: 12000,
    image: "/images/Sphere.webp",
    category: "pendant",
    type: "Подвесные",
    style: "Модерн",
    material: "Стекло",
    temperature: "Тёплый",
  },
]

export const filterOptions = {
  categories: ["Подвесные", "Настенные", "Настольные", "Трековые / споты", "Уличные", "Инсталляции", "Кастом / на заказ"],
  types: ["Подвесные", "Настенные", "Настольные", "Напольные", "Инсталляции"],
  styles: ["Минимализм", "Арт-деко", "Концептуальный", "Модерн", "Ретро-футуризм"],
  spaces: ["Жилое", "Публичное", "Улица", "Галерея / арт"],
  materials: ["Металл", "Стекло", "Текстиль", "Бетон", "Дерево"],
  temperatures: ["Тёплый", "Нейтральный", "Холодный", "RGB / настраиваемый"],
} as const

export const rawProductNames = [
  "Edge",
  "Mold",
  "Threshold",
  "Blur",
  "Crack",
  "Layer",
  "Ash",
  "Fossil",
  "Rift",
  "Void",
] as const

export const softModernProductNames = [
  "Oval.001",
  "Fold",
  "Pulse",
  "Dome",
  "Whisper",
  "Mist",
  "Drift",
  "Haze",
  "Bloom",
  "Pebble",
  "Quanto",
  "Sphere",
] as const

export const favoriteProductNames = ["Oval.001", "Fold", "Flux"] as const

const fallbackProductPreviews: Record<string, ProductPreview> = {
  Edge: { name: "Edge", price: 12000, image: "/images/Edge.webp" },
}

const productPreviewByName = new Map(
  products.map((product) => [
    product.name,
    { name: product.name, price: product.price, image: product.image },
  ])
)

export function getProductPreviews(names: readonly string[]): ProductPreview[] {
  return names.map((name) => {
    const productPreview = productPreviewByName.get(name) ?? fallbackProductPreviews[name]

    if (!productPreview) {
      throw new Error(`Unknown product preview: ${name}`)
    }

    return productPreview
  })
}
