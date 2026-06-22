"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react"
import { EASE } from "@/lib/motion"
import { hero, identity } from "@/lib/site-content"
import { useReady } from "@/components/site/Intro"
import { RevealText } from "@/components/ui/RevealText"
import { MagneticButton } from "@/components/ui/MagneticButton"

const ThreeCore = dynamic(() => import("@/components/site/ThreeCore").then((m) => m.ThreeCore), {
  ssr: false,
})

export function Hero() {
  const ready = useReady()
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 0.5, delay, ease: EASE },
  })

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 lg:pt-28">
      {/* Architectural grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:clamp(80px,12vw,180px)_100%]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#060608]" />

      {/* 3D Creative Core — kept subtle behind the hero composition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="absolute inset-y-0 right-[-28%] w-[118%] sm:right-[-18%] sm:w-[86%] lg:right-0 lg:w-[58%]"
      >
        <ThreeCore />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
          {/* ── Copy ───────────────────────────────────────────── */}
          <motion.div className="relative z-10">
            <motion.div {...fadeUp(0.05)} className="mb-7 flex items-center gap-3">
              <span className="size-1.5 rotate-45 bg-[#c02528]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-[#c02528] sm:text-[11px]">
                {hero.eyebrow}
              </p>
            </motion.div>

            <h1 className="mt-7">
              {hero.titleLines.map((line, i) => (
                <RevealText
                  key={line}
                  as="span"
                  mode="chars"
                  text={line}
                  accent={i === hero.accentLine ? [line.split(" ").pop() ?? ""] : []}
                  onMount
                  ready={ready}
                  delay={0.08 + i * 0.1}
                  className="block text-[12.2vw] uppercase leading-[0.93] tracking-tight text-white sm:text-[4.45rem] lg:text-[5.35rem] xl:text-[6.35rem]"
                />
              ))}
            </h1>

            <motion.p {...fadeUp(0.35)} className="mt-7 max-w-xl text-pretty leading-relaxed text-white/60 sm:text-lg">
              {hero.subtitle}
            </motion.p>

            <motion.div {...fadeUp(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton className="block w-full sm:w-auto">
                <a
                  href="#work"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c02528] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_60px_-18px_rgba(192,37,40,0.9)] transition-shadow duration-300 hover:shadow-[0_24px_80px_-18px_rgba(192,37,40,1)] sm:w-auto"
                >
                  {hero.ctas.primary}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </MagneticButton>
              <MagneticButton className="block w-full sm:w-auto">
                <a
                  href="#contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.02] px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#c02528]/60 sm:w-auto"
                >
                  {hero.ctas.secondary}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </MagneticButton>
            </motion.div>

            <motion.p {...fadeUp(0.52)} className="mt-8 max-w-xl text-sm leading-relaxed text-white/45">
              {hero.positioning}
            </motion.p>

            <motion.div {...fadeUp(0.58)} className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5">
                <span className="size-1.5 rounded-full bg-[#c02528]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">
                  Freelance since 2020
                </span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                {identity.location}
              </span>
            </motion.div>
          </motion.div>

          {/* ── Premium portrait frame ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
            className="relative z-10 mx-auto w-full max-w-[540px] lg:max-w-[590px]"
          >
            <div aria-hidden className="absolute -inset-5 rounded-[2.5rem] bg-[#c02528]/12 blur-2xl" />
            <div aria-hidden className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-white/[0.14] via-white/[0.03] to-[#c02528]/20" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.035] shadow-[0_30px_100px_-50px_rgba(0,0,0,0.95)]">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.85rem]">
                <Image
                  src="/luka-hero-premium.webp"
                  alt="Luka Karanfilovski"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 590px"
                  className="object-cover object-center"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#060608]/35 via-transparent to-[#060608]/5" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/[0.08]" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">
              <span className="shrink-0">{identity.name}</span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#c02528]/70 to-transparent" />
              <span className="shrink-0 text-[#c02528]">Est. 2020</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#signal"
        aria-label="Scroll to creative signal"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/35 transition-colors hover:text-white lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
