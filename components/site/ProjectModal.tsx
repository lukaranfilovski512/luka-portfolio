"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { EASE } from "@/lib/motion"
import { mediaCount, type Project } from "@/lib/portfolio-data"
import { SafeImage } from "@/components/ui/SafeImage"
import { SafeVideo } from "@/components/ui/SafeVideo"
import { tools } from "@/lib/site-content"
import { cn } from "@/lib/utils"

/**
 * Cinematic full-screen case viewer.
 * Layout adapts to category: masonry for social systems and campaigns,
 * contained centered gallery for packaging, logos, posters and sports design.
 * Focus is trapped, Escape closes, ←/→ switch projects.
 */
export function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const shellRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "Tab") {
        // Focus trap
        const focusables = shellRef.current?.querySelectorAll<HTMLElement>(
          "button, a[href], video[controls], [tabindex]:not([tabindex='-1'])",
        )
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, onPrev, onNext])

  // Scroll the gallery back to top when switching projects.
  useEffect(() => {
    shellRef.current?.scrollTo({ top: 0 })
  }, [project.slug])

  const isSocial = project.category === "Social Media" || project.category === "Campaigns"
  const isVideo = project.videos.length > 0
  const contained = !isSocial && project.images.length > 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] bg-[#060608]/92"
      onClick={onClose}
    >
      {/* Fixed controls — outside the transformed panel */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close project"
        className="fixed right-4 top-4 z-[78] flex size-11 items-center justify-center rounded-full border border-white/[0.12] bg-[#060608]/85 text-white transition-colors hover:border-[#c02528] hover:bg-[#c02528] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c02528]/70 sm:right-7 sm:top-7"
      >
        <X className="size-4" />
      </button>
      <div className="fixed bottom-4 right-4 z-[78] flex gap-2 sm:bottom-7 sm:right-7">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Previous project"
          className="flex size-11 items-center justify-center rounded-full border border-white/[0.12] bg-[#060608]/85 text-white transition-colors hover:border-[#c02528] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c02528]/70"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Next project"
          className="flex size-11 items-center justify-center rounded-full border border-white/[0.12] bg-[#060608]/85 text-white transition-colors hover:border-[#c02528] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c02528]/70"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>

      <motion.div
        ref={shellRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 36 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="h-full overflow-y-auto overscroll-contain"
      >
        {/* Case header */}
        <header className="relative border-b border-white/[0.07] px-5 pb-8 pt-20 sm:px-10 sm:pt-24 lg:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-56 w-72 rounded-full bg-[#c02528]/10 blur-xl opacity-60"
          />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c02528]">
            {project.category} · {project.client} · {project.year}
          </p>
          <motion.h3
            key={project.slug}
            id="case-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-4 max-w-4xl font-display text-3xl uppercase leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {project.title}
          </motion.h3>
          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-[#a1a1aa] sm:text-base">
              {project.description}
            </p>
            <dl className="flex shrink-0 flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.2em]">
              <div>
                <dt className="text-white/30">Role</dt>
                <dd className="mt-1 text-white/75">{project.role}</dd>
              </div>
              <div>
                <dt className="text-white/30">Media</dt>
                <dd className="mt-1 text-white/75">{mediaCount(project)} items</dd>
              </div>
              <div>
                <dt className="text-white/30">Tools</dt>
                <dd className="mt-1 text-white/75">{tools.map((t) => t.short).join(" · ")}</dd>
              </div>
            </dl>
          </div>
        </header>

        {/* Media body */}
        <div className="px-4 pb-32 pt-6 sm:px-8 sm:pt-10 lg:px-12">
          {isVideo ? (
            <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-6">
              {project.videos.map((v, i) => (
                <motion.figure
                  key={v.src}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: Math.min(i * 0.08, 0.3), ease: EASE }}
                  className={cn(
                    "overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08080b] p-2.5",
                    v.w >= v.h ? "w-full max-w-4xl" : "w-full max-w-[300px]",
                  )}
                >
                  <SafeVideo
                    src={v.src}
                    poster={v.poster}
                    w={v.w}
                    h={v.h}
                    label={`${project.title} — video ${i + 1}`}
                    className="rounded-xl"
                  />
                  <figcaption className="flex items-center justify-between px-2 pb-1 pt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
                    <span>
                      {String(i + 1).padStart(2, "0")} · {v.w >= v.h ? "Landscape" : "Vertical"}
                    </span>
                    {v.duration && <span>{v.duration}</span>}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          ) : contained ? (
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
              {project.images.map((img, i) => (
                <motion.figure
                  key={img.src}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="w-full"
                >
                  <div
                    className="relative mx-auto overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08080b]"
                    style={{
                      aspectRatio: `${img.w} / ${img.h}`,
                      maxHeight: project.category === "Packaging" ? "74vh" : "78vh",
                      maxWidth: `min(100%, calc(${project.category === "Packaging" ? "74vh" : "78vh"} * ${img.w / img.h}))`,
                    }}
                  >
                    <img
                      src={img.src}
                      alt={`${project.title} — visual ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <figcaption className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.24em] text-white/30">
                    {String(i + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          ) : isSocial ? (
            <div className="mx-auto max-w-[1480px] columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]">
              {project.images.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-4% 0px" }}
                  transition={{ duration: 0.5, delay: Math.min((i % 4) * 0.04, 0.14), ease: EASE }}
                  className="mb-4 break-inside-avoid"
                >
                  <SafeImage
                    src={img.src}
                    alt={`${project.title} — post ${i + 1}`}
                    w={img.w}
                    h={img.h}
                    className="rounded-xl border border-white/[0.07]"
                  />
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  )
}
