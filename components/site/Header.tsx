"use client"

import { useEffect, useState, type MouseEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { EASE } from "@/lib/motion"
import { identity } from "@/lib/site-content"
import { cn } from "@/lib/utils"

const links = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
]

const contactHref = "#contact"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
    }, open ? 80 : 0)
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1480px] items-center justify-between gap-5 px-5 py-3 transition-all duration-500 sm:px-8 lg:py-3.5",
            scrolled
              ? "border-b border-white/[0.07] bg-[#060608]/78 shadow-[0_18px_70px_-45px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
              : "border-b border-white/[0.03] bg-[#060608]/25 backdrop-blur-sm",
          )}
        >
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            className="group flex shrink-0 items-center"
            aria-label="By Karanfilovski — back to top"
          >
            <img
              src="/horizontal-logo.png"
              alt="By Karanfilovski"
              className="h-8 w-auto max-w-[210px] object-contain transition-opacity duration-300 group-hover:opacity-80 sm:h-9"
            />
          </a>

          <nav className="flex items-center gap-3" aria-label="Primary navigation">
            <ul className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.025] p-1.5 backdrop-blur-xl lg:flex">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    data-active={active === l.id}
                    className={cn(
                      "rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300",
                      active === l.id
                        ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                        : "text-white/45 hover:bg-white/[0.04] hover:text-white",
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={contactHref}
              onClick={(e) => go(e, contactHref)}
              className="group hidden items-center gap-1.5 rounded-full bg-[#c02528] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_14px_45px_-15px_rgba(192,37,40,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-15px_rgba(192,37,40,1)] sm:inline-flex"
            >
              Email Me
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white backdrop-blur lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-y-0 right-0 z-40 flex w-full max-w-sm flex-col border-l border-white/[0.07] bg-[#060608]/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex-1 px-8 pt-28">
              <img src="/horizontal-logo.png" alt="By Karanfilovski" className="h-9 w-auto max-w-[240px] object-contain" />
              <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.34em] text-white/35">Navigation</p>
              <ul className="mt-6 space-y-2">
                {links.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.12 + i * 0.07, ease: EASE }}
                  >
                    <a
                      href={l.href}
                      onClick={(e) => go(e, l.href)}
                      className="group flex items-baseline gap-4 py-2 font-display text-4xl tracking-tight text-white/80 transition-colors hover:text-white"
                    >
                      <span className="font-mono text-[10px] tracking-[0.25em] text-[#c02528]">0{i + 1}</span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                href={contactHref}
                onClick={(e) => go(e, contactHref)}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#c02528] px-6 py-3.5 text-sm font-semibold text-white"
              >
                Email Me
                <ArrowUpRight className="size-4" />
              </motion.a>
            </div>
            <div className="border-t border-white/[0.06] px-8 py-6 font-mono text-[10px] uppercase tracking-[0.28em] text-white/30">
              {identity.brand} · {identity.location}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
