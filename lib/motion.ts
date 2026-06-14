/**
 * Shared motion language for the whole site.
 * One easing, consistent durations — so every animation feels related.
 */
export const EASE = [0.22, 1, 0.36, 1] as const

export const DUR = {
  hover: 0.3,
  fast: 0.5,
  base: 0.8,
  slow: 1.1,
} as const

export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const
