import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  TrendingUp,
  Star,
  Check,
  Target,
  Boxes,
  Building2,
  Zap,
  Sparkles,
} from 'lucide-react'
import { technologies } from '../data/technologies'

export default function TechDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const tech = technologies.find((t) => t.id === id)

  if (!tech) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Technology not found</h1>
        <Link to="/#technologies" className="btn-primary mt-6 inline-flex">
          Back to technologies
        </Link>
      </div>
    )
  }

  const accent = tech.color === '#e5e7eb' ? '#94a3b8' : tech.color
  const related = technologies.filter((t) => t.category === tech.category && t.id !== tech.id).slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <button onClick={() => navigate(-1)} className="btn-ghost mb-6 !px-3">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass relative mb-6 overflow-hidden p-6 sm:p-8"
      >
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl" style={{ background: `${accent}33` }} />
        <div className="relative flex flex-wrap items-center gap-5">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl text-4xl" style={{ background: `${accent}22` }}>
            {tech.logo}
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="chip">{tech.category}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-500">
                <TrendingUp className="h-3 w-3" /> {tech.trend}% this quarter
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-1 text-xs font-semibold text-amber-500">
                <Star className="h-3 w-3 fill-amber-400" /> {tech.stars}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{tech.name}</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tech.tagline}</p>
          </div>
          <button
            onClick={() => navigate(`/search?q=${encodeURIComponent(tech.name + ' application')}`)}
            className="btn-primary"
          >
            <Zap className="h-4 w-4" /> Blueprint an app
          </button>
        </div>

        {/* popularity */}
        <div className="relative mt-6">
          <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
            <span>Popularity index</span>
            <span className="font-semibold">{tech.popularity}/100</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${tech.popularity}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${accent}, ${accent}99)` }}
            />
          </div>
        </div>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="glass p-6 lg:col-span-2">
          <h2 className="mb-3 text-lg font-bold">About {tech.name}</h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{tech.description}</p>

          <h3 className="mb-3 mt-6 flex items-center gap-2 text-sm font-bold">
            <Sparkles className="h-4 w-4 text-brand-500" /> Strengths
          </h3>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {tech.strengths.map((s) => (
              <div key={s} className="flex items-center gap-2 rounded-xl border border-black/5 p-3 text-sm dark:border-white/5">
                <Check className="h-4 w-4 shrink-0 text-emerald-500" /> {s}
              </div>
            ))}
          </div>

          <h3 className="mb-3 mt-6 flex items-center gap-2 text-sm font-bold">
            <Target className="h-4 w-4 text-brand-500" /> Common use cases
          </h3>
          <div className="flex flex-wrap gap-2">
            {tech.useCases.map((u) => (
              <span key={u} className="chip">{u}</span>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass p-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
              <Building2 className="h-4 w-4 text-brand-500" /> Companies using it
            </h3>
            <div className="flex flex-wrap gap-2">
              {tech.companies.map((c) => (
                <span
                  key={c}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                  style={{ background: `${accent}18`, color: accent }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="glass p-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
              <Boxes className="h-4 w-4 text-brand-500" /> Ecosystem
            </h3>
            <ul className="space-y-2">
              {tech.ecosystem.map((e) => (
                <li key={e} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} /> {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold">Related {tech.category} technologies</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.id} to={`/tech/${r.id}`} className="glass glass-hover flex items-center gap-3 p-4">
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl text-xl"
                  style={{ background: `${r.color === '#e5e7eb' ? '#94a3b8' : r.color}1f` }}
                >
                  {r.logo}
                </span>
                <div>
                  <p className="text-sm font-bold">{r.name}</p>
                  <p className="text-[11px] text-slate-400">{r.tagline.slice(0, 28)}…</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
