"use client"

import { Reveal, SectionLabel } from "./reveal"
import { motion } from "framer-motion"
import {
  Fingerprint,
  Instagram,
  Megaphone,
  MonitorSmartphone,
  Printer,
  Compass,
  type LucideIcon,
} from "lucide-react"

type Service = {
  icon: LucideIcon
  title: string
  desc: string
}

const services: Service[] = [
  {
    icon: Fingerprint,
    title: "Branding & Visual Identity",
    desc: "Logo direction, brand systems, typography, colors, and visual consistency that make a business instantly recognizable.",
  },
  {
    icon: Instagram,
    title: "Social Media Design",
    desc: "Instagram posts, carousels, campaigns, content systems, and promotional visuals built to perform and convert.",
  },
  {
    icon: Megaphone,
    title: "Marketing Campaigns",
    desc: "Sales-focused campaign concepts, monthly content planning, product launches, and creative ads.",
  },
  {
    icon: MonitorSmartphone,
    title: "UI/UX Design",
    desc: "Landing pages, app screens, user flows, and modern interface concepts that feel premium and clear.",
  },
  {
    icon: Printer,
    title: "Print & Outdoor Design",
    desc: "Stickers, banners, vouchers, stands, posters, and promotional materials prepared for real production.",
  },
  {
    icon: Compass,
    title: "Creative Direction",
    desc: "Premium visual strategy for businesses that want a stronger, more consistent market presence.",
  },
]

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <SectionLabel>Services</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Everything a brand needs to look premium and sell better.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
              From the first logo to a full campaign system — one designer, one consistent
              standard.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon: Icon, title, desc }: Service) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40"
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/20"
      />
      <div className="relative">
        <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-5" />
        </div>
        <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </motion.div>
  )
}
