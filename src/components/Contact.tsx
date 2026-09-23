import { useRef, useState, type FormEvent, type PointerEvent } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineDocumentDownload } from 'react-icons/hi'
import { profile } from '../data/profile'
import { useMotion } from '../lib/motion'
import { copyText } from '../lib/toast'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'w-full rounded-[10px] border border-line bg-bg px-3.5 py-3 text-[15px] text-ink placeholder:text-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent'

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  // Posts to Getform in the background so the visitor stays on the page.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(profile.contactForm, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center gap-3 rounded-2xl border border-line bg-bg p-6">
        <p className="font-display text-2xl font-bold">Message sent.</p>
        <p className="text-muted">Thanks for reaching out. I'll get back to you at the email you shared.</p>
        <button type="button" className="btn mt-2" onClick={() => setStatus('idle')}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-left" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Name
          <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Email
          <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Message
        <textarea id="contact-message" name="message" required rows={6} placeholder="What are you building, and how can I help?" className={`${field} resize-y`} />
      </label>
      {/* Honeypot for Getform's spam filter; hidden from people and assistive tech. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={status === 'sending'} className="btn btn-primary min-h-[48px] px-6 text-[15px] disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'error' && (
          <p role="alert" className="text-sm text-warm">
            The message didn't go through. Try again, or email {profile.email} directly.
          </p>
        )}
      </div>
    </form>
  )
}

export default function Contact() {
  const button = useRef<HTMLButtonElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const { reduced } = useMotion()

  // The button leans toward the cursor; its label leans a little further.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const b = button.current
    if (!b || !label.current || reduced || e.pointerType !== 'mouse') return
    const r = b.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    b.classList.add('live')
    b.style.transform = `translate(${dx * 0.35}px, ${dy * 0.45}px)`
    label.current.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px)`
  }

  const onLeave = () => {
    button.current?.classList.remove('live')
    if (button.current) button.current.style.transform = ''
    if (label.current) label.current.style.transform = ''
  }

  const links = [
    { href: profile.linkedin, label: 'LinkedIn', icon: <FaLinkedin aria-hidden="true" size={18} />, external: true },
    { href: profile.github, label: 'GitHub', icon: <FaGithub aria-hidden="true" size={18} />, external: true },
    { href: profile.resume, label: 'Resume (PDF)', icon: <HiOutlineDocumentDownload aria-hidden="true" size={18} />, download: true },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap py-20">
      <div className="grid gap-10 rounded-[24px] border border-line bg-surface p-6 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="flex flex-col items-start gap-5">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="text-[clamp(34px,5vw,56px)] font-bold leading-[1.02]">
            Building something customers will use? Let's talk.
          </h2>
          <p className="max-w-[46ch] text-muted">
            I'm a frontend engineer at {profile.company}, open to conversations about customer-facing products, design systems and GenAI interfaces. Send a message, or grab my email.
          </p>
          <div className="-mx-6 px-6 py-6" onPointerMove={onMove} onPointerLeave={onLeave}>
            <button
              ref={button}
              type="button"
              data-cursor="Copy"
              onClick={() => copyText(profile.email, 'Email copied')}
              className="magnet inline-flex min-h-[56px] items-center gap-2.5 rounded-full bg-accent px-7 text-base font-semibold text-accent-ink"
            >
              <span ref={label}>Copy my email</span>
            </button>
          </div>
          <a href={`mailto:${profile.email}`} className="-mt-3 font-mono text-sm text-muted">
            {profile.email}
          </a>
          <ul className="mt-auto flex flex-wrap gap-2.5 pt-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="btn"
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(l.download ? { download: true } : {})}
                >
                  {l.icon}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
