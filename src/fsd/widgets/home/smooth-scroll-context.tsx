"use client"

import { createContext, useContext } from "react"

export interface SmoothScrollInputHandler {
  id: string
  priority?: number
  onWheel?: (event: WheelEvent) => boolean
  onTouchStart?: (event: TouchEvent) => boolean
  onTouchMove?: (event: TouchEvent) => boolean
  onTouchEnd?: (event: TouchEvent) => boolean
}

interface SmoothScrollContextValue {
  isSmoothScrollEnabled: boolean
  getRenderedScrollY: () => number
  registerInputHandler: (handler: SmoothScrollInputHandler) => () => void
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScrollContext() {
  const context = useContext(SmoothScrollContext)

  if (!context) {
    throw new Error("useSmoothScrollContext must be used within SmoothSectionScroll")
  }

  return context
}
