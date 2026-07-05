import { Package, GitBranch, Sparkles } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { frameworks } from '../../data/frameworks'

export default function FrameworksSection() {
  return (
    <Section
      id="frameworks"
      eyebrow="Latest Framework Releases"
      title="Fresh versions, notes & migration paths"
      description="The newest releases from the frameworks powering modern frontends and backends."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {frameworks.map((f, i) => (
          <Reveal key={f.id} delay={i * 0.03}>
            <div className="glass glass-hover flex h-full flex-col p-5">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl text-lg"
                  style={{ background: `${f.color}22` }}
                >
                  {f.logo}
                </span>
                <span
                  className="rounded-md px-2 py-0.5 text-xs font-bold"
                  style={{ background: `${f.color}22`, color: f.color === '#e5e7eb' ? '#94a3b8' : f.color }}
                >
                  v{f.version}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-bold">{f.name}</h3>
              <p className="text-[11px] text-slate-400">{f.type} · {f.date}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {f.releaseNotes}
              </p>

              <div className="mt-3 space-y-1.5">
                <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  <Sparkles className="h-3 w-3" /> Major features
                </p>
                {f.features.slice(0, 3).map((feat) => (
                  <div key={feat} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                    <Package className="mt-0.5 h-3 w-3 shrink-0 text-brand-500" />
                    {feat}
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-start gap-1.5 border-t border-black/5 pt-3 dark:border-white/5">
                <GitBranch className="mt-0.5 h-3 w-3 shrink-0 text-accent-violet" />
                <p className="text-[10px] leading-snug text-slate-500 dark:text-slate-400">{f.migration}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
