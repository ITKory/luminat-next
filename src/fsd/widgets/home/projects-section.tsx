"use client"

import { useRef } from "react"
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

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const {
    activeProject,
    isAnimating,
    isInteractive,
  } = useProjectsScrollController(sectionRef)

  const safeActiveProject =
      activeProject >= 0 && activeProject < projects.length ? activeProject : 0

  const project = projects[safeActiveProject]

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
                  <div className="project-image-wrapper">
                    <img
                        src={item.image}
                        alt={item.title}
                        loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>

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

            <div
                id="project-content"
                key={`${safeActiveProject}-${isAnimating ? "animating" : "ready"}`}
                className="fade-in"
            >
              {renderProjectDetails(project)}
            </div>
          </div>
        </div>
      </section>
  )
}
