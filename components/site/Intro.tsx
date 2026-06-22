"use client"

import { createContext, useContext, type ReactNode } from "react"

const ReadyContext = createContext(true)

/** True once the page is ready for entrance animations. */
export function useReady() {
  return useContext(ReadyContext)
}

/**
 * Production performance mode: no blocking boot intro.
 * Recruiters should see the portfolio immediately on first cold load.
 */
export function IntroGate({ children }: { children: ReactNode }) {
  return <ReadyContext.Provider value={true}>{children}</ReadyContext.Provider>
}
