const EVENT = 'app:toast'

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: message }))
}

export function onToast(handler: (message: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}

export async function copyText(text: string, success: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast(success)
  } catch {
    toast(`Copy blocked. The address is ${text}`)
  }
}
