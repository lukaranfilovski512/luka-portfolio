"use client"

import { Quote } from "lucide-react"
import { Reveal, SectionLabel } from "./reveal"

const quotes = [
  {
    text: "A premium visual approach that makes automotive, service and retail campaigns feel more professional, clear and sales-focused.",
    label: "Automotive & Service Brands",
  },
  {
    text: "Strong understanding of brand presentation, social media systems and consistent visual communication for growing businesses.",
    label: "Retail & Local Businesses",
  },
  {
    text: "Clean, modern and organized design direction across digital content, event promotion, music visuals and community pages.",
    label: "Hospitality, Events & Entertainment",
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel>Client Feedback</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Trusted for visual direction across real business categories.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {quotes.map((q, index) => (
            <Reveal key={q.label} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-border bg-card/45 p-6">
                <Quote className="size-5 text-primary" />
                <p className="mt-5 text-pretty leading-relaxed text-foreground/90">
                  &ldquo;{q.text}&rdquo;
                </p>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {q.label}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
