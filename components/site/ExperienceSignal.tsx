"use client"

import { motion } from "framer-motion"
import { EASE, VIEWPORT } from "@/lib/motion"
import { experience } from "@/lib/site-content"
import { RevealText, SectionLabel } from "@/components/ui/RevealText"
import { cn } from "@/lib/utils"

/**
 * Career signal path: a central line carries a traveling red pulse as
 * you scroll; stations alternate sides on desktop, stack on mobile.
 */
export function ExperienceSignal() {
  return (
    <section id="experience" className="relative scroll-mt-20 py-28 lg:py-40">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8">
        <SectionLabel index="04">Experience</SectionLabel>
        <RevealText
          text="The signal path."
          className="mt-7 text-4xl uppercase leading-[0.98] tracking-tight text-white sm:text-6xl"
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Center line + traveling pulse */}
          <div aria-hidden className="absolute inset-y-0 left-[11px] w-px bg-white/[0.08] lg:left-1/2" />
          <div
            aria-hidden
            className="absolute inset-y-0 left-[11px] w-px bg-gradient-to-b from-[#c02528] via-[#c02528]/70 to-[#801316]/60 lg:left-1/2"
          />
          <div
            aria-hidden
            className="absolute left-[11px] top-2 z-10 -ml-[5px] hidden size-[11px] rounded-full bg-[#c02528] shadow-[0_0_18px_2px_rgba(192,37,40,0.45)] lg:left-1/2 lg:block"
          />

          <div className="space-y-12 lg:space-y-20">
            {experience.map((job, i) => {
              const left = i % 2 === 0
              return (
                <motion.article
                  key={job.company}
                  initial={{ opacity: 0, y: 30, x: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.85, delay: 0.05, ease: EASE }}
                  className={cn(
                    "relative pl-10 lg:w-[calc(50%-2.5rem)] lg:pl-0",
                    left ? "lg:mr-auto lg:text-right" : "lg:ml-auto",
                  )}
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-2 flex size-[23px] items-center justify-center",
                      "left-0 lg:left-auto",
                      left ? "lg:-right-[3.22rem]" : "lg:-left-[3.22rem]",
                    )}
                  >
                    {job.current && <span className="absolute size-full animate-ping rounded-full bg-[#c02528]/30" />}
                    <span className="absolute size-full rounded-full border border-[#c02528]/40" />
                    <span className="size-[9px] rounded-full bg-[#c02528] shadow-[0_0_16px_#c02528]" />
                  </span>

                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#c02528]">
                    {job.period}
                    {job.current && <span className="ml-2 text-white/40">· LIVE</span>}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-white sm:text-3xl">{job.company}</h3>
                  <p className="mt-1 text-sm font-medium text-white/70">{job.role}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">{job.location}</p>
                  <p className={cn("mt-4 text-sm leading-relaxed text-[#a1a1aa]", left ? "lg:ml-auto" : "", "max-w-md")}>
                    {job.text}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
