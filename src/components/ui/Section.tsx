import { ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionProps {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export default function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 ${className}`}>
      <Reveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-500">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-slow" />
                {eyebrow}
              </span>
            )}
            <h2 className="section-title text-balance">{title}</h2>
            {description && (
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      </Reveal>
      {children}
    </section>
  )
}
