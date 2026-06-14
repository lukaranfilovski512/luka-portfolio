"use client"

import { useEffect } from "react"

/**
 * Lightweight Lenis-style inertial scrolling, implemented locally
 * (no extra dependency). Wheel input is eased toward its target with
 * a lerp on requestAnimationFrame.
 *
 * Deliberately conservative:
 * - desktop only (fine pointer + hover)
 * - disabled for prefers-reduced-motion
 * - pauses whenever body scroll is locked (project modal / mobile menu)
 * - touch, keyboard and scrollbar dragging stay fully native
 */
export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return

    let target = window.scrollY
    let current = window.scrollY
    let raf = 0
    let animating = false

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const loop = () => {
      current += (target - current) * 0.092
      if (Math.abs(target - current) < 0.5) {
        current = target
        animating = false
        window.scrollTo(0, current)
        return
      }
      window.scrollTo(0, current)
      raf = window.requestAnimationFrame(loop)
    }

    const start = () => {
      if (!animating) {
        animating = true
        raf = window.requestAnimationFrame(loop)
      }
    }

    const onWheel = (e: WheelEvent) => {
      // Let zoom / horizontal gestures / locked-scroll states behave natively.
      if (e.ctrlKey || e.metaKey || e.shiftKey) return
      if (document.body.style.overflow === "hidden") return
      // Skip when scrolling inside a nested scrollable element (e.g. modal).
      let el = e.target as HTMLElement | null
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el)
        if (
          (style.overflowY === "auto" || style.overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          return
        }
        el = el.parentElement
      }

      e.preventDefault()
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY * unit))
      start()
    }

    // Keep our target in sync with native scrolling (anchors, keyboard, drag).
    const onScroll = () => {
      if (!animating) {
        target = window.scrollY
        current = window.scrollY
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("scroll", onScroll)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
