"use client"

import { identity } from "@/lib/site-content"

/** Minimal closing footer. */
export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div aria-hidden className="rule-red absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          <img src="/horizontal-logo.png" alt="By Karanfilovski" className="h-8 w-auto max-w-[220px] object-contain" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/30">
          © 2026 {identity.name} · {identity.location}
        </p>
      </div>
    </footer>
  )
}
