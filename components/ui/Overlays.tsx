"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion"

/** Animated film-grain overlay (two-frame shift, GPU-cheap). */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="noise-overlay pointer-events-none fixed inset-0 z-[60] animate-[grain_900ms_steps(2)_infinite] opacity-[0.04] mix-blend-overlay"
    />
  )
}

/** Top scroll progress hairline. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-[#801316] via-[#c02528] to-[#c02528]"
    />
  )
}

/** Soft red aura trailing the cursor (desktop only). */
export function CursorAura() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return
    setEnabled(true)
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 300)
      y.set(e.clientY - 300)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[1] size-[600px] rounded-full bg-[radial-gradient(circle,rgba(192,37,40,0.065)_0%,rgba(192,37,40,0.02)_45%,transparent_68%)]"
    />
  )
}

/** Restores scroll to top on reload for a clean intro. */
export function PageRestore() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
  }, [])
  return null
}
