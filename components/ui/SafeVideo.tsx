"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Video element with poster, metadata-only preload and graceful failure
 * (renders nothing instead of a broken player).
 */
export function SafeVideo({
  src,
  poster,
  w,
  h,
  controls = true,
  className,
  label,
}: {
  src: string
  poster?: string
  w: number
  h: number
  controls?: boolean
  className?: string
  label?: string
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
      aria-label={label}
      className={cn("h-full w-full bg-black object-contain", className)}
      style={{ aspectRatio: `${w} / ${h}` }}
    />
  )
}
