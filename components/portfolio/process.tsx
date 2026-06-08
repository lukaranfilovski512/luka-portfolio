"use client"

import { Reveal, SectionLabel } from "./reveal"

const steps = [
  {
    n: "01",
    title: "Understand the Brand",
    desc: "Research the business, audience, tone, market, and goals before a single pixel is placed.",
  },
  {
    n: "02",
    title: "Define the Direction",
    desc: "Create a clear visual and strategic direction so design decisions stay focused and consistent.",
  },
  {
    n: "03",
    title: "Design the System",
    desc: "Build strong visuals, layouts, content structure, and a consistent identity that scales.",
  },
  {
    n: "04",
    title: "Refine & Deliver",
    desc: "Polish every detail and prepare final assets ready for digital or print production.",
  },
]

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Process</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              A clear process that turns ideas into a system.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group relative h-full rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40">
                <span className="font-mono text-3xl font-bold text-primary/30 transition-colors group-hover:text-primary">
                  {s.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
