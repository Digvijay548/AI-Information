import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Moon, Sun, Search, Menu, X, Activity, Github } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'News', href: '/#news' },
  { label: 'Technologies', href: '/#technologies' },
  { label: 'AI Models', href: '/#ai-models' },
  { label: 'GitHub', href: '/#github' },
  { label: 'Compare', href: '/#compare' },
  { label: 'Trends', href: '/#trends' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`)
      setQ('')
      setOpen(false)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-[#070a12]/70'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 via-accent-violet to-accent-cyan shadow-lg shadow-brand-500/30">
            <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Tech<span className="gradient-text">Pulse</span>
          </span>
        </Link>

        <div className="mx-2 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-black/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <form onSubmit={submit} className="ml-auto hidden max-w-xs flex-1 md:flex">
          <div className="group flex w-full items-center gap-2 rounded-xl border border-black/10 bg-white/60 px-3 py-2 backdrop-blur transition-colors focus-within:border-brand-400 dark:border-white/10 dark:bg-white/[0.04]">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search any tech idea…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <kbd className="hidden rounded border border-black/10 px-1.5 text-[10px] text-slate-400 dark:border-white/10 lg:inline">
              ↵
            </kbd>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1.5 md:ml-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-black/5 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white sm:grid"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-black/5 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.span>
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-black/5 dark:hover:bg-white/5 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-white/90 px-4 py-3 backdrop-blur-xl dark:border-white/5 dark:bg-[#070a12]/90 lg:hidden">
          <form onSubmit={submit} className="mb-3 flex md:hidden">
            <div className="flex w-full items-center gap-2 rounded-xl border border-black/10 bg-white/60 px-3 py-2 dark:border-white/10 dark:bg-white/[0.04]">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search any tech idea…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </form>
          <div className="grid grid-cols-2 gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
