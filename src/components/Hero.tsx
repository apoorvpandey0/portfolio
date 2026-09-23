import { useCallback, useEffect, useRef, useState, type HTMLAttributes, type PointerEvent } from 'react'
import photo from '../assets/apoorv.webp'
import { profile, stats } from '../data/profile'
import { clamp, useMediaQuery } from '../lib/hooks'
import { useMotion } from '../lib/motion'
import { scrollToId } from '../lib/scroll'

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ<>/{}=+*'

const DECODE_MS = 700
const GLYPH_MS = 70 // how often unsolved letters change; every frame reads as flicker
const COOLDOWN_MS = 2500 // stops the effect restarting while the pointer moves over the name

const randomGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0]

// The name resolves left to right from random glyphs, on load and on hover.
function DecodeName({ text, ...rest }: { text: string } & HTMLAttributes<HTMLHeadingElement>) {
  const { reduced } = useMotion()
  // null = settled; otherwise the glyph shown in each unsolved slot.
  const [glyphs, setGlyphs] = useState<string[] | null>(null)
  const [solved, setSolved] = useState(text.length)
  const running = useRef(false)
  const lastRun = useRef(-Infinity)

  const run = useCallback(() => {
    const now = performance.now()
    if (reduced || running.current || now - lastRun.current < COOLDOWN_MS) return
    running.current = true
    const start = now
    let lastSwap = -Infinity
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DECODE_MS)
      setSolved(Math.floor(p * text.length))
      if (t - lastSwap >= GLYPH_MS) {
        lastSwap = t
        setGlyphs(text.split('').map(randomGlyph))
      }
      if (p < 1) requestAnimationFrame(tick)
      else {
        setGlyphs(null)
        running.current = false
        lastRun.current = performance.now()
      }
    }
    requestAnimationFrame(tick)
  }, [text, reduced])

  useEffect(() => {
    const id = setTimeout(run, 300)
    return () => clearTimeout(id)
  }, [run])

  // Each real letter keeps its place (made invisible while unsolved) and the glyph
  // is drawn over it, so the line never changes width or wraps differently.
  let index = 0
  return (
    <h1 {...rest} aria-label={text} onPointerEnter={run}>
      <span aria-hidden="true">
        {text.split(' ').map((word, w) => (
          <span key={w} className="whitespace-nowrap">
            {w > 0 && ' '}
            {word.split('').map((c) => {
              const i = index++ + w
              const scrambled = glyphs !== null && i >= solved
              return (
                <span key={i} className="relative">
                  <span className={scrambled ? 'invisible' : undefined}>{c}</span>
                  {scrambled && <span className="absolute inset-0 text-center">{glyphs[i]}</span>}
                </span>
              )
            })}
          </span>
        ))}
      </span>
    </h1>
  )
}

type Box = { x: number; y: number; w: number; h: number }

