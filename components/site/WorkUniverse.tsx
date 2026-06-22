"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { EASE, VIEWPORT } from "@/lib/motion"
import { categories, mediaCount, projects, type Category } from "@/lib/portfolio-data"
import { RevealText, SectionLabel } from "@/components/ui/RevealText"
import { useCaseViewer } from "@/components/site/CaseViewer"
import { cn } from "@/lib/utils"

export function WorkUniverse() {
  const [filter, setFilter] = useState<Category>("All")
  const { open } = useCaseViewer()

  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  const counts = useMemo(() => {
    const m = new Map<Category, number>()
    m.set("All", projects.length)
    for (const p of projects) m.set(p.category, (m.get(p.category) ?? 0) + 1)
    return m
  }, [])

  return (
    <section id="work" className="relative scroll-mt-20 py-28 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-[#c02528]/[0.05] blur-2xl opacity-70"
      />

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="02">Selected Work</SectionLabel>
            <RevealText
              text="The work archive."
              className="mt-7 text-balance text-4xl uppercase leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="max-w-sm text-pretty text-sm leading-relaxed text-[#a1a1aa]"
          >
            {projects.length} final client and concept projects across packaging, social media systems,
            branding, logos, posters, sports design and campaign visuals. Open a project for the full case.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {categories.map((c) => {
            const isActive = filter === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={isActive}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c02528]/70",
                  isActive ? "text-white" : "text-[#a1a1aa] hover:text-white",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="work-filter"
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute inset-0 rounded-full border border-[#c02528]/60 bg-[#c02528]/15"
                  />
                )}
                {!isActive && <span className="absolute inset-0 rounded-full border border-white/[0.08]" />}
                <span className="relative flex items-center gap-2">
                  {c}
                  <span className={cn("font-mono text-[10px]", isActive ? "text-[#e0676a]" : "text-white/30")}>
                    {counts.get(c) ?? 0}
                  </span>
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Index list */}
        <div className="mt-12 border-t border-white/[0.07]">
          <AnimatePresence mode="popLayout">
            {list.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.035, 0.4), ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => open(project.slug)}
                  className="group relative grid w-full grid-cols-[2.6rem_1fr_auto] items-center gap-4 border-b border-white/[0.07] py-6 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c02528]/60 sm:grid-cols-[3.5rem_1fr_auto_auto] sm:gap-8 sm:py-7"
                >
                  {/* hover wash */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-[#c02528]/[0.07] via-white/[0.025] to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />

                  <span className="relative font-mono text-xs tracking-[0.2em] text-white/30 transition-colors duration-300 group-hover:text-[#c02528]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="relative min-w-0">
                    <span className="block truncate font-display text-xl text-white/85 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white sm:text-3xl lg:text-4xl">
                      {project.title}
                    </span>
                    <span className="mt-1.5 block truncate font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 sm:hidden">
                      {project.category} · {mediaCount(project)} media
                    </span>
                  </span>

                  <span className="relative hidden text-right sm:block">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                      {project.category}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/25">
                      {mediaCount(project)} media · {project.client}
                    </span>
                  </span>

                  <span className="relative flex size-10 items-center justify-center rounded-full border border-white/[0.1] text-white/45 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#c02528] group-hover:bg-[#c02528] group-hover:text-white">
                    <ArrowUpRight className="size-4" />
                  </span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>


    </section>
  )
}
