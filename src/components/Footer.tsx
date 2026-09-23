import { profile } from '../data/profile'
import { isMac } from '../lib/events'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-2 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind and Lenis.{' '}
          <a href="https://github.com/apoorvpandey0/portfolio" target="_blank" rel="noopener noreferrer" className="text-accent">
            View source
          </a>
        </p>
        <p className="font-mono text-xs">
          Press <span className="kbd">{isMac ? '⌘K' : 'Ctrl K'}</span> to jump anywhere
        </p>
      </div>
    </footer>
  )
}
