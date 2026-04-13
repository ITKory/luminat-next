"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/shared/lib/cn"

interface HeaderProps {
  variant?: "light" | "dark"
  onCartClick?: () => void
}

export function Header({ variant = "light", onCartClick }: HeaderProps) {
  const pathname = usePathname()
  const isDark = variant === "dark"
  const [isSolid, setIsSolid] = useState(pathname !== "/")
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollRef = useRef(0)
  const isProjectsActiveRef = useRef(false)

  const heartIcon = isDark ? "/images/Heart_01_bwhite.svg" : "/images/Heart_01.svg"
  const cartIcon = isDark ? "/images/Shopping_Cart_02_bwhite.svg" : "/images/Shopping_Cart_02.svg"
  const userIcon = isDark ? "/images/User_02_bwhite.svg" : "/images/User_02.svg"
  const linkClass = isDark ? "btn-link-bwhite-sec" : "btn-link-green-sec"

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/catalog", label: "Каталог" },
    { href: "/about", label: "О студии" },
    { href: "/partners", label: "Партнёрам" },
  ]

  useEffect(() => {
    const isHome = pathname === "/"
    const isAbout = pathname === "/about" && isDark
    const enableAnimatedHeader = isHome || isAbout

    if (!enableAnimatedHeader) {
      setIsSolid(true)
      setIsHidden(false)
      return
    }

    lastScrollRef.current = window.pageYOffset

    let sectionObserver: IntersectionObserver | null = null
    if (isHome) {
      const projectsSection = document.getElementById("projects-section")
      if (projectsSection) {
        sectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isProjectsActiveRef.current = entry.isIntersecting
              if (entry.isIntersecting) {
                setIsHidden(true)
              }
            })
          },
          { threshold: 0.5 }
        )
        sectionObserver.observe(projectsSection)
      }
    }

    const onScroll = () => {
      const currentScroll = window.pageYOffset

      if (isHome) {
        const isProjectsActive = isProjectsActiveRef.current

        if (!isProjectsActive) {
          if (currentScroll <= 0) {
            setIsHidden(false)
          } else if (currentScroll > lastScrollRef.current) {
            setIsHidden(true)
          } else {
            setIsHidden(false)
          }
        } else {
          setIsHidden(true)
        }

        setIsSolid(currentScroll > 100)
      } else {
        if (currentScroll <= 0) {
          setIsHidden(false)
        } else if (currentScroll > lastScrollRef.current) {
          setIsHidden(true)
        } else {
          setIsHidden(false)
        }
        setIsSolid(true)
      }

      lastScrollRef.current = currentScroll
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      sectionObserver?.disconnect()
      isProjectsActiveRef.current = false
    }
  }, [isDark, pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[1000] pl-4 pr-4 py-24 border-bottom",
        isHidden && "header-hidden",
        isDark
          ? "bg-green"
          : pathname === "/"
            ? isSolid
              ? "header-solid"
              : "header-transparent"
            : "bg-bwhite"
      )}
    >
      <div className="container-fluid container-32">
        <div className="row align-items-center gx-32">
          <div className="col-6 d-flex align-items-center aic">
            <Link href="/" className={cn("text-decoration-none", isDark ? "text-bwhite" : "text-green")}>
              <p>2025</p>
            </Link>
          </div>

          <div className="col-4 d-flex align-items-center gap-32">
            <nav className="d-flex align-items-center gap-32 ml-16">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  <p>{link.label}</p>
                </Link>
              ))}
            </nav>
          </div>

          <div className="col-2 d-flex justify-content-end gap-3">
            <Link href="/favorites">
              <Image className="icon-md" src={heartIcon} alt="Избранное" width={24} height={24} />
            </Link>
            <button type="button" onClick={onCartClick} className="cursor-pointer border-0 bg-transparent p-0">
              <Image className="icon-md" src={cartIcon} alt="Корзина" width={24} height={24} />
            </button>
            <Link href="/profile">
              <Image className="icon-md" src={userIcon} alt="Профиль" width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
