// Cross-component signals, kept out of the components so they don't import each other.
export const OPEN_PALETTE_EVENT = 'app:palette'
export const SHAKE_EVENT = 'app:shake'

export const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent)
