import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { profile } from '../data/profile'
import { useMotion } from '../lib/motion'
import { pauseSmoothScroll, scrollToId } from '../lib/scroll'
import { toggleTheme } from '../lib/theme'
import { copyText, toast } from '../lib/toast'
import { OPEN_PALETTE_EVENT, SHAKE_EVENT } from '../lib/events'

type Command = { group: 'Go to' | 'Action' | 'Link'; label: string; run: () => void }

export default function CommandPalette() {
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const { reduced, setReduced } = useMotion()

  const commands = useMemo<Command[]>(() => {
    const go = (id: string, label: string): Command => ({ group: 'Go to', label, run: () => scrollToId(id) })
    return [
      go('work', 'Selected work'),
      go('craft', 'How I build'),
      go('experience', 'Experience'),
      go('components', 'Component playground'),
      go('stack', 'Tech stack'),
      go('contact', 'Contact'),
      { group: 'Action', label: 'Copy email address', run: () => copyText(profile.email, 'Email copied') },
      {
        group: 'Action',
        label: 'Shake the tech stack',
        run: () => {
          scrollToId('stack')
          setTimeout(() => window.dispatchEvent(new Event(SHAKE_EVENT)), 700)
        },
      },
      { group: 'Action', label: 'Toggle dark / light theme', run: () => toast(`${toggleTheme() === 'dark' ? 'Dark' : 'Light'} theme`) },
      {
        group: 'Action',
        label: reduced ? 'Turn motion on' : 'Reduce motion',
        run: () => {
          setReduced(!reduced)
          toast(reduced ? 'Motion on' : 'Motion reduced')
        },
      },
      { group: 'Link', label: 'Download resume', run: () => { window.location.href = profile.resume } },
      { group: 'Link', label: 'LinkedIn', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
      { group: 'Link', label: 'GitHub', run: () => window.open(profile.github, '_blank', 'noopener') },
    ]
  }, [reduced, setReduced])

  const results = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()))

  const open = () => {
    const d = dialog.current
    if (!d || d.open) return
    setQuery('')
    setActive(0)
    pauseSmoothScroll(true)
    d.showModal()
    input.current?.focus()
  }

  const run = (i: number) => {
    const cmd = results[i]
    if (!cmd) return
    dialog.current?.close()
    cmd.run()
  }

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (dialog.current?.open) dialog.current.close()
        else open()
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_PALETTE_EVENT, open)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_PALETTE_EVENT, open)
    }
  }, [])

  useEffect(() => {
    document.getElementById(`cmd-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const n = Math.max(1, results.length)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % n)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a - 1 + n) % n)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(active)
    }
  }

  return (
    <dialog
      ref={dialog}
      aria-label="Command menu"
      onClose={() => pauseSmoothScroll(false)}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
      className="palette mt-[12vh] w-[min(560px,calc(100vw-32px))] rounded-2xl border border-line bg-surface p-0 text-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-3.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="text-muted">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          ref={input}
          id="command-search"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-list"
          aria-activedescendant={results.length ? `cmd-${active}` : undefined}
          autoComplete="off"
          placeholder="Jump to a section or run an action…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={onKeyDown}
          className="min-h-[32px] flex-1 border-0 bg-transparent text-base font-medium text-ink outline-none placeholder:text-muted"
        />
        <kbd className="kbd">esc</kbd>
      </div>
      <ul id="command-list" role="listbox" aria-label="Commands" className="m-0 max-h-[min(380px,55vh)] list-none overflow-auto p-2">
        {results.length === 0 && <li className="p-4 text-sm text-muted">No matches. Try "work" or "email".</li>}
        {results.map((c, i) => (
          <li
            key={c.label}
            id={`cmd-${i}`}
            role="option"
            aria-selected={i === active}
            onClick={() => run(i)}
            onPointerMove={() => i !== active && setActive(i)}
            className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-[10px] px-3 text-[15px] ${i === active ? 'bg-accent-soft text-accent' : ''}`}
          >
            {c.label}
            <span className="ml-auto font-mono text-[11px] uppercase tracking-wide text-muted">{c.group}</span>
          </li>
        ))}
      </ul>
    </dialog>
  )
}
