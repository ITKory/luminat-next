"use client"

import Image from "next/image"
import { type PointerEvent, useRef } from "react"
import { motion, useReducedMotion } from "motion/react"
import { projects } from "@/entities/project/model/projects"
import { cn } from "@/shared/lib/cn"
import { useProjectsScrollController } from "@/widgets/home/use-projects-scroll-controller"

function renderProjectDetails(project: (typeof projects)[number]) {
  return (
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
  )
}

function ProjectImage({
  src,
  alt,
  loading,
  enableHoverMotion,
}: {
  src: string
  alt: string
  loading: "eager" | "lazy"
  enableHoverMotion: boolean
}) {
  const updatePointerOffset = (event: PointerEvent<HTMLDivElement>) => {
    if (!enableHoverMotion) {
      return
    }

    const { currentTarget, clientX, clientY } = event
    const rect = currentTarget.getBoundingClientRect()
    const offsetX = ((clientX - rect.left) / rect.width - 0.5) * 18
    const offsetY = ((clientY - rect.top) / rect.height - 0.5) * 18

    currentTarget.style.setProperty("--project-image-offset-x", `${offsetX.toFixed(2)}px`)
    currentTarget.style.setProperty("--project-image-offset-y", `${offsetY.toFixed(2)}px`)
  }

  const resetPointerOffset = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--project-image-offset-x", "0px")
    event.currentTarget.style.setProperty("--project-image-offset-y", "0px")
  }

  return (
    <div
        className="project-image-wrapper"
        onPointerMove={updatePointerOffset}
        onPointerLeave={resetPointerOffset}
    >
      <Image
          src={src}
          alt={alt}
          fill
          priority={loading === "eager"}
          loading={loading === "lazy" ? "lazy" : undefined}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="project-image"
      />
    </div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = !!useReducedMotion()

  const {
    activeProject,
    isInteractive,
  } = useProjectsScrollController(sectionRef)

  const safeActiveProject =
      activeProject >= 0 && activeProject < projects.length ? activeProject : 0

  const project = projects[safeActiveProject]
  const enableHoverMotion = isInteractive && !shouldReduceMotion

  return (
      <section
          ref={sectionRef}
          className={cn("projects", isInteractive ? "projects-interactive" : "projects-static")}
          id="projects-section"
          data-snap-section="true"
          style={{ marginTop: "10%" }}
      >
        <div className="projects-scroll-container">
          <div className="projects-images" id="projects-scroll">
            {projects.map((item, index) => (
                <div
                    key={item.id}
                    data-project={item.id}
                    className={cn(
                        "project-item",
                        isInteractive && index === safeActiveProject && "active",
                        isInteractive && index < safeActiveProject && "past"
                    )}
                >
                  <ProjectImage
                      src={item.image}
                      alt={item.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      enableHoverMotion={enableHoverMotion}
                  />

                  <div className="project-mobile-meta">{renderProjectDetails(item)}</div>
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

            <motion.div
                id="project-content"
                key={project.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
            >
              {renderProjectDetails(project)}
            </motion.div>
          </div>
        </div>
      </section>
  )
}
