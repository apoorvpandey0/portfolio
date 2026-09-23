import { useEffect, useState } from 'react'
import { onToast } from '../lib/toast'

export default function Toaster() {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timer = 0
    const off = onToast((m) => {
      setMessage(m)
      setVisible(true)
      clearTimeout(timer)
      timer = window.setTimeout(() => setVisible(false), 1800)
    })
    return () => {
      off()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-[10px] bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-all duration-200 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
    >
      {message}
    </div>
  )
}
