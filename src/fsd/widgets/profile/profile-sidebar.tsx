"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/shared/lib/cn"

const sidebarItems = [
  { href: "/profile", label: "Профиль" },
  { href: "/profile/orders", label: "Мои заказы" },
  { href: "/favorites", label: "Избранное" },
  { href: "/#contact-section", label: "Обратная связь" },
]

interface ProfileSidebarProps {
  title: string
}

export function ProfileSidebar({ title }: ProfileSidebarProps) {
  const pathname = usePathname()

  return (
      <aside className="flex w-full shrink-0 flex-col gap-8 lg:w-72 lg:gap-12">
        <h4 className=" leading-none text-green md:text-5xl">
          {title}
        </h4>
        <nav className="flex flex-col gap-4 lg:gap-6 mt-10">
          {sidebarItems.map((link) => (
              <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                      "inline-flex  w-full items-center border-b border-transparent text-base transition-colors md:text-lg lg:w-fit",
                      pathname === link.href
                          ? "border-current text-green"
                          : "text-gray hover:border-[rgba(81,88,98,0.36)] hover:text-green"
                  )}
              >
                {link.label}
              </Link>
          ))}
          <button
              type="button"
              className="inline-flex min-h-10 w-full items-center border-b border-transparent py-1 text-left text-base text-gray transition-colors  md:text-lg lg:w-fit"
          >
            Выход
          </button>
        </nav>
      </aside>
  )
}
