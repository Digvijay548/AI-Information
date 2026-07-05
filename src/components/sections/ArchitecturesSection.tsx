import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Target } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { architectures } from '../../data/architectures'

export default function ArchitecturesSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <Section
      id="architectures"
      eyebrow="Popular Software Architectures"
      title="Patterns that shape every system"
      description="Tap any pattern to weigh its trade-offs and see where it fits best."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {architectures.map((a, i) => {
          const isOpen = active === a.id
          return (
            <Reveal key={a.id} delay={i * 0.02} className={isOpen ? 'sm:col-span-2 xl:col-span-2' : ''}>
              <button
                onClick={() => setActive(isOpen ? null : a.id)}
                className="glass glass-hover flex h-full w-full flex-col p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl text-xl"
                    style={{ background: `${a.color}22` }}
                  >
                    {a.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">{a.name}</h3>
                    <p className="text-[11px] text-slate-400">{a.short}</p>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {a.description}
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div>
                          <p className="mb-1 text-[10px] font-semibold uppercase text-emerald-500">Pros</p>
                          {a.pros.map((p) => (
                            <div key={p} className="flex items-start gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                              <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" /> {p}
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="mb-1 text-[10px] font-semibold uppercase text-accent-rose">Cons</p>
                          {a.cons.map((p) => (
                            <div key={p} className="flex items-start gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                              <X className="mt-0.5 h-3 w-3 shrink-0 text-accent-rose" /> {p}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                          <Target className="h-3 w-3" /> Best for:
                        </span>
                        {a.bestFor.map((b) => (
                          <span key={b} className="chip !px-2 !py-0.5 !text-[10px]">{b}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isOpen && (
                  <span className="mt-3 text-[11px] font-semibold text-brand-500">Tap to explore →</span>
                )}
              </button>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
