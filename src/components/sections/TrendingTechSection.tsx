import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Star, ArrowRight } from 'lucide-react'
import Section from '../ui/Section'
import { technologies, techCategories } from '../../data/technologies'

export default function TrendingTechSection() {
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? technologies : technologies.filter((t) => t.category === cat)

  return (
    <Section
      id="technologies"
      eyebrow="Trending Technologies"
      title="The stacks developers are building on"
      description="Click any technology to open its full profile — strengths, use cases, ecosystem and the companies using it."
    >
      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
        {techCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              cat === c
                ? 'bg-gradient-to-r from-brand-600 to-accent-violet text-white shadow-lg shadow-brand-500/25'
                : 'border border-black/10 text-slate-600 hover:border-brand-400 dark:border-white/10 dark:text-slate-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((t) => (
          <motion.div layout key={t.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <Link to={`/tech/${t.id}`} className="glass glass-hover group flex h-full flex-col p-5">
              <div className="mb-3 flex items-start justify-between">
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl text-2xl"
                  style={{ background: `${t.color}1f` }}
                >
                  {t.logo}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-500">
                  <TrendingUp className="h-3 w-3" /> {t.trend}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">{t.name}</h3>
              </div>
              <p className="mt-0.5 text-xs text-slate-400">{t.category}</p>
              <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {t.tagline}
              </p>

              {/* popularity bar */}
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Popularity</span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400" /> {t.stars}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${t.popularity}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}aa)` }}
                  />
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-500 opacity-0 transition-all group-hover:gap-2 group-hover:opacity-100">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
