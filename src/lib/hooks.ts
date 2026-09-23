import { useEffect, useState, type RefObject } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export function useInView(ref: RefObject<Element>, threshold = 0) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return inView
}

// Animates a number from 0 to `target` once `active` becomes true.
export function useCountUp(target: number, active: boolean, reduced: boolean, duration = 1200) {
  const [value, setValue] = useState(active ? target : 0)
  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    if (reduced) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setValue(target * (1 - Math.pow(1 - p, 4)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, reduced, duration])
  return value
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