const place = (el: HTMLElement | null, b: Box) => {
  if (!el) return
  el.style.left = `${b.x}px`
  el.style.top = `${b.y}px`
  el.style.width = `${Math.max(0, b.w)}px`
  el.style.height = `${Math.max(0, b.h)}px`
}

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const margin = useRef<HTMLDivElement>(null)
  const border = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLDivElement>(null)
  const finePointer = useMediaQuery('(pointer: fine)')

  // DevTools-style box model: margin (orange), padding (green), content (blue).
  const inspect = (el: HTMLElement) => {
    const host = stage.current
    if (!host || !overlay.current || !label.current) return
    const sr = host.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    const n = (v: string) => parseFloat(v) || 0
    const m = { t: n(cs.marginTop), r: n(cs.marginRight), b: n(cs.marginBottom), l: n(cs.marginLeft) }
    const p = {
      t: n(cs.paddingTop) + n(cs.borderTopWidth),
      r: n(cs.paddingRight) + n(cs.borderRightWidth),
      b: n(cs.paddingBottom) + n(cs.borderBottomWidth),
      l: n(cs.paddingLeft) + n(cs.borderLeftWidth),
    }
    const x = r.left - sr.left
    const y = r.top - sr.top
    place(margin.current, { x: x - m.l, y: y - m.t, w: r.width + m.l + m.r, h: r.height + m.t + m.b })
    place(border.current, { x, y, w: r.width, h: r.height })
    place(content.current, { x: x + p.l, y: y + p.t, w: r.width - p.l - p.r, h: r.height - p.t - p.b })

    const selector = el.dataset.inspect ?? el.tagName.toLowerCase()
    const dot = selector.indexOf('.')
    const tag = dot < 0 ? selector : selector.slice(0, dot)
    const cls = dot < 0 ? '' : selector.slice(dot)
    label.current.innerHTML = ''
    const parts: [string, string][] = [['tk', tag], ['cl', cls], ['dm', `${Math.round(r.width)} × ${Math.round(r.height)}`]]
    for (const [c, t] of parts) {
      const s = document.createElement('span')
      s.className = c
      s.textContent = t
      label.current.appendChild(s)
    }
    overlay.current.hidden = false
    const lw = label.current.offsetWidth
    const above = y - m.t - 30
    label.current.style.left = `${clamp(x, 8, sr.width - lw - 8)}px`
    label.current.style.top = `${above < 0 ? y + r.height + m.b + 6 : above}px`
  }

  const inspected = useRef<HTMLElement | null>(null)

  const hide = () => {
    inspected.current = null
    if (overlay.current) overlay.current.hidden = true
  }

  // Only re-measure when the target changes. In the gaps between elements the
  // overlay stays on the last one instead of blinking off and on.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-inspect]')
    if (!el || el === inspected.current) return
    inspected.current = el
    inspect(el)
  }

  return (
    <section id="top" aria-label="Introduction" className="wrap pb-20 pt-8 sm:pt-14">
      <div
        ref={stage}
        onPointerMove={onMove}
        onPointerLeave={hide}
        onFocus={(e) => {
          const el = (e.target as HTMLElement).closest<HTMLElement>('[data-inspect]')
          if (!el) return
          inspected.current = el
          inspect(el)
        }}
        onBlur={hide}
        className="relative overflow-hidden rounded-[24px] border border-line bg-surface p-6 shadow-lift sm:p-12 [@media(pointer:fine)]:cursor-crosshair"
      >
        {finePointer && (
          <p className="absolute right-4 top-4 flex items-center gap-2 font-mono text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-good" aria-hidden="true" />
            hover to inspect
          </p>
        )}

        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_240px] md:items-center">
          <div>
            <p data-inspect="p.eyebrow" className="eyebrow inline-block py-1">
              {profile.role} · {profile.company} · {profile.location}
            </p>
            <DecodeName
              text={profile.name}
              data-inspect="h1.name"
              className="mt-3 text-[clamp(48px,9vw,104px)] font-extrabold leading-none tracking-[-0.035em]"
            />
            <p data-inspect="p.tagline" className="mt-5 font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight">
              {profile.tagline}
            </p>
            <p data-inspect="p.summary" className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-muted">
              {profile.summary}
            </p>
            <div data-inspect="div.actions" className="mt-8 flex flex-wrap gap-3">
              <a
                data-inspect="a.btn.primary"
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('work')
                }}
                className="btn btn-primary min-h-[48px] px-5 text-[15px]"
              >
                See my work
              </a>
              <a data-inspect="a.btn" href={profile.resume} download className="btn min-h-[48px] px-5 text-[15px]">
                Download resume
              </a>
            </div>
          </div>
          <img
            data-inspect="img.avatar"
            src={photo}
            alt={profile.name}
            className="aspect-[4/5] w-full max-w-[240px] rounded-[20px] object-cover object-[68%_50%]"
          />
        </div>

        <dl data-inspect="dl.stats" className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-inspect="div.stat" className="flex flex-col-reverse gap-1 bg-surface p-5">
              <dt className="text-sm leading-snug text-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(30px,4vw,44px)] font-bold leading-none tracking-tight">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div ref={overlay} className="inspector" hidden aria-hidden="true">
          <div ref={margin} className="ov-m" />
          <div ref={border} className="ov-b" />
          <div ref={content} className="ov-c" />
          <div ref={label} className="ov-label absolute" />
        </div>
      </div>
    </section>
  )
}
