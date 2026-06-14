"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { EASE, VIEWPORT } from "@/lib/motion"
import { about, education, identity, languages } from "@/lib/site-content"
import { RevealText, SectionLabel } from "@/components/ui/RevealText"

/** About — asymmetric editorial split with a masked, scan-lit portrait. */
export function AboutStudio() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section id="about" ref={ref} className="relative scroll-mt-20 py-28 lg:py-40">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Masked portrait */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10% round 28px)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
            viewport={VIEWPORT}
            transition={{ duration: 1.1, ease: EASE }}
            className="group relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-white/[0.08] lg:max-w-none"
          >
            <motion.img
              src="/luka-hero.jpg"
              alt={identity.name}
              style={{ y: imgY }}
              className="h-[112%] w-full scale-[1.06] object-cover object-[62%_center] [filter:grayscale(0.3)_brightness(0.85)] transition-[filter] duration-700 group-hover:[filter:grayscale(0)_brightness(0.95)]"
            />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,8,0.65),transparent_45%)]" />
            {/* scan line */}
            <motion.div
              aria-hidden
              animate={{ y: ["-10%", "110%"] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-[#c02528]/[0.12] to-transparent"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="font-display text-lg text-white">{identity.name}</p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.26em] text-white/55">
                  {identity.role}
                </p>
              </div>
              <img src="/logo-red-mark.png" alt="" aria-hidden className="size-9 object-contain opacity-90" />
            </div>
          </motion.div>

          {/* Copy */}
          <div>
            <SectionLabel index="07">{about.label}</SectionLabel>
            <RevealText
              text={about.heading}
              accent={["one"]}
              className="mt-7 text-balance text-3xl leading-[1.06] text-white sm:text-4xl lg:text-5xl"
            />
            <div className="mt-8 max-w-xl space-y-5">
              {about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                  className="text-pretty leading-relaxed text-[#a1a1aa]"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.dl
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-10 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2"
            >
              {about.facts.map((f) => (
                <div key={f.k} className="bg-[#0a0a0d] px-5 py-4">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.26em] text-white/35">{f.k}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-white">{f.v}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
              className="mt-5 grid max-w-xl grid-cols-1 gap-5 lg:grid-cols-2"
            >
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#c02528]">Education</p>
                <div className="mt-4 space-y-4">
                  {education.map((item) => (
                    <div key={item.title}>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/45">{item.school}</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/30">{item.period}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#c02528]">Languages</p>
                <div className="mt-4 space-y-3">
                  {languages.map((item) => (
                    <div key={item.language} className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                      <p className="text-sm font-semibold text-white">{item.language}</p>
                      <p className="text-right text-xs text-white/45">{item.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
