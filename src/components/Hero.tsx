import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Sparkles, ArrowRight, Command } from 'lucide-react'

const examples = [
  'AI Chatbot',
  'CRM Software',
  'Banking Application',
  'Food Delivery App',
  'Instagram Clone',
  'ERP System',
  'Video Streaming Platform',
]

const stats = [
  { value: '1,200+', label: 'Technologies' },
  { value: '40+', label: 'AI Models' },
  { value: '∞', label: 'Blueprints' },
  { value: 'Live', label: 'Trends' },
]

export default function Hero() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // typewriter placeholder cycling through examples
  useEffect(() => {
    let ex = 0
    let char = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const word = examples[ex]
      if (!deleting) {
        char++
        setPlaceholder(word.slice(0, char))
        if (char === word.length) {
          deleting = true
          timer = setTimeout(tick, 1400)
          return
        }
      } else {
        char--
        setPlaceholder(word.slice(0, char))
        if (char === 0) {
          deleting = false
          ex = (ex + 1) % examples.length
        }
      }
      timer = setTimeout(tick, deleting ? 45 : 90)
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [])

  const go = (term: string) => {
    if (term.trim()) navigate(`/search?q=${encodeURIComponent(term.trim())}`)
  }

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <motion.a
          href="/#news"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass mx-auto mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
        >
          <span className="flex h-2 w-2 items-center justify-center">
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live tech intelligence · updated July 2026
          <ArrowRight className="h-3 w-3" />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Discover{' '}
          <span className="relative whitespace-nowrap">
            <span className="gradient-text bg-[length:200%_auto] animate-gradient-x">Modern Software</span>
          </span>
          <br className="hidden sm:block" /> Technologies
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-slate-500 dark:text-slate-300 sm:text-lg"
        >
          Search any software idea and instantly explore its complete architecture, technology stack,
          real-world companies, learning roadmap, and development pipeline.
        </motion.p>

        {/* Animated search box */}
        <motion.form
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          onSubmit={(e) => {
            e.preventDefault()
            go(q)
          }}
          className="relative mx-auto mt-9 max-w-2xl"
        >
          <div
            className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-brand-500 via-accent-violet to-accent-cyan bg-[length:200%_auto] opacity-70 blur-[6px] transition-opacity duration-500 animate-gradient-x ${
              focused ? 'opacity-100' : 'opacity-40'
            }`}
          />
          <div className="glass relative flex items-center gap-3 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3.5">
            <Search className="h-5 w-5 shrink-0 text-brand-500" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={`Try "${placeholder}█"`}
              className="w-full bg-transparent text-base outline-none placeholder:text-slate-400 sm:text-lg"
            />
            <button
              type="submit"
              className="btn-primary hidden shrink-0 sm:inline-flex"
            >
              <Sparkles className="h-4 w-4" />
              Blueprint it
            </button>
            <button type="submit" className="btn-primary shrink-0 !px-3 sm:hidden" aria-label="Search">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.form>

        {/* Example chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2"
        >
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Command className="h-3 w-3" /> Try:
          </span>
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => go(ex)}
              className="chip glass-hover hover:text-brand-500"
            >
              {ex}
            </button>
          ))}
        </motion.div>

        {/* mini stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-3"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-xl px-2 py-3 text-center">
              <div className="gradient-text text-xl font-extrabold sm:text-2xl">{s.value}</div>
              <div className="mt-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
