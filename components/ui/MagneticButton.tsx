"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

/** Wrapper whose child is gently pulled toward the cursor (desktop only). */
export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.3 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setEnabled(fine && !reduced)
  }, [])

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        if (!enabled || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={enabled ? { x: sx, y: sy } : undefined}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  )
}
