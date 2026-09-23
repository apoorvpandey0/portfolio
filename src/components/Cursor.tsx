import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../lib/hooks'
import { useMotion } from '../lib/motion'

// A ring that trails the pointer and grows into a label over [data-cursor] elements.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLSpanElement>(null)
  const { reduced } = useMotion()
  const fine = useMediaQuery('(pointer: fine)')
  const enabled = fine && !reduced

  useEffect(() => {
    const el = ring.current
    if (!enabled || !el) return
    let x = -100, y = -100, tx = -100, ty = -100
    let raf = 0
    const loop = () => {
      x += (tx - x) * 0.22
      y += (ty - y) * 0.22
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      tx = e.clientX
      ty = e.clientY
      el.classList.add('show')
      const target = (e.target as HTMLElement).closest?.<HTMLElement>('[data-cursor]')
      el.classList.toggle('big', !!target)
      if (text.current) text.current.textContent = target?.dataset.cursor ?? ''
    }
    const onLeave = () => el.classList.remove('show')
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      el.classList.remove('show', 'big')
    }
  }, [enabled])

  return (
    <div ref={ring} className="cursor" aria-hidden="true">
      <span ref={text} />
    </div>
  )
}
