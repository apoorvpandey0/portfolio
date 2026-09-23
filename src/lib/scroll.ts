import Lenis from 'lenis'

let lenis: Lenis | null = null
let rafId = 0

export function startSmoothScroll() {
  if (lenis) return
  lenis = new Lenis({ lerp: 0.1 })
  const raf = (time: number) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
}

export function stopSmoothScroll() {
  cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
}

export function pauseSmoothScroll(paused: boolean) {
  if (paused) lenis?.stop()
  else lenis?.start()
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -72 })
  else el.scrollIntoView({ behavior: document.documentElement.classList.contains('rm') ? 'auto' : 'smooth' })
}
