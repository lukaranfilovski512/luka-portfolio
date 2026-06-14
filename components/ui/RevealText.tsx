"use client"

import { type ElementType, type ReactNode } from "react"
import { motion } from "framer-motion"
import { EASE, VIEWPORT } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Kinetic text: words (or characters) rise from an overflow mask with
 * stagger — on scroll, or on mount when gated behind the intro.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  mode = "words",
  onMount = false,
  ready = true,
  accent = [],
}: {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  mode?: "words" | "chars"
  onMount?: boolean
  ready?: boolean
  accent?: string[]
}) {
  const accents = new Set(accent.map((w) => w.toLowerCase().replace(/[.,&!?]/g, "")))
  const per = mode === "chars" ? 0.022 : 0.05
  const variants = {
    hidden: { y: "118%", rotate: mode === "chars" ? 5 : 0 },
    show: (i: number) => ({
      y: "0%",
      rotate: 0,
      transition: { duration: 0.85, delay: delay + i * per, ease: EASE },
    }),
  }
  const isAccent = (w: string) => accents.has(w.toLowerCase().replace(/[.,&!?]/g, ""))
  const words = text.split(" ")
  let unit = 0

  return (
    <Tag className={cn("font-display", className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        {...(onMount
          ? { animate: ready ? "show" : "hidden" }
          : { whileInView: "show", viewport: VIEWPORT })}
        className="inline"
      >
        {words.map((word, wi) => {
          const acc = isAccent(word)
          if (mode === "chars") {
            return (
              <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
                {word.split("").map((ch, ci) => {
                  const i = unit++
                  return (
                    <span key={ci} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                      <motion.span
                        custom={i}
                        variants={variants}
                        className={cn("inline-block will-change-transform", acc && "text-[#c02528]")}
                      >
                        {ch}
                      </motion.span>
                    </span>
                  )
                })}
                {wi < words.length - 1 && "\u00A0"}
              </span>
            )
          }
          const i = unit++
          return (
            <span key={`${word}-${wi}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                custom={i}
                variants={variants}
                className={cn("inline-block will-change-transform", acc && "text-[#c02528]")}
              >
                {word}
                {wi < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}

/** Mono metadata label with index, e.g. “SYS.02 — Selected Work”. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string
  children: ReactNode
  className?: string
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.34em] text-[#a1a1aa]",
        className,
      )}
    >
      <span className="inline-block size-1.5 rotate-45 bg-[#c02528]" />
      {index && <span className="text-[#c02528]">SYS.{index}</span>}
      <span>{children}</span>
    </motion.span>
  )
}
