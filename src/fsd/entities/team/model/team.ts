export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
}

export const team: TeamMember[] = [
  { id: "1", name: "Катя", role: "Арт-директор", image: "/images/kate.webp" },
  { id: "2", name: "Марат", role: "Светотехник / инженер", image: "/images/marat.webp" },
  { id: "3", name: "Ира", role: "Концепт-дизайнер", image: "/images/ira.webp" },
  { id: "4", name: "Рома", role: "Продюсер проектов", image: "/images/roma.webp" },
]
