import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Search } from 'lucide-react'
import Reveal from '../ui/Reveal'

export default function CTASection() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-600/20 via-accent-violet/15 to-accent-cyan/20" />
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent-violet/30 blur-3xl animate-float" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent-cyan/25 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

          <span className="chip mx-auto mb-4 inline-flex">
            <Sparkles className="h-3.5 w-3.5 text-brand-500" /> Instant blueprints
          </span>
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Have an idea? <span className="gradient-text">Blueprint it in seconds.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            Type any software concept and get its architecture, stack, data flow, roadmap, cost and more —
            instantly.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
            }}
            className="mx-auto mt-7 flex max-w-lg items-center gap-2 rounded-2xl border border-black/10 bg-white/70 p-2 backdrop-blur dark:border-white/10 dark:bg-white/[0.05]"
          >
            <Search className="ml-2 h-5 w-5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. Real-time Analytics Platform"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:text-base"
            />
            <button type="submit" className="btn-primary shrink-0">
              Generate
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  )
}
