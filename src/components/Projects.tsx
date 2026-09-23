import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { projects, type Cover, type Project } from '../data/profile'
import { useMotion } from '../lib/motion'
import SectionHead from './SectionHead'

const tint = (pct: number, color = 'var(--ink)'): CSSProperties => ({
  background: `color-mix(in srgb, ${color} ${pct}%, transparent)`,
})

const base = 'relative flex aspect-[16/9] overflow-hidden bg-surface-2 p-5'

function CoverArt({ cover }: { cover: Project['cover'] }) {
  if (typeof cover === 'object') {
    return (
      <div className="aspect-[16/9] overflow-hidden bg-surface-2">
        <img src={cover.image} alt={cover.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
    )
  }
  return <DrawnCover kind={cover} />
}

function DrawnCover({ kind }: { kind: Cover }) {
  switch (kind) {
    case 'doc':
      return (
        <div className={`${base} flex-col items-start justify-end gap-2`} aria-hidden="true">
          <span className="absolute right-5 top-5 rounded-md bg-accent px-2 py-1 font-mono text-[11px] text-accent-ink">AI summary</span>
          {[70, 88, 52, 80, 40].map((w, i) => (
            <i key={i} className="block h-2 rounded" style={{ width: `${w}%`, ...tint(i === 2 ? 55 : 16, i === 2 ? 'var(--warm)' : 'var(--ink)') }} />
          ))}
        </div>
      )
    case 'bars':
      return (
        <div className={`${base} items-end gap-2`} aria-hidden="true">
          {[35, 52, 44, 68, 60, 84, 92].map((h, i) => (
            <i key={i} className="block flex-1 rounded-t-md bg-accent opacity-[0.85]" style={{ height: `${h}%` }} />
          ))}
        </div>
      )
    case 'rtl':
      return (
        <div className={`${base} flex-col items-end justify-end gap-2`} dir="rtl" aria-hidden="true">
          <span className="absolute left-5 top-5 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">EN ⇄ عربي</span>
          {[60, 84, 46, 72].map((w, i) => (
            <i key={i} className="block h-2 rounded" style={{ width: `${w}%`, ...tint(i === 0 ? 45 : 16, i === 0 ? 'var(--accent)' : 'var(--ink)') }} />
          ))}
        </div>
      )
  }
}

function TiltCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null)
  const { reduced } = useMotion()

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || reduced || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.classList.add('live')
    el.style.setProperty('--ry', `${((x - 0.5) * 12).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${((0.5 - y) * 10).toFixed(2)}deg`)
    el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
    el.style.setProperty('--go', '1')
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.classList.remove('live')
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--go', '0')
  }

  return (
    <article
      ref={ref}
      aria-label={project.name}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="tilt relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface hover:shadow-lift"
    >
      <CoverArt cover={project.cover} />
      <div className="flex flex-col gap-2 p-6">
        <p className="eyebrow">{project.org}</p>
        <h3 className="text-2xl font-bold">{project.name}</h3>
        <p className="text-[15px] leading-relaxed text-muted">{project.summary}</p>
        <ul className="flex flex-wrap gap-1.5 pt-3" aria-label="Stack and impact">
          {project.facts.map((f) => (
            <li key={f} className="rounded-md border border-line px-2 py-1 font-mono text-xs">{f}</li>
          ))}
          {project.wins.map((w) => (
            <li key={w} className="rounded-md border px-2 py-1 font-mono text-xs text-good" style={{ borderColor: 'color-mix(in srgb, var(--good) 45%, transparent)' }}>
              {w}
            </li>
          ))}
        </ul>
        {project.href && (
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-[44px] items-center gap-1 self-start text-sm font-semibold text-accent">
            {project.hrefLabel} ↗
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="wrap py-14 md:py-20">
      <SectionHead id="work-title" eyebrow="Selected work" title="Products real customers rely on.">
        Health records, dashboards and apps used by lakhs of people, with the stack behind each one and the result it delivered.
      </SectionHead>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <TiltCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  )
}
