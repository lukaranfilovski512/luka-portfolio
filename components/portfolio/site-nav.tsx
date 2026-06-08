"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-5 sm:py-2.5",
          scrolled || open
            ? "border-border bg-card/78 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-white/5 bg-black/12 backdrop-blur-md md:border-transparent md:bg-transparent",
        )}
      >
        <a
          href="#"
          className="group flex min-w-0 items-center"
          aria-label="Bukaranfilovski home"
          onClick={() => setOpen(false)}
        >
          <img
            src="/complete-logo.png"
            alt="Bukaranfilovski official logo"
            className="h-5 w-auto max-w-[150px] object-contain opacity-95 transition duration-300 group-hover:opacity-100 sm:h-7 sm:max-w-[220px]"
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/start-project"
          className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-[1.03] lg:inline-block"
        >
          Let&apos;s talk
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background/35 text-foreground backdrop-blur lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-3 top-[4.6rem] overflow-hidden rounded-[1.6rem] border border-border bg-card/95 p-3 shadow-[0_30px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-2xl lg:hidden"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/20 blur-3xl" />
            <ul className="relative grid grid-cols-1 gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="/start-project"
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl bg-primary px-4 py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-[0_12px_40px_-18px_var(--color-primary)]"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
