import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { TrendingUp, DollarSign, Flame, Database } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import {
  popularLanguages,
  growingFrameworks,
  highestPaying,
  inDemandSkills,
  popularDatabases,
  cloudPlatforms,
  devopsTools,
  hiringTrend,
} from '../../data/marketTrends'
import { useTheme } from '../../context/ThemeContext'

function Panel({
  title,
  icon,
  children,
  className = '',
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`glass flex flex-col p-5 ${className}`}>
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
        <span className="text-brand-500">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  )
}

function tooltipStyle(dark: boolean) {
  return {
    background: dark ? 'rgba(12,16,26,0.95)' : 'rgba(255,255,255,0.97)',
    border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: 12,
    fontSize: 12,
    color: dark ? '#e2e8f0' : '#0f172a',
    boxShadow: '0 10px 30px -12px rgba(0,0,0,0.4)',
  }
}

export default function MarketTrendsSection() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const axis = dark ? '#64748b' : '#94a3b8'
  const grid = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'

  return (
    <Section
      id="trends"
      eyebrow="Live Market Trends"
      title="Where the industry is heading"
      description="Languages, frameworks, salaries, skills, databases and platforms — the pulse of the market at a glance."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Hiring trend - wide */}
        <Reveal className="lg:col-span-2">
          <Panel title="Hiring Trends (index, base 100)" icon={<TrendingUp className="h-4 w-4" />} className="h-full">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={hiringTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {[
                    ['ai', '#a855f7'],
                    ['cloud', '#22d3ee'],
                    ['web', '#3363ff'],
                  ].map(([k, c]) => (
                    <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c} stopOpacity={0.5} />
                      <stop offset="100%" stopColor={c} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
                <XAxis dataKey="month" stroke={axis} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke={axis} fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle(dark)} />
                <Area type="monotone" dataKey="ai" stroke="#a855f7" strokeWidth={2} fill="url(#g-ai)" name="AI / LLM" />
                <Area type="monotone" dataKey="cloud" stroke="#22d3ee" strokeWidth={2} fill="url(#g-cloud)" name="Cloud" />
                <Area type="monotone" dataKey="web" stroke="#3363ff" strokeWidth={2} fill="url(#g-web)" name="Web" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-violet" /> AI / LLM</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-cyan" /> Cloud</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-500" /> Web</span>
            </div>
          </Panel>
        </Reveal>

        {/* Languages pie */}
        <Reveal delay={0.05}>
          <Panel title="Most Used Languages" icon={<Flame className="h-4 w-4" />} className="h-full">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={popularLanguages}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={2}
                  stroke="none"
                >
                  {popularLanguages.map((l) => (
                    <Cell key={l.name} fill={l.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle(dark)} formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
              {popularLanguages.map((l) => (
                <span key={l.name} className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full" style={{ background: l.color }} /> {l.name}
                  <span className="ml-auto font-semibold text-slate-700 dark:text-slate-200">{l.value}%</span>
                </span>
              ))}
            </div>
          </Panel>
        </Reveal>

        {/* Growing frameworks */}
        <Reveal delay={0.05}>
          <Panel title="Fastest Growing Frameworks (YoY)" icon={<TrendingUp className="h-4 w-4" />} className="h-full">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={growingFrameworks} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" stroke={axis} fontSize={11} tickLine={false} axisLine={false} width={70} />
                <Tooltip contentStyle={tooltipStyle(dark)} cursor={{ fill: grid }} formatter={(v: number) => `+${v}%`} />
                <Bar dataKey="growth" radius={[0, 6, 6, 0]} fill="#3363ff" barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>
        </Reveal>

        {/* Highest paying */}
        <Reveal delay={0.1}>
          <Panel title="Highest Paying Technologies" icon={<DollarSign className="h-4 w-4" />} className="h-full">
            <ul className="space-y-2.5">
              {highestPaying.map((t, i) => (
                <li key={t.label} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-black/[0.04] text-[11px] font-bold text-slate-400 dark:bg-white/[0.05]">
                    {i + 1}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
                  <span className="text-sm font-medium">{t.label}</span>
                  <span className="ml-auto text-sm font-bold">{t.value}</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] text-emerald-500">
                    <TrendingUp className="h-3 w-3" />
                    {t.change}%
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        {/* In demand skills */}
        <Reveal delay={0.1}>
          <Panel title="Most In-Demand Skills" icon={<Flame className="h-4 w-4" />} className="h-full">
            <ul className="space-y-2.5">
              {inDemandSkills.map((s) => (
                <li key={s.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{s.value} · {s.label}</span>
                    <span className="text-[11px] font-semibold text-emerald-500">+{s.change}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.min(100, s.change)}%`, background: s.color }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        {/* Cloud platforms donut */}
        <Reveal delay={0.15}>
          <Panel title="Top Cloud Platforms" icon={<Database className="h-4 w-4" />} className="h-full">
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={cloudPlatforms} dataKey="value" nameKey="name" innerRadius={40} outerRadius={78} paddingAngle={2} stroke="none">
                  {cloudPlatforms.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle(dark)} formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
              {cloudPlatforms.map((c) => (
                <span key={c.name} className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} /> {c.name} {c.value}%
                </span>
              ))}
            </div>
          </Panel>
        </Reveal>

        {/* Databases */}
        <Reveal delay={0.15}>
          <Panel title="Most Popular Databases" icon={<Database className="h-4 w-4" />} className="h-full">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={popularDatabases} margin={{ left: -18, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
                <XAxis dataKey="name" stroke={axis} fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke={axis} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle(dark)} cursor={{ fill: grid }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={26}>
                  {popularDatabases.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Panel>
        </Reveal>

        {/* DevOps tools */}
        <Reveal delay={0.2}>
          <Panel title="Top DevOps Tools (adoption)" icon={<TrendingUp className="h-4 w-4" />} className="h-full">
            <ul className="space-y-3 pt-2">
              {devopsTools.map((t) => (
                <li key={t.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-[11px] font-semibold text-slate-400">{t.value}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                    <div className="h-full rounded-full" style={{ width: `${t.value}%`, background: t.color }} />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}
