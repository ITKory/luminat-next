"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    scrollToNextSection?: () => void
    scrollToPrevSection?: () => void
  }
}

export function SmoothSectionScroll() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[data-snap-section="true"]')
    )

    if (sections.length === 0) {
      return
    }

    let currentIdx = 0

    let isScrolling = false
    let touchStartY = 0
    let unlockTimer: ReturnType<typeof setTimeout> | null = null
    const projectsSection = document.getElementById("projects-section")
    const previousOverflow = document.body.style.overflow

    const updateCurrentIndex = () => {
      const probeLine = 140
      const sectionAtProbe = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= probeLine && rect.bottom > probeLine
      })

      if (sectionAtProbe >= 0) {
        currentIdx = sectionAtProbe
        return
      }

      const closestSection = sections.reduce(
        (best, section, index) => {
          const distance = Math.abs(section.getBoundingClientRect().top)
          if (distance < best.distance) {
            return { index, distance }
          }
          return best
        },
        { index: 0, distance: Number.POSITIVE_INFINITY }
      )

      currentIdx = closestSection.index
    }

    const scrollToSection = (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= sections.length || isScrolling) {
        return
      }

      isScrolling = true
      if (unlockTimer) {
        clearTimeout(unlockTimer)
      }

      sections[nextIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      currentIdx = nextIndex

      unlockTimer = setTimeout(() => {
        isScrolling = false
      }, 800)
    }

    const isProjectsSectionActive = () => {
      if (!projectsSection) {
        return false
      }

      const rect = projectsSection.getBoundingClientRect()
      const middle = window.innerHeight / 2
      return rect.top <= middle && rect.bottom >= middle
    }

    const onWheel = (event: WheelEvent) => {
      const inProjectsSection = projectsSection &&
        ((event.target instanceof Node && projectsSection.contains(event.target)) ||
          projectsSection.matches(":hover") ||
          isProjectsSectionActive())

      if (isScrolling || inProjectsSection) {
        return
      }

      if (Math.abs(event.deltaY) < 8) {
        return
      }

      event.preventDefault()
      updateCurrentIndex()

      if (event.deltaY > 0) {
        scrollToSection(currentIdx + 1)
      } else {
        scrollToSection(currentIdx - 1)
      }
    }

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const onTouchEnd = (event: TouchEvent) => {
      const inProjectsSection = projectsSection &&
        ((event.target instanceof Node && projectsSection.contains(event.target)) ||
          isProjectsSectionActive())

      if (isScrolling || inProjectsSection) {
        return
      }

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY
      const diff = touchStartY - touchEndY

      if (Math.abs(diff) < 50) {
        return
      }

      updateCurrentIndex()
      if (diff > 0) {
        scrollToSection(currentIdx + 1)
      } else {
        scrollToSection(currentIdx - 1)
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: false })
    document.body.style.overflow = "hidden"

    window.scrollToNextSection = () => {
      updateCurrentIndex()
      scrollToSection(currentIdx + 1)
    }
    window.scrollToPrevSection = () => {
      updateCurrentIndex()
      scrollToSection(currentIdx - 1)
    }

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)

      if (unlockTimer) {
        clearTimeout(unlockTimer)
      }

      window.scrollToNextSection = undefined
      window.scrollToPrevSection = undefined
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return null
}
