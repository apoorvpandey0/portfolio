import { useEffect, useRef, useState } from 'react'
import { useCountUp, useMediaQuery } from '../lib/hooks'
import { useMotion } from '../lib/motion'
import SectionHead from './SectionHead'

// [token class, text]; an empty class is plain text.
type Token = [string, string]

// Lines are kept to 46 characters or fewer so the snippet fits a phone screen without scrolling.
const LINES: Token[][] = [
  [['kw', 'export function'], ['', ' '], ['fn', 'MetricCard'], ['', '(props) {']],
  [['', '  '], ['kw', 'const'], ['', ' { label, value, trend } = props;']],
  [['', '  '], ['kw', 'const'], ['', ' shown = '], ['fn', 'useCountUp'], ['', '(value);']],
  [['', '  '], ['kw', 'return'], ['', ' (']],
  [['', '    <'], ['tg', 'article'], ['', ' '], ['at', 'aria-label'], ['', '={label}>']],
  [['', '      <'], ['tg', 'p'], ['', ' '], ['at', 'className'], ['', '='], ['st', '"label"'], ['', '>{label}</'], ['tg', 'p'], ['', '>']],
  [['', '      <'], ['tg', 'strong'], ['', '>{shown}</'], ['tg', 'strong'], ['', '>']],
  [['', '      <'], ['fn', 'Sparkline'], ['', ' '], ['at', 'data'], ['', '={trend} />']],
  [['', '      <'], ['fn', 'Badge'], ['', ' '], ['at', 'tone'], ['', '='], ['st', '"up"'], ['', '>+25% engagement</'], ['fn', 'Badge'], ['', '>']],
  [['', '    </'], ['tg', 'article'], ['', '>']],
  [['', '  );']],
  [['', '}']],
]

// Line index at which each part of the rendered card appears.
const AT = { frame: 4, label: 5, value: 6, spark: 7, badge: 8 }
const LAST = LINES.length - 1

export default function CodeToUI() {
  const { reduced } = useMotion()
  const wide = useMediaQuery('(min-width: 768px)')
  const scrubbing = wide && !reduced
  const track = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(LAST)

  useEffect(() => {
    if (!scrubbing) {
      setStep(LAST)
      return
    }
    let queued = false
    const measure = () => {
      queued = false
      const el = track.current
      if (!el) return
      // No pinning: progress runs while the block travels from 85% to 25% of the viewport height.
      const vh = window.innerHeight
      const top = el.getBoundingClientRect().top
      const p = Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.6)))
      setStep(Math.min(LAST, Math.floor(p * LINES.length)))
    }
    const onScroll = () => {
      if (!queued) {
        queued = true
        requestAnimationFrame(measure)
      }
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [scrubbing])

  const on = (at: number) => (step >= at ? ' on' : '')
  const users = useCountUp(200000, step >= AT.value, reduced)

  return (
    <section id="craft" aria-labelledby="craft-title" className="pt-14 md:pt-20">
      <div className="wrap">
        <SectionHead id="craft-title" eyebrow="How I build" title="Components first. Pixels second.">
          Customer-facing apps at scale depend on their building blocks. I design the component API, make it accessible, and let the UI follow. {scrubbing ? 'Scroll to watch one of my Smart Reports cards come together.' : ''}
        </SectionHead>
      </div>
      <div ref={track} className="wrap grid grid-cols-1 items-center gap-6 pb-14 md:pb-20 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <figure className="code m-0 overflow-hidden rounded-2xl shadow-lift">
          <figcaption className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 font-mono text-xs text-[var(--code-dim)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a4358]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a4358]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a4358]" />
            <span className="ml-2">MetricCard.tsx</span>
          </figcaption>
          <pre className="m-0 overflow-x-auto py-4 font-mono text-[11px] leading-[1.75] sm:text-[12.5px] md:text-sm">
            <code>
              {LINES.map((tokens, i) => (
                <span key={i} data-n={i + 1} className={`ln${i <= step ? ' on' : ''}${scrubbing && i === step ? ' cur' : ''}`}>
                  {tokens.map(([cls, text], j) => (cls ? <span key={j} className={`t-${cls}`}>{text}</span> : text))}
                </span>
              ))}
            </code>
          </pre>
        </figure>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between font-mono text-xs text-muted">
            <span>Rendered output</span>
            <span>line {step + 1} / {LINES.length}</span>
          </div>
          <article
            aria-label="Smart Reports users"
            className={`flex min-h-[250px] flex-col gap-2.5 rounded-[18px] border-[1.5px] bg-surface p-6 transition-shadow ${step >= AT.frame ? 'border-solid border-line shadow-lift' : 'border-dashed border-line'}`}
          >
            <p className={`part text-sm font-medium text-muted${on(AT.label)}`}>Smart Reports users</p>
            <strong className={`part font-display text-[clamp(40px,11vw,52px)] font-bold leading-none tracking-tight tabular-nums${on(AT.value)}`}>
              {Math.round(users).toLocaleString('en-IN')}+
            </strong>
            <svg className={`part h-14 w-full${on(AT.spark)}`} viewBox="0 0 300 56" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 46 L30 42 L60 44 L90 36 L120 38 L150 30 L180 31 L210 22 L240 20 L270 12 L300 8 L300 56 L0 56 Z" fill="var(--accent-soft)" />
              <path d="M0 46 L30 42 L60 44 L90 36 L120 38 L150 30 L180 31 L210 22 L240 20 L270 12 L300 8" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <span
              className={`part self-start rounded-full px-2.5 py-1 text-[13px] font-semibold text-good${on(AT.badge)}`}
              style={{ background: 'color-mix(in srgb, var(--good) 14%, transparent)' }}
            >
              +25% engagement
            </span>
          </article>
          <p className="font-mono text-xs text-muted">Illustrative trend line. The numbers are real.</p>
        </div>
      </div>
    </section>
  )
}
