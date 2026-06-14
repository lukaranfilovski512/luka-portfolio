"use client"

import { motion } from "framer-motion"
import { EASE, VIEWPORT } from "@/lib/motion"
import { skillClusters, tools } from "@/lib/site-content"
import { RevealText, SectionLabel } from "@/components/ui/RevealText"

/** Designer operating system: Adobe dock tiles + skill cluster chips + marquee. */
export function SkillsDock() {
  const marquee = [...skillClusters, ...skillClusters]

  return (
    <section className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8">
        <SectionLabel index="06">Tools &amp; Skills</SectionLabel>
        <RevealText
          text="The operating system."
          className="mt-7 text-4xl uppercase leading-[0.98] tracking-tight text-white sm:text-6xl"
        />

        {/* Adobe dock */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.75, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0d] p-6 sm:p-7"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-[#c02528] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
              />
              <div className="flex items-center justify-between">
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="size-14 rounded-xl object-contain shadow-[0_14px_40px_-22px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:scale-105 sm:size-16"
                />
                <span className="font-mono text-[10px] tracking-[0.25em] text-white/25">{tool.short}</span>
              </div>
              <p className="mt-6 text-sm font-semibold text-white">{tool.name}</p>
              {/* dock reflection */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 left-6 h-10 w-14 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent blur-sm sm:w-16"
              />
            </motion.div>
          ))}
        </div>

        {/* Skill clusters */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {skillClusters.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs text-white/65 transition-colors duration-300 hover:border-[#c02528]/45 hover:text-white"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <div aria-hidden className="relative mt-16 select-none overflow-hidden border-y border-white/[0.05] py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#060608] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#060608] to-transparent" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
          className="flex w-max items-center whitespace-nowrap"
        >
          {marquee.map((s, i) => (
            <span key={`${s}-${i}`} className="flex items-center">
              <span
                className="font-display text-4xl uppercase tracking-tight text-transparent sm:text-5xl"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.16)" }}
              >
                {s}
              </span>
              <span className="mx-7 size-1.5 rotate-45 bg-[#c02528]" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
