"use client"

import { BriefcaseBusiness, GraduationCap, Languages, Phone, Mail } from "lucide-react"
import { Reveal, SectionLabel } from "./reveal"

const experience = [
  {
    role: "Freelance Social Media Designer",
    company: "Tehnotrans — Transportation Company",
    period: "2021 — 2024",
    description: "Created social media content and campaign visuals for a transportation company.",
  },
  {
    role: "Graphic Designer & Marketing Manager",
    company: "Mr. Bricolage",
    period: "2024 — 2025",
    description: "Created social media and marketing content for Mr. Bricolage.",
  },
  {
    role: "Graphic Designer",
    company: "Vendor Macedonia",
    period: "2025 — 2025",
    description: "Created social media content for various brands.",
  },
  {
    role: "Senior Designer & Creative Lead",
    company: "Mono Alex",
    period: "September 2025 — March 2026",
    description: "Led creative direction, visual content, and brand-focused design execution.",
  },
  {
    role: "Creative Lead & Marketing Strategist",
    company: "Battery Evolution",
    period: "March 2026 — Present",
    description: "Developing marketing strategy, brand communication, campaign visuals, social media systems, and B2B/B2C creative direction.",
  },
  {
    role: "Freelance Graphic Designer",
    company: "By Karanfilovski",
    period: "2021 — Present",
    description: "Ongoing private freelance work covering logos, brand identity, social media visuals, print materials, and web banners.",
  },
]

const languages = [
  { name: "Macedonian", level: "Native language" },
  { name: "English", level: "Intermediate B1" },
]

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-24 top-28 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel>Experience</SectionLabel>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal delay={0.05}>
            <div>
              <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Six years of building visual systems for real businesses.
              </h2>
              <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                Since 2021, my work has grown from freelance social media design into creative leadership,
                marketing strategy, branding, and complete digital presentation for businesses.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card/45 p-5">
                  <GraduationCap className="size-5 text-primary" />
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Education</div>
                  <div className="mt-2 text-lg font-semibold">Academy for Design</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Graphic Design Department · Skala School by Djolev · 2023 — 2024
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card/45 p-5">
                  <Languages className="size-5 text-primary" />
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Languages</div>
                  <div className="mt-2 space-y-2">
                    {languages.map((language) => (
                      <div key={language.name} className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-foreground">{language.name}</span>
                        <span className="text-muted-foreground">{language.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a href="tel:+38970264286" className="group flex items-center gap-3 rounded-2xl border border-border bg-card/35 p-4 transition hover:border-primary/45">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Phone className="size-4" />
                  </span>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone / WhatsApp</div>
                    <div className="text-sm font-medium text-foreground">+389 70 264 286</div>
                  </div>
                </a>
                <a href="mailto:luka.karanfilovski512@gmail.com" className="group flex items-center gap-3 rounded-2xl border border-border bg-card/35 p-4 transition hover:border-primary/45 sm:col-span-2">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Mail className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="break-all text-sm font-medium leading-relaxed text-foreground">luka.karanfilovski512@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 hidden w-px bg-border sm:block" />
            <div className="space-y-4">
              {experience.map((item, index) => (
                <Reveal key={`${item.company}-${item.period}`} delay={index * 0.04}>
                  <article className="relative rounded-3xl border border-border bg-card/45 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card/65 sm:ml-10">
                    <span className="absolute -left-[3.05rem] top-7 hidden size-3 rounded-full bg-primary shadow-[0_0_22px_var(--color-primary)] sm:block" />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-primary">
                          <BriefcaseBusiness className="size-4" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.24em]">{item.period}</span>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.role}</h3>
                        <p className="mt-1 font-medium text-foreground/80">{item.company}</p>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
