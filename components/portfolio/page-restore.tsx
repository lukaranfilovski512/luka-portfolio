"use client"

import { useEffect } from "react"

export function PageRestore() {
  useEffect(() => {
    const restore = () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      document.body.style.opacity = "1"
    }

    restore()
    window.addEventListener("pageshow", restore)
    window.addEventListener("focus", restore)

    return () => {
      window.removeEventListener("pageshow", restore)
      window.removeEventListener("focus", restore)
    }
  }, [])

  return null
}
