"use client"

import { motion } from "framer-motion"
import { EASE, VIEWPORT } from "@/lib/motion"
import { signal } from "@/lib/site-content"
import { RevealText, SectionLabel } from "@/components/ui/RevealText"

/** Creative philosophy — four principles presented as system modules. */
export function Signal() {
  return (
    <section id="signal" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8">
        <SectionLabel index="01">{signal.label}</SectionLabel>
        <RevealText
          text={signal.statement}
          accent={["sell.", "scale."]}
          className="mt-8 max-w-5xl text-balance text-3xl leading-[1.06] text-white sm:text-5xl lg:text-6xl"
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {signal.principles.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className="group relative overflow-hidden bg-[#0a0a0d] p-7 transition-colors duration-500 hover:bg-[#0d0d11] sm:p-8"
            >
              {/* scan line on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-[#c02528] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
              />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#c02528]">{p.n}</span>
              <h3 className="mt-5 font-display text-xl text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#a1a1aa]">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
