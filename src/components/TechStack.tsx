import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { coreSkills, skills } from '../data/profile'
import { SHAKE_EVENT } from '../lib/events'
import { clamp, useInView } from '../lib/hooks'
import { useMotion } from '../lib/motion'
import SectionHead from './SectionHead'

type Body = { el: HTMLSpanElement; x: number; y: number; vx: number; vy: number; r: number; ox: number; oy: number }

const GRAVITY = 0.45

// A small circle solver: gravity, wall bounces, pairwise collisions and throwing.
export default function TechStack() {
  const box = useRef<HTMLDivElement>(null)
  const bubbles = useRef<(HTMLSpanElement | null)[]>([])
  const bodies = useRef<Body[]>([])
  const dragging = useRef<Body | null>(null)
  const gravity = useRef(0)
  const [gravityOn, setGravityOn] = useState(false)
  const { reduced } = useMotion()
  const visible = useInView(box)

  // Lay the bubbles out: in rows while floating (the default), piled at the bottom with gravity.
  useEffect(() => {
    const host = box.current
    if (!host) return
    const layout = () => {
      const W = host.clientWidth
      const H = host.clientHeight
      const r = W < 560 ? 36 : 48
      const cols = Math.max(1, Math.floor((W - 20) / (r * 2 + 8)))
      bodies.current = bubbles.current.flatMap((el, i) => {
        if (!el) return []
        el.style.width = el.style.height = `${r * 2}px`
        const row = Math.floor(i / cols)
        const x = clamp(14 + r + (i % cols) * (r * 2 + 8) + (row % 2 ? r / 2 : 0), r, W - r)
        const floating = reduced || gravity.current === 0
        const y = clamp(floating ? 56 + r + row * (r * 2 + 8) : H - r - row * (r * 2 + 4), r, H - r)
        // A slow drift keeps floating bubbles alive without pulling focus.
        const drift = () => (reduced ? 0 : (Math.random() - 0.5) * 0.8)
        el.style.transform = `translate3d(${x - r}px,${y - r}px,0)`
        return [{ el, x, y, vx: drift(), vy: drift(), r, ox: 0, oy: 0 }]
      })
    }
    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(host)
    return () => ro.disconnect()
  }, [reduced])

  // Simulation loop, only while the box is on screen.
  useEffect(() => {
    const host = box.current
    if (!host || !visible) return
    let raf = 0
    const step = () => {
      const W = host.clientWidth
      const H = host.clientHeight
      const g = reduced ? 0 : gravity.current
      const friction = reduced ? 0.8 : g === 0 ? 0.999 : 0.992
      const list = bodies.current
      for (const b of list) {
        if (b === dragging.current) continue
        b.vy += g
        b.vx *= friction
        b.vy *= friction
        b.x += b.vx
        b.y += b.vy
        if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.6 }
        if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.6 }
        if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.6 }
        if (b.y > H - b.r) { b.y = H - b.r; b.vy = -Math.abs(b.vy) * 0.45; b.vx *= 0.97 }
      }
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            const a = list[i]
            const b = list[j]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const d = Math.hypot(dx, dy) || 0.01
            const min = a.r + b.r
            if (d >= min) continue
            const nx = dx / d
            const ny = dy / d
            const overlap = min - d
            // A dragged bubble acts as an immovable object.
            const wa = a === dragging.current ? 0 : b === dragging.current ? 1 : 0.5
            const wb = 1 - wa
            a.x -= nx * overlap * wa
            a.y -= ny * overlap * wa
            b.x += nx * overlap * wb
            b.y += ny * overlap * wb
            const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny
            if (rv < 0) {
              const impulse = -1.4 * rv
              a.vx -= nx * impulse * wa
              a.vy -= ny * impulse * wa
              b.vx += nx * impulse * wb
              b.vy += ny * impulse * wb
            }
          }
        }
      }
      for (const b of list) {
        b.x = clamp(b.x, b.r, W - b.r)
        b.y = clamp(b.y, b.r, H - b.r)
        b.el.style.transform = `translate3d(${b.x - b.r}px,${b.y - b.r}px,0)`
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [visible, reduced])

  const shake = () => {
    for (const b of bodies.current) {
      b.vx += (Math.random() - 0.5) * 26
      b.vy -= Math.random() * 18 + 6
    }
  }

  useEffect(() => {
    window.addEventListener(SHAKE_EVENT, shake)
    return () => window.removeEventListener(SHAKE_EVENT, shake)
  }, [])

  const toggleGravity = () => {
    const on = gravity.current === 0
    gravity.current = on ? GRAVITY : 0
    setGravityOn(on)
    if (!on) for (const b of bodies.current) { b.vx += (Math.random() - 0.5) * 6; b.vy -= Math.random() * 6 }
  }

  const local = (e: PointerEvent) => {
    const r = box.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  return (
    <section id="stack" aria-labelledby="stack-title" className="wrap py-14 md:py-20">
      <SectionHead id="stack-title" eyebrow="Toolkit" title="The stack, hands-on.">
        Grab a skill and throw it. The ones I reach for every day are in blue.
      </SectionHead>

      <div
        ref={box}
        data-cursor="Drag"
        className="relative h-[360px] touch-none overflow-hidden rounded-[20px] border border-line bg-surface sm:h-[420px]"
        onPointerDown={(e) => {
          const el = (e.target as HTMLElement).closest('.bubble')
          const b = bodies.current.find((x) => x.el === el)
          if (!b) return
          const p = local(e)
          b.ox = p.x - b.x
          b.oy = p.y - b.y
          dragging.current = b
          b.el.classList.add('grab')
          box.current!.setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          const b = dragging.current
          if (!b) return
          const p = local(e)
          const nx = p.x - b.ox
          const ny = p.y - b.oy
          b.vx = clamp(nx - b.x, -28, 28)
          b.vy = clamp(ny - b.y, -28, 28)
          b.x = nx
          b.y = ny
        }}
        onPointerUp={() => {
          const b = dragging.current
          if (!b) return
          b.el.classList.remove('grab')
          if (reduced) b.vx = b.vy = 0
          dragging.current = null
        }}
        onPointerCancel={() => {
          dragging.current?.el.classList.remove('grab')
          dragging.current = null
        }}
      >
        <p className="pointer-events-none absolute left-5 top-4 font-mono text-xs text-muted">drag · throw · stack</p>
        {skills.map((s, i) => (
          <span
            key={s}
            ref={(el) => (bubbles.current[i] = el)}
            aria-hidden="true"
            className={`bubble text-[11px] sm:text-[13px]${coreSkills.includes(s) ? ' core' : ''}`}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button type="button" className="btn" onClick={shake}>Shake</button>
        <button type="button" className="btn" aria-pressed={gravityOn} onClick={toggleGravity}>
          Gravity {gravityOn ? 'on' : 'off'}
        </button>
      </div>
      <p className="mt-6 max-w-[70ch] text-[15px] leading-relaxed text-muted">
        <span className="font-semibold text-ink">Core: </span>
        {coreSkills.join(', ')}.{' '}
        <span className="font-semibold text-ink">Also: </span>
        {skills.filter((s) => !coreSkills.includes(s)).join(', ')}.
      </p>
    </section>
  )
}
