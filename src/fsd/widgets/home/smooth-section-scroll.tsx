"use client"

import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { useSmoothScrollEnabled } from "@/shared/lib/use-media-query"
import {
  SmoothScrollContext,
  type SmoothScrollInputHandler,
} from "@/widgets/home/smooth-scroll-context"

interface SmoothSectionScrollProps {
  children: ReactNode
}

const SMOOTH_SCROLL_SPRING = {
  stiffness: 180,
  damping: 32,
  mass: 0.2,
}

function sortHandlers(handlers: Map<string, SmoothScrollInputHandler>) {
  return [...handlers.values()].sort((left, right) => (right.priority ?? 0) - (left.priority ?? 0))
}

export function SmoothSectionScroll({ children }: SmoothSectionScrollProps) {
  const isSmoothScrollEnabled = useSmoothScrollEnabled()
  const contentRef = useRef<HTMLDivElement | null>(null)
  const handlersRef = useRef(new Map<string, SmoothScrollInputHandler>())
  const [contentHeight, setContentHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const { scrollY } = useScroll({ trackContentSize: true })
  const smoothScrollY = useSpring(scrollY, SMOOTH_SCROLL_SPRING)
  const y = useTransform(smoothScrollY, (value) => {
    const maxScrollTop = Math.max(contentHeight - viewportHeight, 0)
    const clampedValue = Math.min(Math.max(value, 0), maxScrollTop)
    return clampedValue * -1
  })

  const registerInputHandler = useCallback((handler: SmoothScrollInputHandler) => {
    handlersRef.current.set(handler.id, handler)

    return () => {
      handlersRef.current.delete(handler.id)
    }
  }, [])

  const getRenderedScrollY = useCallback(() => {
    return isSmoothScrollEnabled ? smoothScrollY.get() : window.scrollY
  }, [isSmoothScrollEnabled, smoothScrollY])

  useEffect(() => {
    const dispatchWheel = (event: WheelEvent) => {
      const handlers = sortHandlers(handlersRef.current)

      for (const handler of handlers) {
        if (!handler.onWheel) {
          continue
        }

        if (handler.onWheel(event)) {
          event.preventDefault()
          return
        }
      }
    }

    const dispatchTouch = (
      method: "onTouchStart" | "onTouchMove" | "onTouchEnd",
      event: TouchEvent
    ) => {
      const handlers = sortHandlers(handlersRef.current)

      for (const handler of handlers) {
        const listener = handler[method]
        if (!listener) {
          continue
        }

        if (listener(event)) {
          event.preventDefault()
          return
        }
      }
    }

    const onWheel = (event: WheelEvent) => dispatchWheel(event)
    const onTouchStart = (event: TouchEvent) => dispatchTouch("onTouchStart", event)
    const onTouchMove = (event: TouchEvent) => dispatchTouch("onTouchMove", event)
    const onTouchEnd = (event: TouchEvent) => dispatchTouch("onTouchEnd", event)

    window.addEventListener("wheel", onWheel, { capture: true, passive: false })
    window.addEventListener("touchstart", onTouchStart, { capture: true, passive: false })
    window.addEventListener("touchmove", onTouchMove, { capture: true, passive: false })
    window.addEventListener("touchend", onTouchEnd, { capture: true, passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel, true)
      window.removeEventListener("touchstart", onTouchStart, true)
      window.removeEventListener("touchmove", onTouchMove, true)
      window.removeEventListener("touchend", onTouchEnd, true)
    }
  }, [])

  useEffect(() => {
    if (!isSmoothScrollEnabled) {
      return
    }

    smoothScrollY.jump(scrollY.get())
  }, [isSmoothScrollEnabled, scrollY, smoothScrollY])

  useLayoutEffect(() => {
    if (!isSmoothScrollEnabled) {
      setContentHeight(0)
      return
    }

    const contentNode = contentRef.current
    if (!contentNode) {
      return
    }

    const updateHeight = () => {
      const nextViewportHeight = window.innerHeight
      const nextHeight = Math.max(contentNode.scrollHeight, window.innerHeight)

      setViewportHeight(nextViewportHeight)
      setContentHeight(nextHeight)

      const maxScrollTop = Math.max(nextHeight - nextViewportHeight, 0)
      if (window.scrollY > maxScrollTop) {
        window.scrollTo({ top: maxScrollTop })
      }
    }

    updateHeight()

    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(contentNode)
    window.addEventListener("resize", updateHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateHeight)
    }
  }, [isSmoothScrollEnabled])

  const contextValue = useMemo(
    () => ({
      isSmoothScrollEnabled,
      getRenderedScrollY,
      registerInputHandler,
    }),
    [getRenderedScrollY, isSmoothScrollEnabled, registerInputHandler]
  )

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {isSmoothScrollEnabled ? (
        <>
          <div aria-hidden className="smooth-scroll-spacer" style={{ height: contentHeight }} />
          <div className="smooth-scroll-frame">
            <motion.div ref={contentRef} className="smooth-scroll-content " style={{ y }}>
              {children}
            </motion.div>
          </div>
        </>
      ) : children}
    </SmoothScrollContext.Provider>
  )
}
