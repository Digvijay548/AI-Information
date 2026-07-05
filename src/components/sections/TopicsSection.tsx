import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'

const topics = [
  { label: 'Latest AI Tech', icon: '🧠', to: '/#ai-models', color: '#a855f7' },
  { label: 'Programming Languages', icon: '💻', to: '/#technologies', color: '#3363ff' },
  { label: 'Framework Releases', icon: '🧱', to: '/#frameworks', color: '#22d3ee' },
  { label: 'Developer Tools', icon: '🛠️', to: '/#technologies', color: '#10b981' },
  { label: 'Cloud Platforms', icon: '☁️', to: '/#trends', color: '#f59e0b' },
  { label: 'Open Source', icon: '🌐', to: '/#github', color: '#ec4899' },
  { label: 'GitHub Trending', icon: '⭐', to: '/#github', color: '#f59e0b' },
  { label: 'AI Model Releases', icon: '🤖', to: '/#ai-models', color: '#a855f7' },
  { label: 'Startup Trends', icon: '🚀', to: '/#trends', color: '#f43f5e' },
  { label: 'Cybersecurity', icon: '🛡️', to: '/search?q=Cybersecurity%20Platform', color: '#22d3ee' },
  { label: 'DevOps News', icon: '⚙️', to: '/#trends', color: '#3363ff' },
  { label: 'Frontend', icon: '🎨', to: '/#technologies', color: '#ec4899' },
  { label: 'Backend', icon: '🗄️', to: '/#technologies', color: '#10b981' },
  { label: 'Databases', icon: '💾', to: '/#technologies', color: '#336791' },
  { label: 'Mobile Dev', icon: '📱', to: '/search?q=Mobile%20App', color: '#f59e0b' },
  { label: 'Web3 & Blockchain', icon: '⛓️', to: '/search?q=Web3%20Blockchain%20App', color: '#627eea' },
]

export default function TopicsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {topics.map((t) => (
            <Link
              key={t.label}
              to={t.to}
              className="glass glass-hover group flex flex-col items-center gap-2 px-2 py-4 text-center"
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-xl transition-transform group-hover:scale-110"
                style={{ background: `${t.color}1f` }}
              >
                {t.icon}
              </span>
              <span className="text-[11px] font-semibold leading-tight text-slate-600 dark:text-slate-300">
                {t.label}
              </span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
