"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { EASE } from "@/lib/motion"

const ReadyContext = createContext(false)

/** True once the boot intro has finished (or was skipped). */
export function useReady() {
  return useContext(ReadyContext)
}

const BOOT_LINES = ["BY KARANFILOVSKI", "CREATIVE SYSTEMS — ONLINE", "SKOPJE · NORTH MACEDONIA"]
const INTRO_MS = 2100

/**
 * Boot-sequence intro: three mono lines type up with a tracking line,
 * then the screen wipes diagonally into the hero. Once per session;
 * skipped for reduced motion.
 */
export function IntroGate({ children }: { children: ReactNode }) {
  const [show, setShow] = useState<boolean | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const seen = sessionStorage.getItem("bk-boot-seen") === "1"
    if (reduced || seen) {
      setShow(false)
      setReady(true)
      return
    }
    setShow(true)
    const t = window.setTimeout(() => {
      sessionStorage.setItem("bk-boot-seen", "1")
      setShow(false)
      setReady(true)
    }, INTRO_MS)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <ReadyContext.Provider value={ready}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            key="bk-boot"
            aria-hidden
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 0.85, ease: EASE }}
            className="fixed inset-0 z-[100] bg-[#060608]"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(192,37,40,0.08),transparent_55%)]"
            />
            <div className="flex h-full flex-col items-start justify-center px-7 sm:px-14">
              {BOOT_LINES.map((line, li) => (
                <div key={line} className="overflow-hidden py-0.5">
                  <motion.p
                    initial={{ y: "120%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, delay: 0.15 + li * 0.22, ease: EASE }}
                    className={
                      li === 0
                        ? "font-display text-2xl tracking-tight text-white sm:text-4xl"
                        : "font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 sm:text-xs"
                    }
                  >
                    {li === 1 ? (
                      <span className="flex items-center gap-3">
                        <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#c02528]" />
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </motion.p>
                </div>
              ))}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTRO_MS / 1000 - 0.5, delay: 0.2, ease: "linear" }}
                className="mt-8 h-px w-56 origin-left bg-gradient-to-r from-[#c02528] to-[#c02528]/10 sm:w-80"
              />
            </div>
            <p className="absolute bottom-8 right-7 font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 sm:right-14">
              Loading portfolio system
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </ReadyContext.Provider>
  )
}
