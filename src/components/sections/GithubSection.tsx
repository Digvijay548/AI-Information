import { Star, GitFork, Clock, ArrowUpRight } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { githubRepos } from '../../data/github'

export default function GithubSection() {
  return (
    <Section
      id="github"
      eyebrow="Trending GitHub Projects"
      title="What the open-source world is starring today"
      description="The repositories gaining the most momentum right now, across languages and domains."
      action={
        <a href="https://github.com/trending" target="_blank" rel="noreferrer" className="btn-ghost">
          View all <ArrowUpRight className="h-4 w-4" />
        </a>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {githubRepos.map((r, i) => (
          <Reveal key={r.id} delay={i * 0.03}>
            <a
              href={`https://github.com/${r.owner}/${r.name}`}
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover group flex h-full flex-col p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-xs text-slate-400">{r.owner} /</p>
                  <h3 className="truncate text-base font-bold text-brand-500 group-hover:underline">
                    {r.name}
                  </h3>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-400/10 px-2 py-1 text-xs font-semibold text-amber-500">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {r.starsToday} today
                </span>
              </div>

              <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {r.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <span key={t} className="chip !px-2 !py-0.5 !text-[10px]">#{t}</span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-black/5 pt-3 text-xs text-slate-500 dark:border-white/5 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.langColor }} />
                  {r.language}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" /> {r.stars}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" /> {r.forks}
                </span>
                <span className="ml-auto inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {r.updated}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
