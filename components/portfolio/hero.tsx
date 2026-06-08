"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24 sm:pt-40 lg:pt-44 lg:pb-32">
      {/* Luka portrait background */}
      <motion.img
        src="/luka-hero.jpg"
        alt="Luka Karanfilovski portrait"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-0 h-full w-full object-cover object-[66%_center] opacity-95"
      />

      {/* Premium cinematic overlays for readability and soft transition */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,10,0.98)_0%,rgba(6,7,10,0.88)_25%,rgba(6,7,10,0.52)_48%,rgba(6,7,10,0.18)_70%,rgba(6,7,10,0.28)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_22%_48%,rgba(192,34,39,0.30),transparent_36%),radial-gradient(circle_at_78%_30%,rgba(192,34,39,0.12),transparent_32%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent via-background/75 to-background"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/70 to-transparent"
      />

      <div className="relative mx-auto flex max-w-6xl items-center px-5">
        {/* Left copy */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3.5 py-1.5 text-xs text-white/70 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md"
          >
            <Sparkles className="size-3.5 text-primary" />
            6+ Years Experience · Creative Lead · Brand Creator
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-7xl"
          >
            Designing Brands, Campaigns &amp;{" "}
            <span className="text-gradient">Digital Experiences</span> That Look Premium.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/68 sm:text-lg"
          >
            I help businesses build stronger visual identities through branding, graphic design,
            social media content, marketing campaigns, and modern UI/UX design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_50px_-18px_rgba(192,34,39,0.9)] transition-all hover:scale-[1.02] hover:shadow-[0_22px_70px_-18px_rgba(192,34,39,1)]"
            >
              View My Work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-black/25 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              Let&apos;s Work Together
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              { v: "6+", l: "Years designing" },
              { v: "40+", l: "Brands & campaigns" },
              { v: "100%", l: "Custom, no templates" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="text-2xl font-bold tracking-tight text-white">{s.v}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-white/55">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
