import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Trophy, Check, Minus } from 'lucide-react'
import { comparisons } from '../data/comparisons'

export default function ComparisonDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const c = comparisons.find((x) => x.slug === slug)

  if (!c) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Comparison not found</h1>
        <Link to="/#compare" className="btn-primary mt-6 inline-flex">
          Back to comparisons
        </Link>
      </div>
    )
  }

  const colA = c.colorA === '#e5e7eb' ? '#94a3b8' : c.colorA
  const colB = c.colorB === '#e5e7eb' ? '#94a3b8' : c.colorB
  const total = c.scoreA + c.scoreB

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <button onClick={() => navigate(-1)} className="btn-ghost mb-6 !px-3">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass mb-6 overflow-hidden p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-center gap-4 sm:gap-10">
          <div className="text-center">
            <div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-2xl text-2xl font-black" style={{ background: `${colA}22`, color: colA }}>
              {c.a[0]}
            </div>
            <p className="text-lg font-bold">{c.a}</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-300 dark:text-slate-600">VS</div>
            <span className="chip mt-1">{c.category}</span>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-2xl text-2xl font-black" style={{ background: `${colB}22`, color: colB }}>
              {c.b[0]}
            </div>
            <p className="text-lg font-bold">{c.b}</p>
          </div>
        </div>

        {/* Score bar */}
        <div className="flex h-3 overflow-hidden rounded-full">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(c.scoreA / total) * 100}%` }} transition={{ duration: 0.7 }} style={{ background: colA }} />
          <motion.div initial={{ width: 0 }} animate={{ width: `${(c.scoreB / total) * 100}%` }} transition={{ duration: 0.7 }} style={{ background: colB }} />
        </div>
        <div className="mt-2 flex justify-between text-sm font-bold">
          <span style={{ color: colA }}>{c.a} · {c.scoreA}</span>
          <span style={{ color: colB }}>{c.scoreB} · {c.b}</span>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.summary}</p>
      </motion.div>

      {/* Verdict */}
      <div className="glass mb-6 flex items-start gap-3 p-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-500">
          <Trophy className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold">Verdict</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">{c.winner}</p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="glass overflow-hidden">
        <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 border-b border-black/5 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:border-white/5">
          <span>Criteria</span>
          <span className="text-center" style={{ color: colA }}>{c.a}</span>
          <span className="text-center" style={{ color: colB }}>{c.b}</span>
        </div>
        {c.rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-[1.2fr_1fr_1fr] items-center gap-2 border-b border-black/5 px-5 py-3.5 text-sm last:border-0 dark:border-white/5"
          >
            <span className="font-medium">{r.label}</span>
            <span className={`flex items-center justify-center gap-1.5 text-center ${r.edge === 'a' ? 'font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
              {r.edge === 'a' && <Check className="h-3.5 w-3.5 text-emerald-500" />}
              {r.edge === 'tie' && <Minus className="h-3 w-3 text-slate-400" />}
              {r.a}
            </span>
            <span className={`flex items-center justify-center gap-1.5 text-center ${r.edge === 'b' ? 'font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
              {r.edge === 'b' && <Check className="h-3.5 w-3.5 text-emerald-500" />}
              {r.edge === 'tie' && <Minus className="h-3 w-3 text-slate-400" />}
              {r.b}
            </span>
          </div>
        ))}
      </div>

      {/* Other comparisons */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold">More comparisons</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.filter((x) => x.slug !== c.slug).slice(0, 3).map((o) => (
            <Link key={o.id} to={`/compare/${o.slug}`} className="glass glass-hover flex items-center justify-center gap-2 p-4 text-sm font-semibold">
              {o.a} <span className="text-xs text-slate-400">vs</span> {o.b}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
