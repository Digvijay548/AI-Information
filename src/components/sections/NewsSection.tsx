import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles, AlertTriangle, ChevronDown } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { news } from '../../data/news'

export default function NewsSection() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <Section
      id="news"
      eyebrow="Latest Tech News"
      title="What's shipping across the industry"
      description="Fresh releases from the languages, frameworks, databases and platforms developers rely on."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((n, i) => (
          <Reveal key={n.id} delay={i * 0.05}>
            <article className="glass glass-hover flex h-full flex-col p-5">
              <div className="mb-3 flex items-center justify-between">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl text-lg font-bold"
                  style={{ background: `${n.accent}22`, color: n.accent }}
                >
                  {n.name[0]}
                </span>
                <span className="chip">{n.category}</span>
              </div>
              <div className="mb-1 flex items-baseline gap-2">
                <h3 className="text-lg font-bold">{n.name}</h3>
                <span
                  className="rounded-md px-2 py-0.5 text-xs font-bold"
                  style={{ background: `${n.accent}22`, color: n.accent }}
                >
                  v{n.version}
                </span>
              </div>
              <p className="text-xs text-slate-400">{n.date}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {n.summary}
              </p>

              <AnimatePresence initial={false}>
                {open === n.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 border-t border-black/5 pt-4 dark:border-white/5">
                      <div>
                        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                          <Sparkles className="h-3.5 w-3.5" /> What's new
                        </p>
                        <ul className="space-y-1">
                          {n.whatsNew.map((w) => (
                            <li key={w} className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
                              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {n.breaking && (
                        <div>
                          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-accent-rose">
                            <AlertTriangle className="h-3.5 w-3.5" /> Breaking changes
                          </p>
                          <ul className="space-y-1">
                            {n.breaking.map((b) => (
                              <li key={b} className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
                                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent-rose" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setOpen(open === n.id ? null : n.id)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 hover:gap-1.5 transition-all"
                >
                  {open === n.id ? 'Show less' : 'Learn more'}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${open === n.id ? 'rotate-180' : ''}`}
                  />
                </button>
                <a
                  href={n.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 transition-colors hover:text-brand-500"
                  aria-label="Open source"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
