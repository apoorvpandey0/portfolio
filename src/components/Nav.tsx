import { useEffect, useRef } from 'react'
import { profile } from '../data/profile'
import { scrollToId } from '../lib/scroll'
import { isMac, OPEN_PALETTE_EVENT } from '../lib/events'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let queued = false
    const update = () => {
      queued = false
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    const onScroll = () => {
      if (!queued) {
        queued = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 h-[var(--hh)] border-b border-line backdrop-blur-md" style={{ background: 'color-mix(in srgb, var(--bg) 86%, transparent)' }}>
      <nav aria-label="Main" className="wrap flex h-full items-center gap-2">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('top')
          }}
          className="mr-auto whitespace-nowrap font-display text-lg font-bold text-ink no-underline"
        >
          {profile.name}
        </a>
        <ul className="mr-2 hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(l.id)
                }}
                className="inline-flex min-h-[44px] items-center px-3 text-sm font-medium text-muted no-underline hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button type="button" className="btn" onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))} aria-label="Open command menu">
          <span className="md:hidden">Menu</span>
          <span className="kbd hidden md:inline">{isMac ? '⌘K' : 'Ctrl K'}</span>
        </button>
        <a href={profile.resume} download className="btn btn-primary hidden sm:inline-flex">
          Resume
        </a>
      </nav>
      <div ref={bar} className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-accent" aria-hidden="true" />
    </header>
  )
}
