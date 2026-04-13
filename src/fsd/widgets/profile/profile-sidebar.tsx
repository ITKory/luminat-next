"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarLinks = [
  { href: "/profile", label: "Профиль" },
  { href: "/profile/orders", label: "Мои заказы" },
  { href: "/favorites", label: "Избранное" },
  { href: "/contact", label: "Обратная связь" },
  { href: "/logout", label: "Выход" },
]

interface ProfileSidebarProps {
  title: string
}

export function ProfileSidebar({ title }: ProfileSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="col-3 df column-dir gap-48">
      <h2 className="text-green">{title}</h2>
      <div className="df column-dir gap-32">
        {sidebarLinks.map((link) => (
          <Link key={link.href} href={link.href} className={pathname === link.href ? "btn-link-green-sec" : "btn-link-gray-sec"}>
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
