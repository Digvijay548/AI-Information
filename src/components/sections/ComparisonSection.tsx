import { Link } from 'react-router-dom'
import { Swords, ArrowRight } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { comparisons } from '../../data/comparisons'

export default function ComparisonSection() {
  return (
    <Section
      id="compare"
      eyebrow="Technology Comparison"
      title="Head-to-head, no hand-waving"
      description="Pick a matchup to open a detailed, criteria-by-criteria breakdown with a clear verdict."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.04}>
            <Link to={`/compare/${c.slug}`} className="glass glass-hover group flex h-full flex-col p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="chip">{c.category}</span>
                <Swords className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 text-center">
                  <span
                    className="mx-auto mb-1 grid h-11 w-11 place-items-center rounded-xl text-sm font-bold"
                    style={{ background: `${c.colorA}22`, color: c.colorA === '#e5e7eb' ? '#94a3b8' : c.colorA }}
                  >
                    {c.a[0]}
                  </span>
                  <p className="text-sm font-bold">{c.a}</p>
                </div>
                <span className="text-xs font-black text-slate-300 dark:text-slate-600">VS</span>
                <div className="flex-1 text-center">
                  <span
                    className="mx-auto mb-1 grid h-11 w-11 place-items-center rounded-xl text-sm font-bold"
                    style={{ background: `${c.colorB}22`, color: c.colorB === '#e5e7eb' ? '#94a3b8' : c.colorB }}
                  >
                    {c.b[0]}
                  </span>
                  <p className="text-sm font-bold">{c.b}</p>
                </div>
              </div>

              {/* score bar */}
              <div className="mt-4 flex h-2 overflow-hidden rounded-full">
                <div style={{ width: `${(c.scoreA / (c.scoreA + c.scoreB)) * 100}%`, background: c.colorA === '#e5e7eb' ? '#94a3b8' : c.colorA }} />
                <div style={{ width: `${(c.scoreB / (c.scoreA + c.scoreB)) * 100}%`, background: c.colorB === '#e5e7eb' ? '#94a3b8' : c.colorB }} />
              </div>
              <div className="mt-1 flex justify-between text-[11px] font-semibold text-slate-400">
                <span>{c.scoreA}</span>
                <span>{c.scoreB}</span>
              </div>

              <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {c.summary}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-500 transition-all group-hover:gap-2">
                Full comparison <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
