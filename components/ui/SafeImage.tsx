"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Production-safe local image renderer.
 *
 * Valid images are rendered immediately instead of being hidden behind a
 * load-state skeleton. This avoids the cached/mobile onLoad edge case that was
 * leaving Featured Case image cards black even though the files existed.
 */
export function SafeImage({
  src,
  alt,
  w,
  h,
  className,
  imgClassName,
  eager = false,
}: {
  src: string
  alt: string
  w?: number
  h?: number
  className?: string
  imgClassName?: string
  eager?: boolean
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return null

  return (
    <div
      className={cn("relative overflow-hidden bg-white/[0.03]", className)}
      style={w && h ? { aspectRatio: `${w} / ${h}` } : undefined}
    >
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        onError={() => setFailed(true)}
        className={cn("block h-full w-full object-cover", imgClassName)}
      />
    </div>
  )
}
