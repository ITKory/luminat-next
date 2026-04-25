"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/shared/lib/cn"

interface HeaderProps {
  variant?: "light" | "dark"
  onCartClick?: () => void
}

export function Header({ variant = "light", onCartClick }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isDark = variant === "dark"
  const [isSolid, setIsSolid] = useState(pathname !== "/")
  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCompactViewport, setIsCompactViewport] = useState(false)
  const lastScrollRef = useRef(10)
  const isProjectsActiveRef = useRef(false)
  const isSplitHomeHeader = pathname === "/" && !isSolid && !isCompactViewport && !isDark
  const isLightChrome = isDark || (pathname === "/" && !isSolid && !isSplitHomeHeader)

  const heartIcon = isLightChrome ? "/images/Heart_01_bwhite.svg" : "/images/Heart_01.svg"
  const cartIcon = isLightChrome ? "/images/Shopping_Cart_02_bwhite.svg" : "/images/Shopping_Cart_02.svg"
  const userIcon = isLightChrome ? "/images/User_02_bwhite.svg" : "/images/User_02.svg"
  const dateClass = isSplitHomeHeader ? "text-bwhite" : isLightChrome ? "text-bwhite" : "text-green"
  const linkClass = isSplitHomeHeader ? "btn-link-green-sec" : isLightChrome ? "btn-link-bwhite-sec" : "btn-link-green-sec"

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/catalog", label: "Каталог" },
    { href: "/about", label: "О студии" },
    { href: "/partners", label: "Партнёрам" },
  ]

  const handleCartAction = () => {
    setIsMenuOpen(false)

    if (onCartClick) {
      onCartClick()
      return
    }

    router.push("/checkout")
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px), (pointer: coarse)")
    const updateViewport = () => setIsCompactViewport(mediaQuery.matches)

    updateViewport()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateViewport)
      return () => mediaQuery.removeEventListener("change", updateViewport)
    }

    mediaQuery.addListener(updateViewport)
    return () => mediaQuery.removeListener(updateViewport)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      setIsHidden(false)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const isHome = pathname === "/"
    const isAbout = pathname === "/about" && isDark
    const enableAnimatedHeader = isHome || isAbout
    const projectsSection = isHome ? document.getElementById("projects-section") : null

    if (isCompactViewport) {
      setIsSolid(true)
      setIsHidden(false)
      return
    }

    if (!enableAnimatedHeader) {
      setIsSolid(true)
      setIsHidden(false)
      return
    }

    lastScrollRef.current = window.pageYOffset

    const onScroll = () => {
      const currentScroll = window.pageYOffset

      if (projectsSection) {
          const rect = projectsSection.getBoundingClientRect()
          const middle = window.innerHeight / 2
          isProjectsActiveRef.current = rect.top <= middle && rect.bottom >= middle
        } else {
          isProjectsActiveRef.current = false
        }

        const isProjectsActive = isProjectsActiveRef.current

        if (isProjectsActive) {
          setIsHidden(true)
        } else if (currentScroll <= 0) {
          setIsHidden(false)
        } else if (currentScroll > lastScrollRef.current) {
          setIsHidden(true)
        } else {
          setIsHidden(false)
        }

        setIsSolid(currentScroll > 100)

      lastScrollRef.current = currentScroll
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      isProjectsActiveRef.current = false
    }
  }, [isCompactViewport, isDark, pathname])

  function HeaderActions({ className }: { className?: string }) {
    return (
      <div className={cn("header-actions", className)}>
        <Link
          href="/favorites"
          className="header-icon-link p-2 -m-2"
          aria-label="Избранное"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image className="icon-md" src={heartIcon} alt="Избранное" width={24} height={24} />
        </Link>
        <button
          type="button"
          onClick={handleCartAction}
          className="header-icon-button cursor-pointer border-0 bg-transparent p-2 -m-2"
          aria-label="Корзина"
        >
          <Image className="icon-md" src={cartIcon} alt="Корзина" width={24} height={24} />
        </button>
        <Link
          href="/profile"
          className="header-icon-link p-2 -m-2"
          aria-label="Профиль"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image className="icon-md" src={userIcon} alt="Профиль" width={24} height={24} />
        </Link>
      </div>
    )
  }

  return (
    <header
      className={cn(
        "site-header fixed top-0 left-0 right-0 z-[1000] border-bottom",
        isHidden && "header-hidden",
        "header-split-home",
        isDark
          ? "bg-green"
          : pathname === "/"
            ? isSolid
              ? "header-solid"
              : "header-transparent"
            : "bg-bwhite"
      )}
    >
      <div className="container-fluid container-32 header-shell">
        <div className="header-top">
          <Link href="/" className={cn("text-decoration-none", dateClass)}>
            <p>2025</p>
          </Link>

          <div className="header-top-right">
            <HeaderActions className="header-mobile-actions" />

            <button
              type="button"
              className={cn("header-menu-button", isLightChrome ? "text-bwhite" : "text-green", isMenuOpen && "is-open")}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-controls="site-navigation"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={cn("header-content", isMenuOpen && "is-open")}>
          <nav id="site-navigation" className="header-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(linkClass, "header-link", pathname === link.href && "header-link-active")}
              >
                <p>{link.label}</p>
              </Link>
            ))}
          </nav>

          <HeaderActions />
        </div>
      </div>
    </header>
  )
}
