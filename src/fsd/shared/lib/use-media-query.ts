"use client"

import { useCallback, useSyncExternalStore } from "react"

export const DESKTOP_MEDIA_QUERY = "(min-width: 1025px) and (pointer: fine)"
export const PROJECTS_INTERACTIVE_MEDIA_QUERY = "(min-width: 769px)"
export const REDUCED_MOTION_MEDIA_QUERY = "(prefers-reduced-motion: reduce)"

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") {
        return () => {}
      }

      const mediaQuery = window.matchMedia(query)

      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", onStoreChange)
        return () => mediaQuery.removeEventListener("change", onStoreChange)
      }

      mediaQuery.addListener(onStoreChange)
      return () => mediaQuery.removeListener(onStoreChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.matchMedia(query).matches
  }, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export function useSmoothScrollEnabled() {
  const isDesktopViewport = useMediaQuery(DESKTOP_MEDIA_QUERY)
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_MEDIA_QUERY)

  return isDesktopViewport && !prefersReducedMotion
}
