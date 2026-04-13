export interface Collection {
  id: string
  name: string
  image: string
  aspectRatio: "1:1" | "3:4" | "4:3"
}

export const collections: Collection[] = [
  { id: "pendant", name: "Подвесные светильники", image: "/images/подвесные.png", aspectRatio: "1:1" },
  { id: "wall", name: "Настенные светильники", image: "/images/настенные.png", aspectRatio: "3:4" },
  { id: "floor", name: "Напольные светильники", image: "/images/напольные.png", aspectRatio: "4:3" },
  { id: "track", name: "Споты и треки", image: "/images/споты_и_треки.png", aspectRatio: "4:3" },
  { id: "outdoor", name: "Уличное освещение", image: "/images/уличные.png", aspectRatio: "4:3" },
  { id: "art", name: "Авторские инсталляции", image: "/images/авторские.png", aspectRatio: "3:4" },
]
