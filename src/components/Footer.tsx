import { Link } from 'react-router-dom'
import { Activity, Github, Twitter, Linkedin } from 'lucide-react'

const cols = [
  {
    title: 'Explore',
    links: ['Technologies', 'AI Models', 'GitHub Trending', 'Frameworks', 'Comparisons'],
  },
  {
    title: 'Blueprints',
    links: ['AI Chatbot', 'E-Commerce', 'Food Delivery', 'Instagram Clone', 'Video Streaming'],
  },
  {
    title: 'Resources',
    links: ['Architectures', 'Learning Roadmaps', 'Best Practices', 'Cost Estimates', 'Market Trends'],
  },
]

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-black/5 dark:border-white/5">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 via-accent-violet to-accent-cyan shadow-lg shadow-brand-500/30">
              <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Tech<span className="gradient-text">Pulse</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Your real-time intelligence layer for the software and AI industry. Discover trends, compare
            technologies, and instantly blueprint any software idea.
          </p>
          <div className="mt-5 flex gap-2">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg border border-black/10 text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-500 dark:border-white/10"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 transition-colors hover:text-brand-500 dark:text-slate-400"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5 py-6 dark:border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 TechPulse · A Tech Intelligence Dashboard. Data shown is illustrative.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-500">Privacy</a>
            <a href="#" className="hover:text-brand-500">Terms</a>
            <a href="#" className="hover:text-brand-500">Status</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
