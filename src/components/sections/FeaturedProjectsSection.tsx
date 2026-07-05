import { Link } from 'react-router-dom'
import { Zap, ArrowRight } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { projects } from '../../data/projects'

const complexityColor: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#f59e0b',
  Advanced: '#f43f5e',
}

export default function FeaturedProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Pick an idea, get an instant blueprint"
      description="Click any project to generate a full interactive architecture, stack, roadmap and cost estimate."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.03}>
            <Link
              to={`/search?q=${encodeURIComponent(p.name)}`}
              className="glass glass-hover group relative flex h-full flex-col overflow-hidden p-5"
            >
              <div
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity group-hover:opacity-100"
                style={{ background: `${p.color}33`, opacity: 0.5 }}
              />
              <div className="relative flex items-start justify-between">
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl text-2xl"
                  style={{ background: `${p.color}22` }}
                >
                  {p.icon}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                  style={{ background: `${complexityColor[p.complexity]}22`, color: complexityColor[p.complexity] }}
                >
                  {p.complexity}
                </span>
              </div>
              <h3 className="relative mt-3 text-base font-bold">{p.name}</h3>
              <p className="relative mt-1 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {p.blurb}
              </p>
              <div className="relative mt-3 flex flex-wrap gap-1">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="chip !px-2 !py-0.5 !text-[10px]">{s}</span>
                ))}
              </div>
              <div className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-500 transition-all group-hover:gap-2.5">
                <Zap className="h-3.5 w-3.5" /> Generate architecture <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
