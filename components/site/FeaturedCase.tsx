"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { EASE, VIEWPORT } from "@/lib/motion"
import { projects } from "@/lib/portfolio-data"
import { useCaseViewer } from "@/components/site/CaseViewer"
import { RevealText, SectionLabel } from "@/components/ui/RevealText"
import { SafeImage } from "@/components/ui/SafeImage"

/** Featured case — Orevce Cheese Packaging Design. */
export function FeaturedCase() {
  const { open: onOpen } = useCaseViewer()
  const featured = projects.find((p) => p.slug === "orevce-cheese-packaging-design") ?? projects.find((p) => p.featured)
  if (!featured) return null

  const validImages = featured.images.filter((image) => image.src && !image.src.toLowerCase().endsWith(".heic"))
  const heroImage = validImages[0]
  const supporting = validImages.slice(1, 5)

  return (
    <section className="relative py-28 lg:py-40">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c02528]/50 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[#c02528]/[0.07] blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/3 h-[22rem] w-[22rem] rounded-full bg-white/[0.035] blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel index="03">Featured Case</SectionLabel>
            <RevealText
              text={featured.title}
              accent={["Cheese"]}
              className="mt-7 text-4xl uppercase leading-[0.98] tracking-tight text-white sm:text-6xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#c02528]"
            >
              {featured.category} · {featured.client} · {featured.year}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
              className="mt-6 max-w-md text-pretty leading-relaxed text-[#a1a1aa]"
            >
              {featured.description}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.26, ease: EASE }}
              className="mt-8 space-y-2.5"
            >
              {[
                "Packaging and product branding direction",
                "Clean visual hierarchy for shelf presence",
                "Landscape artwork respected without harsh cropping",
                "Production-focused presentation and polish",
              ].map((line) => (
                <li key={line} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="size-1 rotate-45 bg-[#c02528]" />
                  {line}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <button
                type="button"
                onClick={() => onOpen(featured.slug)}
                className="group inline-flex items-center gap-2 rounded-full bg-[#c02528] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_50px_-18px_rgba(192,37,40,0.9)]"
              >
                View Case
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          <div className="space-y-5">
            {heroImage && (
              <motion.button
                type="button"
                onClick={() => onOpen(featured.slug)}
                initial={{ opacity: 0, y: 30, clipPath: "inset(8% 4% 8% 4% round 22px)" }}
                whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 22px)" }}
                viewport={VIEWPORT}
                transition={{ duration: 1, ease: EASE }}
                className="group w-full overflow-hidden rounded-[1.4rem] border border-white/[0.09] bg-[#08080b] p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c02528]/70"
                aria-label={`Open ${featured.title}`}
              >
                <SafeImage
                  src={heroImage.src}
                  alt={`${featured.title} — featured visual`}
                  w={heroImage.w}
                  h={heroImage.h}
                  eager
                  className="aspect-[16/9] rounded-xl bg-white/[0.02]"
                  imgClassName="object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                />
              </motion.button>
            )}

            <div className="grid grid-cols-2 gap-5">
              {supporting.map((img, i) => (
                <motion.button
                  key={img.src}
                  type="button"
                  onClick={() => onOpen(featured.slug)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                  className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08080b] p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c02528]/70"
                  aria-label={`Open ${featured.title} — visual ${i + 2}`}
                >
                  <SafeImage
                    src={img.src}
                    alt={`${featured.title} — supporting visual ${i + 2}`}
                    w={img.w}
                    h={img.h}
                    className="aspect-[16/9] rounded-xl"
                    imgClassName="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
