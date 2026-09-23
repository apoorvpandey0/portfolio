import type { ReactNode } from 'react'

type Props = { eyebrow: string; title: string; id: string; children?: ReactNode }

export default function SectionHead({ eyebrow, title, id, children }: Props) {
  return (
    <header className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,380px)] md:items-end md:gap-10">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-3 text-[clamp(32px,4.4vw,52px)] font-bold leading-[1.05]">
          {title}
        </h2>
      </div>
      {children && <div className="text-[15px] leading-relaxed text-muted">{children}</div>}
    </header>
  )
}
