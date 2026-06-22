"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Copy, ExternalLink, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { EASE, VIEWPORT } from "@/lib/motion"
import { contact, identity } from "@/lib/site-content"
import { RevealText, SectionLabel } from "@/components/ui/RevealText"
import { MagneticButton } from "@/components/ui/MagneticButton"

const emailSubject = encodeURIComponent("Portfolio Inquiry")
const emailBody = encodeURIComponent(
  "Hi Luka,\n\nI saw your portfolio and would like to contact you about a project.\n\n",
)
const mailHref = `mailto:${identity.email}?subject=${emailSubject}&body=${emailBody}`
const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${identity.email}&su=${emailSubject}&body=${emailBody}`
const phoneHref = "tel:+38970264286"
const instagramHref = "https://www.instagram.com/by_karanfilovski/"

const contactCards = [
  {
    label: "Email",
    value: identity.email,
    href: mailHref,
    icon: Mail,
  },
  {
    label: "Phone",
    value: identity.phone,
    href: phoneHref,
    icon: Phone,
  },
  {
    label: "Location",
    value: identity.location,
    href: "#contact",
    icon: MapPin,
  },
  {
    label: "Instagram",
    value: `@${identity.instagram}`,
    href: instagramHref,
    icon: Instagram,
  },
]

/** Cinematic closing frame: clear direct contact details and functional actions. */
export function ContactCTA() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = mailHref
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c02528]/[0.09] blur-2xl opacity-70"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_30px_120px_-70px_rgba(0,0,0,0.95)] sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <SectionLabel index="08">{contact.label}</SectionLabel>

              <RevealText
                text={contact.heading}
                accent={["brand."]}
                className="mt-9 max-w-4xl text-balance text-4xl uppercase leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl"
              />

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="mt-7 max-w-2xl text-pretty leading-relaxed text-[#a1a1aa]"
              >
                {contact.sub}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end"
            >
              <MagneticButton className="block w-full sm:w-auto">
                <a
                  href={gmailHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open Gmail compose for ${identity.email}`}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.02] px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#c02528]/60 sm:w-auto"
                >
                  <ExternalLink className="size-4" />
                  Open Gmail
                </a>
              </MagneticButton>
              <MagneticButton className="block w-full sm:w-auto">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.02] px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#c02528]/60 sm:w-auto"
                >
                  {copied ? <Check className="size-4 text-[#c02528]" /> : <Copy className="size-4" />}
                  {copied ? "Email copied" : "Copy Email"}
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {contactCards.map((item) => {
              const Icon = item.icon
              const isLocation = item.label === "Location"
              const content = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035] text-[#c02528]">
                      <Icon className="size-4" />
                    </span>
                    {!isLocation && <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/25">Open</span>}
                  </div>
                  <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">{item.label}</p>
                  <p className="mt-2 break-words text-sm font-medium text-white/80">{item.value}</p>
                </>
              )

              return isLocation ? (
                <div key={item.label} className="rounded-[1.5rem] border border-white/[0.07] bg-[#060608]/45 p-5">
                  {content}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Instagram" ? "_blank" : undefined}
                  rel={item.label === "Instagram" ? "noopener noreferrer" : undefined}
                  className="group rounded-[1.5rem] border border-white/[0.07] bg-[#060608]/45 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c02528]/45 hover:bg-white/[0.035]"
                >
                  {content}
                </a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
