"use client"

import { type RefObject, useEffect, useMemo, useRef, useState } from "react"
import { projects } from "@/entities/project/model/projects"
import {
  PROJECTS_INTERACTIVE_MEDIA_QUERY,
  REDUCED_MOTION_MEDIA_QUERY,
  useMediaQuery,
} from "@/shared/lib/use-media-query"
import { useSmoothScrollContext } from "@/widgets/home/smooth-scroll-context"

const ANIMATION_DURATION = 520
const WHEEL_THRESHOLD = 72
const TOUCH_THRESHOLD = 56
const SNAP_TRIGGER_RATIO = 0.42
const SNAP_BACKTRACK_RATIO = 0.22
const SNAP_TIMEOUT = 850
const SNAP_COOLDOWN = 260
const SECTION_IN_VIEW_RATIO = 0.35
const SECTION_RESET_RATIO = 0.12
const SECTION_ANCHOR_TOLERANCE = 24
const SECTION_EXIT_MARGIN_RATIO = 0.1
// Downward release must clear the snap backtrack window, otherwise the section can re-snap.
const SECTION_DOWN_EXIT_MIN_OFFSET_RATIO = SNAP_BACKTRACK_RATIO + 0.04

function getDirectionFromDelta(delta: number): 1 | -1 {
  return delta > 0 ? 1 : -1
}

