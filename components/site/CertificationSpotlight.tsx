"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { certification } from "@/lib/site-content"
import { EASE, VIEWPORT } from "@/lib/motion"
import { RevealText, SectionLabel } from "@/components/ui/RevealText"

/** Dedicated diploma/certificate showcase placed after Experience. */
export function CertificationSpotlight() {
  return (
    <section id="certification" className="relative scroll-mt-24 py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c02528]/[0.08] blur-2xl opacity-70"
      />

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <SectionLabel index="05">{certification.label}</SectionLabel>
            <RevealText
              text={certification.heading}
              accent={["Diploma."]}
              className="mt-7 max-w-3xl text-balance text-4xl uppercase leading-[0.98] tracking-tight text-white sm:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
              className="mt-6 max-w-xl text-pretty leading-relaxed text-[#a1a1aa]"
            >
              {certification.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-8 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c02528]">{certification.credential}</p>
              <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">{certification.title}</h3>
              <p className="mt-2 text-sm font-medium text-white/65">{certification.issuer}</p>
              <p className="mt-4 leading-relaxed text-[#a1a1aa]">{certification.description}</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">{certification.issued}</p>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
              className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2"
            >
              {certification.facts.map((item) => (
                <div key={item.k} className="bg-[#0a0a0d] px-5 py-4">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.26em] text-white/35">{item.k}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-white">{item.v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.95, ease: EASE }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0a0a0d] p-3 shadow-[0_30px_120px_-70px_rgba(0,0,0,0.95)]"
          >
            <div aria-hidden className="absolute -inset-10 rounded-full bg-[#c02528]/[0.09] blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative overflow-hidden rounded-[1.4rem] border border-white/[0.06] bg-[#111113]">
              <Image
                src={certification.image}
                alt={certification.imageAlt}
                width={1462}
                height={1038}
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.015]"
              />
            </div>
            <div className="relative mt-4 flex flex-wrap items-center gap-3 px-2 pb-2">
              <span className="rounded-full border border-[#c02528]/30 bg-[#c02528]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#ff6a6d]">
                Verified Credential
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Skala School • Graphic Design</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
