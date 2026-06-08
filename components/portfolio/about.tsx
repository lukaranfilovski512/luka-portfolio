"use client"

import { Reveal, SectionLabel } from "./reveal"
import { Check } from "lucide-react"

const focus = [
  "Brand identity",
  "Social media design",
  "Marketing campaigns",
  "Product promotions",
  "UI/UX design concepts",
  "Business visual communication",
  "Creative direction",
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionLabel>About</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                A designer who understands both aesthetics and business.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {focus.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-card/40 px-3.5 py-3 text-sm"
                  >
                    <Check className="size-4 shrink-0 text-primary" />
                    <span className="text-foreground/90">{f}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={0.05}>
              <p className="text-pretty text-lg leading-relaxed text-foreground/90">
                Luka is a creative designer focused on helping brands look more professional,
                recognizable, and commercially stronger. He combines visual design, marketing
                strategy, branding, and modern digital presentation into one consistent system.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Every project starts with the business behind it — its audience, market position,
                and goals. From there, the work moves into a clear visual direction that scales
                across social media, campaigns, branding, and digital products without losing
                its identity.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                The result is design that does more than look good — it builds trust, sharpens
                communication, and gives businesses a stronger presence in their market.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <figure className="mt-4 rounded-2xl border border-border bg-card/50 p-6">
                <blockquote className="text-pretty text-lg font-medium leading-relaxed text-foreground">
                  &ldquo;Good design isn&apos;t decoration. It&apos;s how a business earns
                  attention, trust, and growth.&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-primary/35 bg-primary/10 p-2 shadow-[0_0_35px_-14px_var(--color-primary)]">
                    <img src="/logo-red-mark.png" alt="Bukaranfilovski red logo mark" className="h-full w-full object-contain" />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Luka Karanfilovski · Creative Designer
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