export function useProjectsScrollController(sectionRef: RefObject<HTMLElement | null>) {
  const { getRenderedScrollY, registerInputHandler } = useSmoothScrollContext()

  const rawIsInteractive = useMediaQuery(PROJECTS_INTERACTIVE_MEDIA_QUERY)
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_MEDIA_QUERY)

  const [mounted, setMounted] = useState(false)
  const isInteractive = mounted && rawIsInteractive

  const [activeProject, setActiveProject] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const activeProjectRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const isProjectsInViewRef = useRef(false)
  const touchStartYRef = useRef(0)
  const isTouchLockedRef = useRef(false)
  const touchMovedProjectRef = useRef(false)
  const wheelDeltaRef = useRef(0)
  const wheelDirectionRef = useRef<1 | -1 | 0>(0)
  const wheelResetTimerRef = useRef<number | null>(null)
  const animationTimerRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)
  const isSnapPendingRef = useRef(false)
  const isPinnedRef = useRef(false)
  const snapCooldownUntilRef = useRef(0)
  const snapRafRef = useRef<number | null>(null)
  const snapTimeoutRef = useRef<number | null>(null)
  const lockedScrollYRef = useRef(0)
  const isPageLockedRef = useRef(false)
  const boundaryExitDirectionRef = useRef<1 | -1 | 0>(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getSectionRect = () => {
    return sectionRef.current?.getBoundingClientRect() ?? null
  }

  const setProjectsChromeState = (isActive: boolean) => {
    document.body.dataset.projectsActive = isActive ? "true" : "false"
  }

  const clearSnapWatch = () => {
    if (snapRafRef.current) {
      window.cancelAnimationFrame(snapRafRef.current)
      snapRafRef.current = null
    }

    if (snapTimeoutRef.current) {
      window.clearTimeout(snapTimeoutRef.current)
      snapTimeoutRef.current = null
    }
  }

  const finishSnap = () => {
    clearSnapWatch()
    isSnapPendingRef.current = false
    snapCooldownUntilRef.current = Date.now() + SNAP_COOLDOWN
  }

  const resetWheelState = () => {
    wheelDeltaRef.current = 0
    wheelDirectionRef.current = 0

    if (wheelResetTimerRef.current) {
      window.clearTimeout(wheelResetTimerRef.current)
      wheelResetTimerRef.current = null
    }
  }

  const getSectionAnchorScrollY = () => {
    const rect = getSectionRect()
    if (!rect) {
      return null
    }

    return Math.max(getRenderedScrollY() + rect.top, 0)
  }

  const isSectionAnchored = (tolerance = 2) => {
    const rect = getSectionRect()
    return rect ? Math.abs(rect.top) <= tolerance : false
  }

  const isProjectsActive = () => {
    const rect = getSectionRect()
    if (!rect) {
      return false
    }

    const middle = window.innerHeight / 2
    return rect.top <= middle && rect.bottom >= middle
  }

  const isSectionVisibleForLock = () => {
    const rect = getSectionRect()
    if (!rect) {
      return false
    }

    const exitMargin = window.innerHeight * SECTION_EXIT_MARGIN_RATIO
    return rect.bottom > exitMargin && rect.top < window.innerHeight - exitMargin
  }

  const hasPinnedProjectsLock = () => {
    return (
      isInteractive &&
      boundaryExitDirectionRef.current === 0 &&
      isProjectsInViewRef.current &&
      isSectionVisibleForLock() &&
      (isPinnedRef.current || isSnapPendingRef.current)
    )
  }

  const hasSectionExitedViewport = (direction: 1 | -1) => {
    const rect = getSectionRect()
    if (!rect) {
      return true
    }

    if (direction > 0) {
      const downExitOffset =
        window.innerHeight *
        Math.max(SECTION_EXIT_MARGIN_RATIO, SECTION_DOWN_EXIT_MIN_OFFSET_RATIO)

      return rect.top <= -downExitOffset
    }

    const upExitOffset = window.innerHeight * SECTION_EXIT_MARGIN_RATIO
    return rect.top >= upExitOffset
  }

  const shouldHideHeader = () => {
    return isInteractive && isSectionVisibleForLock()
  }

  const shouldEnforcePageLock = () => {
    return (
      hasPinnedProjectsLock() &&
      !isSnapPendingRef.current &&
      (isProjectsActive() || isSectionAnchored(SECTION_ANCHOR_TOLERANCE))
    )
  }

  const isBoundaryExit = (direction: 1 | -1) => {
    if (
      !isInteractive ||
      !isProjectsInViewRef.current ||
      (!hasPinnedProjectsLock() &&
        (!isProjectsActive() || !isSectionAnchored(SECTION_ANCHOR_TOLERANCE)))
    ) {
      return false
    }

    const current = activeProjectRef.current
    return (
      (direction > 0 && current === projects.length - 1) ||
      (direction < 0 && current === 0)
    )
  }

  const getBoundaryReleaseScrollTarget = (direction: 1 | -1) => {
    const anchorScrollY = getSectionAnchorScrollY()
    if (anchorScrollY === null) {
      return null
    }

    if (direction > 0) {
      const downExitOffset =
        window.innerHeight *
        Math.max(SECTION_EXIT_MARGIN_RATIO, SECTION_DOWN_EXIT_MIN_OFFSET_RATIO)

      return anchorScrollY + downExitOffset + SECTION_ANCHOR_TOLERANCE
    }

    const upExitOffset = window.innerHeight * SECTION_EXIT_MARGIN_RATIO
    return Math.max(anchorScrollY - upExitOffset - SECTION_ANCHOR_TOLERANCE, 0)
  }

  const beginBoundaryExit = (direction: 1 | -1) => {
    const releaseTarget = getBoundaryReleaseScrollTarget(direction)

    boundaryExitDirectionRef.current = direction
    isPinnedRef.current = false
    isPageLockedRef.current = false
    snapCooldownUntilRef.current = Date.now() + SNAP_COOLDOWN
    resetWheelState()

    if (releaseTarget === null) {
      return
    }

    window.scrollTo({
      top: releaseTarget,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  const shouldSnapToSection = (direction: 1 | -1) => {
    if (
        !isInteractive ||
        direction < 0 ||
        isSnapPendingRef.current ||
        activeProjectRef.current !== 0 ||
        Date.now() < snapCooldownUntilRef.current
    ) {
      return false
    }

    const rect = getSectionRect()
    if (!rect) {
      return false
    }

    const snapTopLimit = window.innerHeight * SNAP_TRIGGER_RATIO
    const snapBacktrackLimit = -window.innerHeight * SNAP_BACKTRACK_RATIO

    return (
        rect.top <= snapTopLimit &&
        rect.top > snapBacktrackLimit &&
        rect.bottom >= window.innerHeight * 0.72 &&
        !isSectionAnchored()
    )
  }

  const snapToSection = () => {
    const section = sectionRef.current
    const rect = getSectionRect()

    if (!section || !rect) {
      return
    }

    if (Math.abs(rect.top) <= 2) {
      finishSnap()
      return
    }

    clearSnapWatch()
    isSnapPendingRef.current = true
    isPinnedRef.current = true
    boundaryExitDirectionRef.current = 0
    isPageLockedRef.current = false

    const targetTop = getSectionAnchorScrollY()
    if (targetTop === null) {
      return
    }

    lockedScrollYRef.current = targetTop

    const completeWhenAnchored = () => {
      const currentRect = section.getBoundingClientRect()
      if (Math.abs(currentRect.top) <= 2) {
        finishSnap()
        return
      }

      snapRafRef.current = window.requestAnimationFrame(completeWhenAnchored)
    }

    snapTimeoutRef.current = window.setTimeout(() => {
      finishSnap()
    }, SNAP_TIMEOUT)

    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })

    snapRafRef.current = window.requestAnimationFrame(completeWhenAnchored)
  }

  const resetProjects = () => {
    resetWheelState()
    clearSnapWatch()
    isSnapPendingRef.current = false
    snapCooldownUntilRef.current = 0
    isPinnedRef.current = false
    boundaryExitDirectionRef.current = 0
    isPageLockedRef.current = false
    isAnimatingRef.current = false
    setIsAnimating(false)

    if (animationTimerRef.current) {
      window.clearTimeout(animationTimerRef.current)
      animationTimerRef.current = null
    }

    setActiveProject(0)
    activeProjectRef.current = 0
  }

  const activateProject = (nextProject: number) => {
    if (nextProject < 0 || nextProject >= projects.length || isAnimatingRef.current) {
      return
    }

    isPinnedRef.current = true
    isAnimatingRef.current = true
    setIsAnimating(true)
    setActiveProject(nextProject)
    activeProjectRef.current = nextProject

    if (animationTimerRef.current) {
      window.clearTimeout(animationTimerRef.current)
    }

    animationTimerRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false
      setIsAnimating(false)
    }, ANIMATION_DURATION)
  }

  const moveProject = (direction: 1 | -1) => {
    if (isAnimatingRef.current) {
      return
    }

    const current = activeProjectRef.current
    const nextProject = Math.max(0, Math.min(current + direction, projects.length - 1))

    if (nextProject === current) {
      return
    }

    activateProject(nextProject)
  }

  const shouldCaptureProjectInput = (direction: 1 | -1) => {
    if (isSnapPendingRef.current || Date.now() < snapCooldownUntilRef.current) {
      return true
    }

    if (hasPinnedProjectsLock()) {
      if (isAnimatingRef.current) {
        return true
      }

      const current = activeProjectRef.current
      const isAtBoundary =
        (direction > 0 && current === projects.length - 1) ||
        (direction < 0 && current === 0)

      return !isAtBoundary
    }

    if (
      !isInteractive ||
      !isProjectsInViewRef.current ||
      !isProjectsActive() ||
      !isSectionAnchored(SECTION_ANCHOR_TOLERANCE)
    ) {
      return false
    }

    if (isAnimatingRef.current) {
      return true
    }

    const current = activeProjectRef.current
    const isAtBoundary =
        (direction > 0 && current === projects.length - 1) ||
        (direction < 0 && current === 0)

    return !isAtBoundary
  }

  useEffect(() => {
    activeProjectRef.current = activeProject
  }, [activeProject])

  useEffect(() => {
    isAnimatingRef.current = isAnimating
  }, [isAnimating])

  useEffect(() => {
    const section = sectionRef.current

    if (!section || !isInteractive) {
      if (!isInteractive) {
        resetProjects()
      }
      return
    }

    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isProjectsInViewRef.current = entry.intersectionRatio >= SECTION_IN_VIEW_RATIO

            if (
              entry.intersectionRatio < SECTION_RESET_RATIO &&
              boundaryExitDirectionRef.current === 0 &&
              activeProjectRef.current > 0
            ) {
              resetProjects()
            }

            setProjectsChromeState(shouldHideHeader())
          })
        },
        { threshold: [0, SECTION_RESET_RATIO, SECTION_IN_VIEW_RATIO, 1] }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [isInteractive, sectionRef])

  useEffect(() => {
    if (!isInteractive) {
      return
    }

    lastScrollYRef.current = getRenderedScrollY()

    const onScroll = () => {
      const currentScrollY = getRenderedScrollY()
      const delta = currentScrollY - lastScrollYRef.current
      lastScrollYRef.current = currentScrollY

      if (boundaryExitDirectionRef.current !== 0) {
        if (hasSectionExitedViewport(boundaryExitDirectionRef.current)) {
          resetProjects()
          setProjectsChromeState(false)
          return
        }
      }

      if (delta > 0 && shouldSnapToSection(1)) {
        snapToSection()
        setProjectsChromeState(true)
        return
      }

      if (shouldEnforcePageLock()) {
        const anchorScrollY = getSectionAnchorScrollY()
        if (anchorScrollY !== null) {
          lockedScrollYRef.current = anchorScrollY
        }

        isPageLockedRef.current = true

        if (Math.abs(window.scrollY - lockedScrollYRef.current) > 1) {
          window.scrollTo({
            top: lockedScrollYRef.current,
            behavior: "auto",
          })
        }
      } else {
        isPageLockedRef.current = false
      }

      setProjectsChromeState(shouldHideHeader())
    }

    setProjectsChromeState(shouldHideHeader())
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      setProjectsChromeState(false)
    }
  }, [getRenderedScrollY, isInteractive])

  const inputHandler = useMemo(
      () => ({
        id: "projects-scroll-controller",
        priority: 100,
        onWheel: (event: WheelEvent) => {
          if (!isInteractive || Math.abs(event.deltaY) < 2) {
            return false
          }

          const direction = getDirectionFromDelta(event.deltaY)

          if (
            boundaryExitDirectionRef.current !== 0 &&
            direction !== boundaryExitDirectionRef.current
          ) {
            boundaryExitDirectionRef.current = 0
            if (isProjectsInViewRef.current) {
              isPinnedRef.current = true
            }
          }

          if (shouldSnapToSection(direction)) {
            snapToSection()
            return true
          }

          if (isBoundaryExit(direction)) {
            beginBoundaryExit(direction)
            return true
          }

          if (!shouldCaptureProjectInput(direction)) {
            if (!isSnapPendingRef.current) {
              resetWheelState()
            }
            return false
          }

          if (isSnapPendingRef.current || Date.now() < snapCooldownUntilRef.current) {
            return true
          }

          if (wheelDirectionRef.current !== direction) {
            wheelDirectionRef.current = direction
            wheelDeltaRef.current = 0
          }

          wheelDeltaRef.current += event.deltaY

          if (wheelResetTimerRef.current) {
            window.clearTimeout(wheelResetTimerRef.current)
          }

          wheelResetTimerRef.current = window.setTimeout(() => {
            wheelDeltaRef.current = 0
            wheelDirectionRef.current = 0
            wheelResetTimerRef.current = null
          }, 140)

          if (!isAnimatingRef.current && Math.abs(wheelDeltaRef.current) >= WHEEL_THRESHOLD) {
            wheelDeltaRef.current = 0
            moveProject(direction)
          }

          return true
        },

        onTouchStart: (event: TouchEvent) => {
          if (!isInteractive) {
            isTouchLockedRef.current = false
            touchMovedProjectRef.current = false
            return false
          }

          touchStartYRef.current = event.touches[0]?.clientY ?? 0
          isTouchLockedRef.current = false
          touchMovedProjectRef.current = false
          return isSnapPendingRef.current
        },

        onTouchMove: (event: TouchEvent) => {
          if (!isInteractive || event.touches.length === 0) {
            return false
          }

          const touchY = event.touches[0]?.clientY ?? touchStartYRef.current
          const diff = touchStartYRef.current - touchY

          if (Math.abs(diff) < 6) {
            return isSnapPendingRef.current
          }

          const direction = getDirectionFromDelta(diff)

          if (
            boundaryExitDirectionRef.current !== 0 &&
            direction !== boundaryExitDirectionRef.current
          ) {
            boundaryExitDirectionRef.current = 0
            if (isProjectsInViewRef.current) {
              isPinnedRef.current = true
            }
          }

          if (shouldSnapToSection(direction)) {
            isTouchLockedRef.current = true
            snapToSection()
            return true
          }

          if (isBoundaryExit(direction)) {
            isTouchLockedRef.current = true
            touchMovedProjectRef.current = false
            beginBoundaryExit(direction)
            return true
          }

          if (!shouldCaptureProjectInput(direction)) {
            isTouchLockedRef.current = false
            touchMovedProjectRef.current = false
            return false
          }

          if (isSnapPendingRef.current || Date.now() < snapCooldownUntilRef.current) {
            isTouchLockedRef.current = true
            return true
          }

          isTouchLockedRef.current = true

          if (
              !touchMovedProjectRef.current &&
              !isAnimatingRef.current &&
              Math.abs(diff) >= TOUCH_THRESHOLD
          ) {
            touchMovedProjectRef.current = true
            touchStartYRef.current = touchY
            moveProject(direction)
          }

          return true
        },

        onTouchEnd: () => {
          const shouldConsume =
              isTouchLockedRef.current ||
              isAnimatingRef.current ||
              isSnapPendingRef.current ||
              Date.now() < snapCooldownUntilRef.current

          isTouchLockedRef.current = false
          touchMovedProjectRef.current = false
          return shouldConsume
        },
      }),
      [getRenderedScrollY, isInteractive, prefersReducedMotion]
  )

  useEffect(() => registerInputHandler(inputHandler), [inputHandler, registerInputHandler])

  useEffect(() => {
    return () => {
      resetWheelState()
      clearSnapWatch()
      setProjectsChromeState(false)

      if (animationTimerRef.current) {
        window.clearTimeout(animationTimerRef.current)
      }
    }
  }, [])

  return {
    activeProject,
    isAnimating,
    isInteractive,
  }
}
