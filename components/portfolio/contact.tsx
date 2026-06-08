"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail, Instagram, MapPin, Phone } from "lucide-react"
import { Reveal } from "./reveal"

const phone = "+389 70 264 286"
const whatsapp = "https://wa.me/38970264286"
const email = "luka.karanfilovski512@gmail.com"

const details = [
  {
    icon: Mail,
    label: "Email",
    value: email,
    href: `mailto:${email}`,
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: phone,
    href: whatsapp,
    external: true,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@by_karanfilovski",
    href: "https://www.instagram.com/by_karanfilovski/",
    external: true,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Skopje, Macedonia",
    href: undefined,
  },
]

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 sm:p-12 lg:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-primary/15 blur-[120px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 right-0 size-72 rounded-full bg-chart-2/10 blur-[120px]"
            />

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  Ready to Build a Stronger Visual Presence?
                </h2>
                <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                  Let&apos;s create a brand, campaign, or digital experience that looks
                  professional, premium, and built for growth.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <motion.a
                    href="/start-project"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_40px_-10px_var(--color-primary)]"
                  >
                    Start a Project
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </motion.a>
                  <a
                    href={whatsapp}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-background"
                  >
                    Contact Me on WhatsApp
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {details.map((d) => {
                  const Inner = (
                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-background/40 px-5 py-4 transition-colors hover:border-primary/40">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                        <d.icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {d.label}
                        </div>
                        <div className="break-all text-sm font-medium leading-relaxed text-foreground">
                          {d.value}
                        </div>
                      </div>
                    </div>
                  )
                  return d.href ? (
                    <a
                      key={d.label}
                      href={d.href}
                      target={"external" in d && d.external ? "_blank" : undefined}
                      rel={"external" in d && d.external ? "noopener noreferrer" : undefined}
                      className="block"
                    >
                      {Inner}
                    </a>
                  ) : (
                    <div key={d.label}>{Inner}</div>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
