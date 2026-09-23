import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { startSmoothScroll, stopSmoothScroll } from './scroll'
import { readStore, writeStore } from './storage'

type MotionState = { reduced: boolean; setReduced: (reduced: boolean) => void }

const MotionContext = createContext<MotionState>({ reduced: false, setReduced: () => {} })

const query = () => window.matchMedia('(prefers-reduced-motion: reduce)')

// One switch for every effect on the page: the OS setting by default,
// overridable from the command palette.
export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReducedState] = useState(() => {
    const saved = readStore('motion')
    return saved ? saved === 'off' : query().matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('rm', reduced)
    if (reduced) stopSmoothScroll()
    else startSmoothScroll()
    return stopSmoothScroll
  }, [reduced])

  useEffect(() => {
    const mq = query()
    const onChange = (e: MediaQueryListEvent) => {
      if (!readStore('motion')) setReducedState(e.matches)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setReduced = (value: boolean) => {
    writeStore('motion', value ? 'off' : 'on')
    setReducedState(value)
  }

  return <MotionContext.Provider value={{ reduced, setReduced }}>{children}</MotionContext.Provider>
}

export const useMotion = () => useContext(MotionContext)
