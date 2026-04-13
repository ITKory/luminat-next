"use client"

import { useEffect, useRef, useState } from "react"
import { projects } from "@/entities/project/model/projects"
import { cn } from "@/shared/lib/cn"

declare global {
  interface Window {
    scrollToNextSection?: () => void
    scrollToPrevSection?: () => void
  }
}

const ANIMATION_DURATION = 1000

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const project = projects[activeProject]
  const sectionRef = useRef<HTMLElement | null>(null)
  const activeProjectRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const touchStartYRef = useRef(0)
  const isProjectsInViewRef = useRef(false)
  const imageRefs = useRef<Array<HTMLImageElement | null>>([])

  useEffect(() => {
    activeProjectRef.current = activeProject
    updateParallax()
  }, [activeProject])

  useEffect(() => {
    isAnimatingRef.current = isAnimating
  }, [isAnimating])

  const updateParallax = () => {
    imageRefs.current.forEach((img, index) => {
      if (!img) {
        return
      }

      const depth = Math.abs(index - activeProjectRef.current) * 0.1
      img.style.transform = `scale(${1 + depth})`
    })
  }

  const activateProject = (nextProject: number, direction: 1 | -1) => {
    if (nextProject < 0 || nextProject >= projects.length || isAnimatingRef.current) {
      return
    }

    isAnimatingRef.current = true
    setIsAnimating(true)
    setActiveProject(nextProject)

    window.setTimeout(() => {
      isAnimatingRef.current = false
      setIsAnimating(false)

      if (nextProject === projects.length - 1 && direction > 0) {
        window.setTimeout(() => {
          window.scrollToNextSection?.()
        }, 300)
      } else if (nextProject === 0 && direction < 0) {
        window.setTimeout(() => {
          window.scrollToPrevSection?.()
        }, 300)
      }
    }, ANIMATION_DURATION)
  }

  const moveProject = (direction: 1 | -1) => {
    if (isAnimatingRef.current) {
      return
    }

    const current = activeProjectRef.current
    const nextProject = Math.max(0, Math.min(current + direction, projects.length - 1))

    if (nextProject === current) {
      if (current === projects.length - 1 && direction > 0) {
        window.scrollToNextSection?.()
      } else if (current === 0 && direction < 0) {
        window.scrollToPrevSection?.()
      }
      return
    }

    activateProject(nextProject, direction)
  }

  const selectProject = (index: number) => {
    if (index === activeProjectRef.current || isAnimatingRef.current) {
      return
    }

    isAnimatingRef.current = true
    setIsAnimating(true)
    setActiveProject(index)
    window.setTimeout(() => {
      isAnimatingRef.current = false
      setIsAnimating(false)
    }, ANIMATION_DURATION)
  }

  const resetProjects = () => {
    setActiveProject(0)
    activeProjectRef.current = 0
    updateParallax()
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isProjectsInViewRef.current = entry.intersectionRatio >= 0.5
          if (entry.intersectionRatio < 0.5 && activeProjectRef.current > 0) {
            resetProjects()
          }
        })
      },
      { threshold: [0, 0.5, 1] }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    const isProjectsActive = () => {
      const rect = section.getBoundingClientRect()
      const middle = window.innerHeight / 2
      return rect.top <= middle && rect.bottom >= middle
    }

    const onWheel = (event: WheelEvent) => {
      if (!isProjectsInViewRef.current || !isProjectsActive()) {
        return
      }

      if (isAnimatingRef.current || Math.abs(event.deltaY) < 8) {
        return
      }

      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1
      const current = activeProjectRef.current
      const nextProject = Math.max(0, Math.min(current + direction, projects.length - 1))

      if (nextProject === current) {
        if (current === projects.length - 1 && direction > 0) {
          window.scrollToNextSection?.()
        } else if (current === 0 && direction < 0) {
          window.scrollToPrevSection?.()
        }
        return
      }

      event.preventDefault()
      moveProject(direction)
    }

    const onTouchStart = (event: TouchEvent) => {
      if (!isProjectsInViewRef.current || !isProjectsActive()) {
        return
      }
      touchStartYRef.current = event.touches[0]?.clientY ?? 0
    }

    const onTouchEnd = (event: TouchEvent) => {
      if (!isProjectsInViewRef.current || !isProjectsActive()) {
        return
      }

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartYRef.current
      const diff = touchStartYRef.current - touchEndY

      if (Math.abs(diff) < 50) {
        return
      }

      const direction: 1 | -1 = diff > 0 ? 1 : -1
      const current = activeProjectRef.current
      const nextProject = Math.max(0, Math.min(current + direction, projects.length - 1))

      if (nextProject === current) {
        if (current === projects.length - 1 && direction > 0) {
          window.scrollToNextSection?.()
        } else if (current === 0 && direction < 0) {
          window.scrollToPrevSection?.()
        }
        return
      }

      event.preventDefault()
      moveProject(direction)
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!isProjectsInViewRef.current || !isProjectsActive()) {
        return
      }

      const activeImage = imageRefs.current[activeProjectRef.current]
      if (!activeImage) {
        return
      }

      const rect = section.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const moveX = ((x - centerX) / centerX) * 15
      const moveY = ((y - centerY) / centerY) * 15

      activeImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`
    }

    const onMouseLeave = () => {
      updateParallax()
    }

    section.addEventListener("wheel", onWheel, { passive: false })
    section.addEventListener("touchstart", onTouchStart, { passive: true })
    section.addEventListener("touchend", onTouchEnd, { passive: false })
    section.addEventListener("mousemove", onMouseMove)
    section.addEventListener("mouseleave", onMouseLeave)

    return () => {
      section.removeEventListener("wheel", onWheel)
      section.removeEventListener("touchstart", onTouchStart)
      section.removeEventListener("touchend", onTouchEnd)
      section.removeEventListener("mousemove", onMouseMove)
      section.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  useEffect(() => {
    updateParallax()
  }, [])

  return (
    <section ref={sectionRef} className="projects" id="projects-section" data-snap-section="true" style={{ marginTop: "10%" }}>
      <div className="projects-scroll-container">
        <div className="projects-images" id="projects-scroll">
          {projects.map((item, index) => (
            <div
              key={item.id}
              data-project={item.id}
              className={cn(
                "project-item",
                index === activeProject ? "active" : index < activeProject ? "past" : ""
              )}
            >
              <div className="project-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  ref={(element) => {
                    imageRefs.current[index] = element
                  }}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="project-description">
          <div className="fixed-header">
            <div className="text-green">
              <p>LUMINAT</p>
            </div>
            <div className="heading h-gradient">
              <div className="df gap-16">
                <h2>КАК</h2>
                <h2 className="italic">СВЕТ ЖИВЕТ</h2>
              </div>
              <h2>В ПРОСТРАНСТВЕ</h2>
            </div>
          </div>

          <div id="project-content" key={`${activeProject}-${isAnimating ? "animating" : "ready"}`} className="fade-in">
            <div className="down df column-dir gap-32">
              <h6>{project.title}</h6>
              <div className="df gap-16">
                <div className="w-100 df column-dir gap-8">
                  <div className="df gap-1">
                    <div className="caption-bold">Тип:</div>
                    <div className="caption">{project.type}</div>
                  </div>
                  <div className="df gap-1">
                    <div className="caption-bold">Локация:</div>
                    <div className="caption">{project.location}</div>
                  </div>
                  <div className="df gap-1">
                    <div className="caption-bold">Индустрия:</div>
                    <div className="caption">{project.industry}</div>
                  </div>
                  <div className="df gap-1">
                    <div className="caption-bold">Светильники из коллекций Luminat:</div>
                    <div className="caption">{project.collections}</div>
                  </div>
                  <div className="df column-dir gap-8">
                    <div className="caption-bold">Основные решения:</div>
                    <div className="caption">
                      {project.solutions.map((solution, index) => (
                        <span key={solution}>
                          • {solution}
                          {index < project.solutions.length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-100 caption">
                  <div className="df column-dir gap-8">
                    <div className="df column-dir gap-1">
                      <div className="caption-bold">Описание:</div>
                      <div className="caption">{project.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
