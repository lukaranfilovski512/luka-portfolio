"use client"

import { useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

/**
 * NoiseOverlay intentionally renders nothing in production.
 * A fixed animated grain layer looked premium but added full-screen repaint work
 * during scroll on some browsers/devices.
 */
export function NoiseOverlay() {
  return null
}

/** Top scroll progress hairline — transform-only, no layout-triggering width changes. */
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

/**
 * CursorAura intentionally renders nothing in production.
 * The old 600px fixed cursor-following gradient caused high-frequency repaint work.
 */
export function CursorAura() {
  return null
}

/** Restores scroll to top on reload for a clean first view. */
export function PageRestore() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
  }, [])
  return null
}
