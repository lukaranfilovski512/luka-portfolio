"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Film, Grid3X3, Images, Play, X } from "lucide-react"
import { Reveal, SectionLabel } from "./reveal"
import { cn } from "@/lib/utils"
import { portfolioProjects, type PortfolioProject } from "@/lib/portfolio-projects"

type Category = "All" | "Social Media" | "Branding" | "Logo Design" | "Posters" | "Video & Motion"

const filters: Category[] = ["All", "Social Media", "Branding", "Logo Design", "Posters", "Video & Motion"]

const categoryIntro: Record<Exclude<Category, "All">, string> = {
  "Social Media": "Post systems for businesses, separated by client and presented as premium grids.",
  Branding: "Brand identity systems, campaign touchpoints, mascot work and visual direction.",
  "Logo Design": "Logo marks and identity concepts presented as clean visual explorations.",
  Posters: "Custom posters and promotional visuals with stronger composition and impact.",
  "Video & Motion": "B2B videos and motion content presented with a premium cinematic viewing experience.",
}

function visibleImages(project: PortfolioProject, max = 6) {
  return project.images.slice(0, Math.min(max, project.images.length))
}

function isBehanceStyleProject(project: PortfolioProject) {
  return project.category !== "Social Media" && project.category !== "Video & Motion"
}

function isVideoProject(project: PortfolioProject) {
  return project.category === "Video & Motion" && Boolean(project.videos?.length)
}

function isLandscapeVideo(video: { w: number; h: number }) {
  return video.w >= video.h
}

function videoAspectClass(video: { w: number; h: number }) {
  return isLandscapeVideo(video) ? "aspect-video" : "aspect-[9/16]"
}

