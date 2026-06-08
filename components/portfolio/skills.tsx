"use client"

import { motion } from "framer-motion"
import { Reveal, SectionLabel } from "./reveal"

const tools = [
  { name: "Adobe Photoshop", icon: "/adobe-photoshop.png" },
  { name: "Adobe Illustrator", icon: "/adobe-illustrator.png" },
  { name: "Adobe Lightroom", icon: "/adobe-lightroom.png" },
  { name: "Adobe Premiere Pro", icon: "/adobe-premiere.png" },
]

const skills = [
  "Figma",
  "Adobe Pro",
  "Social Media Design",
  "Branding",
  "Typography",
  "Layout Design",
  "Marketing Strategy",
  "UI/UX Concepts",
  "Visual Storytelling",
  "Art Direction",
  "Creative Direction",
  "Print Design",
]

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...skills, ...skills]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        aria-hidden={reverse}
        className="flex shrink-0 gap-3 pr-3"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {items.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="whitespace-nowrap rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm text-foreground/90"
          >
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Skills() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto mb-16 max-w-6xl px-5">
        <Reveal>
          <SectionLabel>Skills &amp; Tools</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            The toolkit behind every premium result.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {tools.map((tool) => (
              <motion.div
                key={tool.name}
                whileHover={{ y: -6, scale: 1.035 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex min-h-[170px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-6 text-center shadow-[0_24px_80px_-65px_var(--color-primary)] transition duration-300 hover:border-primary/45 hover:shadow-[0_28px_110px_-62px_var(--color-primary)] sm:min-h-[190px]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-primary/15 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="relative mx-auto size-16 rounded-2xl object-contain brightness-125 shadow-[0_16px_45px_-25px_rgba(0,0,0,0.9)] transition duration-300 group-hover:scale-105 group-hover:brightness-150 sm:size-20"
                />
                <div className="relative mt-4 text-sm font-semibold text-foreground">{tool.name}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative mt-2 flex flex-col gap-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <Row />
        <Row reverse />
      </div>
    </section>
  )
}
