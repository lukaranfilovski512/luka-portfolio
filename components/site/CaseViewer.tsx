"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { AnimatePresence } from "framer-motion"
import { projects } from "@/lib/portfolio-data"
import { ProjectModal } from "@/components/site/ProjectModal"

type CaseViewerApi = {
  open: (slug: string) => void
  activeSlug: string | null
}

const CaseViewerContext = createContext<CaseViewerApi>({ open: () => {}, activeSlug: null })

/** Access the global case viewer from any section. */
export function useCaseViewer() {
  return useContext(CaseViewerContext)
}

/**
 * Single source of truth for the cinematic project modal: any section
 * (Featured Case, Work Universe) opens cases through this provider, so
 * prev/next always cycles the full verified archive.
 */
export function CaseViewerProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null)

  const open = useCallback((slug: string) => {
    const i = projects.findIndex((p) => p.slug === slug)
    if (i !== -1) setIndex(i)
  }, [])

  // Body scroll lock while a case is open.
  useEffect(() => {
    document.body.style.overflow = index !== null ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [index])

  const api = useMemo(
    () => ({ open, activeSlug: index !== null ? projects[index].slug : null }),
    [open, index],
  )

  return (
    <CaseViewerContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {index !== null && (
          <ProjectModal
            project={projects[index]}
            onClose={() => setIndex(null)}
            onPrev={() => setIndex((index - 1 + projects.length) % projects.length)}
            onNext={() => setIndex((index + 1) % projects.length)}
          />
        )}
      </AnimatePresence>
    </CaseViewerContext.Provider>
  )
}
