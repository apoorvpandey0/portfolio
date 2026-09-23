import { useState, type ReactNode } from 'react'
import { toast } from '../lib/toast'
import SectionHead from './SectionHead'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'
type Dir = 'ltr' | 'rtl'

const COPY: Record<Dir, { title: string; slot: string; cta: string; busy: string; done: string }> = {
  ltr: { title: 'Lab test at home', slot: 'Tomorrow, 8:00 – 10:00 AM', cta: 'Book appointment', busy: 'Booking…', done: 'Booked (demo)' },
  rtl: { title: 'فحص مخبري في المنزل', slot: 'غدًا، ٨:٠٠ – ١٠:٠٠ صباحًا', cta: 'احجز موعدًا', busy: 'جارٍ الحجز…', done: 'تم الحجز (تجريبي)' },
}

function Segmented<T extends string>({ legend, name, value, options, onChange }: {
  legend: string
  name: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="eyebrow mb-2">{legend}</legend>
      <div className="seg flex gap-[3px] rounded-[10px] bg-surface-2 p-[3px]">
        {options.map((o) => (
          <label key={o.value} className="relative flex-1">
            <input
              type="radio"
              id={`${name}-${o.value}`}
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="absolute inset-0 m-0 cursor-pointer opacity-0"
            />
            <span className="flex min-h-[38px] items-center justify-center rounded-lg text-sm font-medium text-muted">{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const Attr = ({ k, v }: { k: string; v?: string }) => (
  <>
    <span className="t-at">{k}</span>
    {v && (
      <>
        =<span className="t-st">"{v}"</span>
      </>
    )}
  </>
)

export default function Playground() {
  const [variant, setVariant] = useState<Variant>('primary')
  const [size, setSize] = useState<Size>('md')
  const [dir, setDir] = useState<Dir>('ltr')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const copy = COPY[dir]

  const attrs: ReactNode[] = [<Attr key="v" k="variant" v={variant} />, <Attr key="s" k="size" v={size} />]
  if (dir === 'rtl') attrs.push(<Attr key="d" k="dir" v="rtl" />)
  if (loading) attrs.push(<Attr key="l" k="loading" />)
  if (disabled) attrs.push(<Attr key="x" k="disabled" />)

  return (
    <section id="components" aria-labelledby="components-title" className="wrap py-20">
      <SectionHead id="components-title" eyebrow="From my component library" title="Built for every customer: any language, any state.">
        Every variant, size and state is a prop, and right-to-left support is built in rather than bolted on. That's how the Al-Koot app shipped in English and Arabic. Try the controls.
      </SectionHead>

      <div className="grid gap-5 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <form className="flex flex-col gap-5 rounded-[18px] border border-line bg-surface p-5" onSubmit={(e) => e.preventDefault()}>
          <Segmented legend="variant" name="variant" value={variant} onChange={setVariant} options={[{ value: 'primary', label: 'Primary' }, { value: 'outline', label: 'Outline' }, { value: 'ghost', label: 'Ghost' }]} />
          <Segmented legend="size" name="size" value={size} onChange={setSize} options={[{ value: 'sm', label: 'sm' }, { value: 'md', label: 'md' }, { value: 'lg', label: 'lg' }]} />
          <Segmented legend="direction" name="dir" value={dir} onChange={setDir} options={[{ value: 'ltr', label: 'LTR' }, { value: 'rtl', label: 'RTL · عربي' }]} />
          <fieldset className="flex flex-col gap-1">
            <legend className="eyebrow mb-2">state</legend>
            <label className="flex min-h-[36px] cursor-pointer items-center gap-2.5 text-sm">
              <input id="pg-loading" type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} className="h-[18px] w-[18px] accent-[var(--accent)]" /> loading
            </label>
            <label className="flex min-h-[36px] cursor-pointer items-center gap-2.5 text-sm">
              <input id="pg-disabled" type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} className="h-[18px] w-[18px] accent-[var(--accent)]" /> disabled
            </label>
          </fieldset>
        </form>

        <div className="flex flex-col overflow-hidden rounded-[18px] border border-line">
          <div className="dots flex min-h-[240px] flex-1 items-center justify-center p-7">
            <div dir={dir} className="flex w-full max-w-[360px] flex-col gap-3.5 rounded-2xl border border-line bg-surface p-5 shadow-lift">
              <div>
                <p className="font-semibold">{copy.title}</p>
                <p className="text-sm text-muted">{copy.slot}</p>
              </div>
              <div>
                <button
                  type="button"
                  className={`ui-btn ${variant} ${size}`}
                  disabled={disabled}
                  aria-busy={loading || undefined}
                  onClick={() => toast(copy.done)}
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden="true" />
                      {copy.busy}
                    </>
                  ) : (
                    <>
                      {copy.cta}
                      <svg className="flip-rtl h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <pre className="code m-0 overflow-x-auto px-[18px] py-4 font-mono text-[13.5px] leading-[1.7]" aria-live="polite">
            <code>
              {'<'}
              <span className="t-fn">Button</span>
              {attrs.map((a, i) => (
                <span key={i}>
                  {'\n  '}
                  {a}
                </span>
              ))}
              {'\n  '}
              <span className="t-at">iconEnd</span>
              {'={<'}
              <span className="t-fn">ArrowIcon</span> <span className="t-at">flipInRtl</span>
              {' />}\n>\n  {t('}
              <span className="t-st">'booking.cta'</span>
              {')}\n</'}
              <span className="t-fn">Button</span>
              {'>'}
              {loading && <span className="t-cm">{'\n// renders aria-busy="true" and a spinner'}</span>}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
