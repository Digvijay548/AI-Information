import { Brain, Cpu, Layers } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { aiModels } from '../../data/aiModels'

export default function AIModelsSection() {
  return (
    <Section
      id="ai-models"
      eyebrow="Trending AI Models"
      title="The frontier models powering AI apps"
      description="Latest versions, context windows, capabilities and where each model shines."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aiModels.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.04}>
            <div className="glass glass-hover flex h-full flex-col overflow-hidden">
              <div className="relative p-5" style={{ background: `linear-gradient(135deg, ${m.color}22, transparent)` }}>
                <div className="flex items-start justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl text-xl"
                    style={{ background: `${m.color}2a` }}
                  >
                    {m.logo}
                  </span>
                  <span className="chip">{m.date}</span>
                </div>
                <h3 className="mt-3 text-base font-bold leading-tight">{m.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{m.company}</p>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5 pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-black/[0.03] p-2 dark:bg-white/[0.03]">
                    <p className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Layers className="h-3 w-3" /> Context
                    </p>
                    <p className="text-sm font-bold" style={{ color: m.color }}>{m.contextWindow}</p>
                  </div>
                  <div className="rounded-lg bg-black/[0.03] p-2 dark:bg-white/[0.03]">
                    <p className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Cpu className="h-3 w-3" /> Bench
                    </p>
                    <p className="text-sm font-bold" style={{ color: m.color }}>{m.benchmark}/100</p>
                  </div>
                </div>

                <div>
                  <p className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    <Brain className="h-3 w-3" /> Capabilities
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {m.capabilities.slice(0, 3).map((c) => (
                      <span key={c} className="chip !px-2 !py-0.5 !text-[10px]">{c}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-1">
                  {m.modality.map((md) => (
                    <span
                      key={md}
                      className="rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                      style={{ background: `${m.color}1a`, color: m.color }}
                    >
                      {md}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-black/5 pt-2 text-[11px] dark:border-white/5">
                  <span className="text-slate-400">Pricing</span>
                  <span className="font-semibold">{m.pricing}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
