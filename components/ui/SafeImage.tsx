"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Production-safe optimized image renderer.
 * Uses next/image for responsive compression, lazy loading and stable layout.
 */
export function SafeImage({
  src,
  alt,
  w,
  h,
  className,
  imgClassName,
  eager = false,
  sizes = "(max-width: 768px) 92vw, (max-width: 1200px) 50vw, 720px",
}: {
  src: string
  alt: string
  w?: number
  h?: number
  className?: string
  imgClassName?: string
  eager?: boolean
  sizes?: string
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return null

  return (
    <div
      className={cn("relative overflow-hidden bg-white/[0.03]", className)}
      style={w && h ? { aspectRatio: `${w} / ${h}` } : undefined}
    >
      {w && h ? (
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          quality={82}
          priority={eager}
          loading={eager ? undefined : "lazy"}
          sizes={sizes}
          onError={() => setFailed(true)}
          className={cn("block h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          quality={82}
          priority={eager}
          loading={eager ? undefined : "lazy"}
          sizes={sizes}
          onError={() => setFailed(true)}
          className={cn("object-cover", imgClassName)}
        />
      )}
    </div>
  )
}
