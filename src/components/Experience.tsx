import { experience, extras } from '../data/profile'
import SectionHead from './SectionHead'

// Renders **bold** segments from the data file as highlighted text.
function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="wrap py-14 md:py-20">
      <SectionHead id="experience-title" eyebrow="Experience" title="Shipping to production since 2022.">
        From a health platform used across India to a global logistics company, frontend has always been my job.
      </SectionHead>

      <ol className="flex flex-col">
        {experience.map((role) => (
          <li key={role.company} className="grid grid-cols-1 gap-4 border-t border-line py-10 md:grid-cols-[280px_minmax(0,1fr)] md:gap-10">
            <div>
              <h3 className="text-2xl font-bold">{role.company}</h3>
              <p className="mt-1 text-[15px] font-medium">{role.title}</p>
              <p className="mt-2 font-mono text-xs text-muted">
                {role.period} · {role.location}
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {role.highlights.map((h) => (
                <li key={h} className="relative pl-5 text-[16px] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                  <Highlight text={h} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <dl className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
        {extras.map((x) => (
          <div key={x.label}>
            <dt className="eyebrow">{x.label}</dt>
            <dd className="mt-2 text-[15px] leading-relaxed">{x.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
