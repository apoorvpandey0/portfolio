import { readStore, writeStore } from './storage'

type Theme = 'light' | 'dark'

export function applySavedTheme() {
  const saved = readStore('theme')
  if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved
}

export function toggleTheme(): Theme {
  const root = document.documentElement
  const current =
    (root.dataset.theme as Theme | undefined) ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const next: Theme = current === 'dark' ? 'light' : 'dark'
  root.dataset.theme = next
  writeStore('theme', next)
  return next
}