export function Work() {
  const [active, setActive] = useState<Category>("All")
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)

  const filtered = useMemo(
    () => (active === "All" ? portfolioProjects : portfolioProjects.filter((project) => project.category === active)),
    [active],
  )

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, typeof portfolioProjects[number][]>>((acc, project) => {
      acc[project.category] = acc[project.category] || []
      acc[project.category].push(project)
      return acc
    }, {})
  }, [filtered])

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedProject])

  return (
    <section id="work" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-16 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5">
        <Reveal>
          <SectionLabel>Selected Work</SectionLabel>
        </Reveal>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <div>
              <h2 className="max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Portfolio organized by real client work.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
                Social media work stays grouped as premium post systems, while branding, logo design,
                and presentation-based projects open in a larger Behance-style format for clearer viewing.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  aria-pressed={active === filter}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                    active === filter
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_0_35px_-12px_var(--color-primary)]"
                      : "border-border bg-card/40 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-14 space-y-16">
          <AnimatePresence mode="popLayout">
            {Object.entries(grouped).map(([category, projects]) => (
              <motion.div
                key={category}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {active === "All" && (
                  <div className="mb-6 flex flex-col gap-2 border-l border-primary/70 pl-4">
                    <h3 className="text-xl font-semibold tracking-tight">{category}</h3>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                      {categoryIntro[category as Exclude<Category, "All">]}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      index={index}
                      onOpen={() => setSelectedProject(project)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({ project, index, onOpen }: { project: PortfolioProject; index: number; onOpen: () => void }) {
  const preview = visibleImages(project, 5)
  const featured = preview[0]
  const secondary = preview.slice(1, 5)
  const videoProject = isVideoProject(project)

  if (videoProject) {
    return <VideoProjectCard project={project} index={index} onOpen={onOpen} />
  }

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.985 }}
      transition={{ duration: 0.4, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-2.5 text-left shadow-[0_30px_110px_-85px_var(--color-primary)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/45 hover:bg-card/70 hover:shadow-[0_34px_120px_-70px_var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-primary/15 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.035]" />

      <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#07080a]">
        <div className="relative h-[21rem] overflow-hidden sm:h-[24rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(192,34,39,0.28),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02),rgba(0,0,0,0.58))]" />

          {featured && (
            <div className="absolute left-4 top-4 h-[calc(100%-2rem)] w-[58%] overflow-hidden rounded-[1.35rem] border border-white/10 bg-muted shadow-2xl transition-transform duration-700 group-hover:scale-[1.018] sm:left-5 sm:top-5 sm:h-[calc(100%-2.5rem)]">
              <img
                src={featured.src}
                alt={featured.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
            </div>
          )}

          <div className="absolute right-4 top-4 grid h-[calc(100%-2rem)] w-[36%] grid-rows-2 gap-3 sm:right-5 sm:top-5 sm:h-[calc(100%-2.5rem)]">
            {(secondary.length ? secondary.slice(0, 2) : preview.slice(0, 1)).map((image, imageIndex) => (
              <div
                key={`${image.src}-${imageIndex}`}
                className={cn(
                  "relative overflow-hidden rounded-[1.2rem] border border-white/10 bg-muted shadow-xl transition-transform duration-700 group-hover:scale-[1.025]",
                  secondary.length <= 1 && "row-span-2",
                  !secondary.length && "opacity-75",
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            ))}
          </div>

          {secondary.slice(2, 4).map((image, imageIndex) => (
            <div
              key={image.src}
              className={cn(
                "absolute bottom-5 overflow-hidden rounded-2xl border border-white/10 bg-muted shadow-2xl transition-all duration-700 group-hover:-translate-y-1 group-hover:scale-[1.03]",
                imageIndex === 0 ? "left-[42%] h-24 w-24 sm:h-28 sm:w-28" : "left-[55%] h-20 w-20 sm:h-24 sm:w-24",
              )}
            >
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
              {imageIndex === 1 && project.images.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/65 text-sm font-semibold text-white backdrop-blur-sm">
                  +{project.images.length - 5}
                </div>
              )}
            </div>
          ))}

          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/58 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur-md sm:left-5 sm:top-5">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)]" />
            {project.category}
          </div>

          <div className="absolute bottom-5 right-5 z-10 flex translate-y-2 items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-black opacity-0 shadow-[0_18px_50px_-22px_rgba(255,255,255,0.9)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Gallery <ArrowUpRight className="size-3.5" />
          </div>
        </div>
      </div>

      <div className="relative p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>
          <div className="hidden shrink-0 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-muted-foreground sm:flex">
            {isVideoProject(project) ? `${project.count} videos` : `${project.count} visuals`}
          </div>
        </div>
      </div>
    </motion.button>
  )
}


function VideoProjectCard({ project, index, onOpen }: { project: PortfolioProject; index: number; onOpen: () => void }) {
  const videos = project.videos ?? []

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.985 }}
      transition={{ duration: 0.4, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="group relative overflow-hidden rounded-[2.25rem] border border-primary/25 bg-[radial-gradient(circle_at_18%_0%,rgba(192,34,39,0.22),transparent_35%),linear-gradient(145deg,rgba(255,255,255,0.09),rgba(255,255,255,0.025))] p-2.5 text-left shadow-[0_38px_130px_-78px_var(--color-primary)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_40px_150px_-72px_var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 lg:col-span-2"
    >
      <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-primary/20 blur-[90px] transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-white/[0.04]" />

      <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#06070a]">
        <div className="relative min-h-[34rem] overflow-hidden px-5 pb-24 pt-20 sm:px-8 sm:pb-24 sm:pt-22 lg:min-h-[36rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.11),transparent_34%),linear-gradient(135deg,rgba(192,34,39,0.16),transparent_45%)]" />
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/62 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur-md sm:left-5 sm:top-5">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)]" />
            Video & Motion
          </div>

          <div className="relative z-[1] flex min-h-[24rem] flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
            {videos.map((video, videoIndex) => {
              const landscape = isLandscapeVideo(video)

              return (
                <div
                  key={video.src}
                  className={cn(
                    "relative overflow-hidden border border-white/12 bg-black shadow-[0_30px_90px_-42px_rgba(0,0,0,0.95)] transition-transform duration-700 group-hover:scale-[1.018]",
                    landscape
                      ? "w-full max-w-[660px] rounded-[1.45rem] p-2"
                      : "w-[min(42vw,250px)] min-w-[210px] max-w-[270px] rounded-[2rem] p-2",
                    videos.length === 1 && landscape && "max-w-4xl",
                  )}
                >
                  <div className={cn("relative overflow-hidden rounded-[1.15rem] bg-black", videoAspectClass(video))}>
                    <video
                      src={video.src}
                      poster={video.poster}
                      className="h-full w-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-white/5" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">B2B Video {String(videoIndex + 1).padStart(2, "0")}</p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                          {landscape ? "Landscape" : "Vertical"} • {video.duration}
                        </p>
                      </div>
                      <span className="flex size-10 items-center justify-center rounded-full bg-white text-black shadow-2xl sm:size-11">
                        <Play className="ml-0.5 size-3.5 fill-current sm:size-4" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/62 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
            <Film className="size-4 text-primary" />
            Battery Evolution B2B Video Showcase
          </div>

          <div className="absolute bottom-5 right-5 z-10 flex translate-y-2 items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-black opacity-0 shadow-[0_18px_50px_-22px_rgba(255,255,255,0.9)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Watch Videos <ArrowUpRight className="size-3.5" />
          </div>
        </div>
      </div>

      <div className="relative p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>
          <div className="hidden shrink-0 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-muted-foreground sm:flex">
            {project.count} videos
          </div>
        </div>
      </div>
    </motion.button>
  )
}

function ProjectModal({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  const behanceStyle = isBehanceStyleProject(project)
  const videoProject = isVideoProject(project)

  return (
    <motion.div
      className="fixed inset-0 z-[70] overflow-y-auto bg-background/85 px-4 py-6 backdrop-blur-xl sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "relative mx-auto w-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_30px_140px_-50px_var(--color-primary)]",
          behanceStyle ? "max-w-[1700px]" : "max-w-7xl",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          aria-label="Close project details"
        >
          <X className="size-4" />
        </button>

        <div className="relative border-b border-border p-5 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/15 blur-[90px]" />
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
            <Grid3X3 className="size-3" />
            {project.category}
          </span>
          <h3 id="project-modal-title" className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h3>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-2 text-sm text-muted-foreground">
              <Images className="size-4 text-primary" />
              {isVideoProject(project) ? `${project.count} portfolio videos` : `${project.count} portfolio visuals`}
            </div>
          </div>
        </div>

        <div className={cn("p-4 sm:p-6 lg:p-8", behanceStyle && "bg-[radial-gradient(circle_at_top,rgba(192,34,39,0.08),transparent_26%)]") }>
          {videoProject ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              {(project.videos ?? []).map((video, index) => {
                const landscape = isLandscapeVideo(video)

                return (
                  <motion.figure
                    key={video.src}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.08, 0.25) }}
                    className={cn(
                      "overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#07080a] p-3 shadow-[0_28px_100px_-62px_rgba(192,34,39,0.65)]",
                      landscape && "lg:col-span-2",
                    )}
                  >
                    <div
                      className={cn(
                        "relative mx-auto overflow-hidden rounded-[1.25rem] border border-white/10 bg-black",
                        landscape ? "max-w-5xl" : "max-w-sm",
                      )}
                    >
                      <div className={cn("relative bg-black", videoAspectClass(video))}>
                        <video
                          src={video.src}
                          poster={video.poster}
                          className="h-full w-full bg-black object-contain"
                          controls
                          playsInline
                          preload="metadata"
                        />
                      </div>
                    </div>
                    <figcaption className="flex items-center justify-between gap-4 px-2 pb-1 pt-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                        Video {String(index + 1).padStart(2, "0")} • {landscape ? "Landscape" : "Vertical"}
                      </span>
                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                    </figcaption>
                  </motion.figure>
                )
              })}
            </div>
          ) : behanceStyle ? (
            <div className="mx-auto flex max-w-[1520px] flex-col gap-6 lg:gap-8">
              {project.images.map((image, index) => (
                <motion.figure
                  key={image.src}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.4) }}
                  className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0d11] p-3 shadow-[0_24px_90px_-60px_rgba(192,34,39,0.55)]"
                >
                  <div className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#050608]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-auto w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-4 px-2 pb-1 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      Slide {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Behance-style full presentation view
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
              {project.images.map((image, index) => (
                <motion.figure
                  key={image.src}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.35) }}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-background/35 p-2"
                >
                  <img src={image.src} alt={image.alt} className="h-auto w-full rounded-xl object-cover" loading="lazy" />
                </motion.figure>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  )
}
