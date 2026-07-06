import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import {
  Search,
  ArrowLeft,
  Check,
  Zap,
  Layers,
  Server,
  Database as DbIcon,
  ShieldCheck,
  Cloud,
  Cog,
  Rocket,
  Gauge,
  FolderTree,
  GraduationCap,
  Building2,
  DollarSign,
  CalendarClock,
  Sparkles,
  Lightbulb,
  Network,
  Workflow,
  Code2,
  KeyRound,
  Boxes,
  BookOpen,
  Users,
  Coins,
  HelpCircle,
  ArrowRight,
  X,
  Timer,
  ShieldAlert,
  Sliders,
  RefreshCw,
  AlertTriangle,
  Globe,
  ExternalLink,
  Star,
  Github,
} from 'lucide-react'
import {
  generateBlueprint,
  buildBlueprintFromSpec,
  dashboardTabs,
  type DashboardTab,
  type Blueprint,
} from '../data/blueprint'
import { generateSpec, getAIConfig, providerLabels } from '../lib/ai'
import { fetchLiveInfo, type LiveInfo } from '../lib/liveData'
import AISettings from '../components/AISettings'
import FlowDiagram from '../components/FlowDiagram'
import { useTheme } from '../context/ThemeContext'

const tabIcons: Record<string, React.ReactNode> = {
  Overview: <Layers className="h-4 w-4" />,
  Architecture: <Network className="h-4 w-4" />,
  'Tech Stack': <Boxes className="h-4 w-4" />,
  'Data Flow': <Workflow className="h-4 w-4" />,
  Pipeline: <Zap className="h-4 w-4" />,
  Frontend: <Code2 className="h-4 w-4" />,
  Backend: <Server className="h-4 w-4" />,
  Database: <DbIcon className="h-4 w-4" />,
  Authentication: <KeyRound className="h-4 w-4" />,
  API: <Cog className="h-4 w-4" />,
  Cloud: <Cloud className="h-4 w-4" />,
  DevOps: <Cog className="h-4 w-4" />,
  Deployment: <Rocket className="h-4 w-4" />,
  Security: <ShieldCheck className="h-4 w-4" />,
  Scaling: <Gauge className="h-4 w-4" />,
  'Folder Structure': <FolderTree className="h-4 w-4" />,
  'Learning Roadmap': <GraduationCap className="h-4 w-4" />,
  Companies: <Building2 className="h-4 w-4" />,
  'Cost Estimate': <DollarSign className="h-4 w-4" />,
  Timeline: <CalendarClock className="h-4 w-4" />,
  'Best Practices': <Sparkles className="h-4 w-4" />,
  'Future Scope': <Lightbulb className="h-4 w-4" />,
}

const methodColor: Record<string, string> = {
  GET: '#10b981',
  POST: '#3363ff',
  PUT: '#f59e0b',
  DELETE: '#f43f5e',
  WS: '#a855f7',
}

function BulletList({ items, color = '#3363ff' }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((p) => (
        <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <span
            className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
            style={{ background: `${color}22`, color }}
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  )
}

function Card({
  title,
  icon,
  children,
  className = '',
}: {
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`glass p-5 sm:p-6 ${className}`}>
      {title && (
        <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
          {icon && <span className="text-brand-500">{icon}</span>}
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

export default function SearchDashboard() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const query = params.get('q') || 'AI Chatbot'

  const [tab, setTab] = useState<DashboardTab>('Overview')
  const [newQ, setNewQ] = useState('')
  const [bp, setBp] = useState<Blueprint>(() => generateBlueprint(query))
  const [source, setSource] = useState<'ai' | 'template'>('template')
  const [enhancing, setEnhancing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [regen, setRegen] = useState(0)
  const [live, setLive] = useState<LiveInfo | null>(null)
  const [liveLoading, setLiveLoading] = useState(true)
  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem('techpulse-gemini-dismissed') === '1',
  )
  const usingFreeAI = getAIConfig().provider === 'pollinations'

  useEffect(() => {
    let cancelled = false
    const ctrl = new AbortController()
    setTab('Overview')
    setError(null)
    // Show a full template instantly, then upgrade to the AI version when ready.
    setBp(generateBlueprint(query))
    setSource('template')
    setEnhancing(true)
    setLive(null)
    setLiveLoading(true)

    // 1) Real, keyless facts for the exact term (Wikipedia) — never static.
    fetchLiveInfo(query, ctrl.signal)
      .then((info) => {
        if (!cancelled) setLive(info)
      })
      .finally(() => {
        if (!cancelled) setLiveLoading(false)
      })

    // 2) Structured AI blueprint (upgrades the template when it arrives).
    ;(async () => {
      try {
        const spec = await generateSpec(query, getAIConfig(), ctrl.signal)
        if (cancelled) return
        setBp(buildBlueprintFromSpec(query, spec))
        setSource('ai')
      } catch (e) {
        if (cancelled || ctrl.signal.aborted) return
        setError(e instanceof Error ? e.message : 'AI unavailable')
      } finally {
        if (!cancelled) setEnhancing(false)
      }
    })()
    return () => {
      cancelled = true
      ctrl.abort()
    }
  }, [query, regen])

  const totalCost = bp.cost.rows.reduce((s, r) => s + r.monthly, 0)
  const totalWeeks = bp.timeline.reduce((s, t) => s + t.weeks, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={() => navigate('/')} className="btn-ghost !px-3">
          <ArrowLeft className="h-4 w-4" /> Home
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (newQ.trim()) navigate(`/search?q=${encodeURIComponent(newQ.trim())}`)
          }}
          className="flex flex-1 items-center gap-2 rounded-xl border border-black/10 bg-white/60 px-3 py-2 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
        >
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={newQ}
            onChange={(e) => setNewQ(e.target.value)}
            placeholder="Blueprint another idea…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <button type="submit" className="btn-primary !px-3 !py-1.5 text-xs">
            Generate
          </button>
        </form>
        <button
          onClick={() => setRegen((n) => n + 1)}
          className="btn-ghost !px-3"
          title="Regenerate"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">Regenerate</span>
        </button>
        <button onClick={() => setSettingsOpen(true)} className="btn-ghost !px-3" title="AI engine settings">
          <Sliders className="h-4 w-4" />
          <span className="hidden sm:inline">AI</span>
        </button>
      </div>

      {/* Source status */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {enhancing ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-500">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Enhancing with {providerLabels[getAIConfig().provider]}…
            <span className="font-normal text-slate-400">(showing a template meanwhile)</span>
          </span>
        ) : source === 'ai' ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
            <Sparkles className="h-3.5 w-3.5" /> AI-generated · {providerLabels[getAIConfig().provider]}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-500">
            <AlertTriangle className="h-3.5 w-3.5" /> Built-in template
          </span>
        )}
        {liveLoading ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/10 px-3 py-1 text-xs font-semibold text-slate-400">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Fetching live facts…
          </span>
        ) : live ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-500">
            <Globe className="h-3.5 w-3.5" /> Live · {live.source}
          </span>
        ) : null}
        {!enhancing && error && (
          <span className="text-xs text-slate-400">
            Free AI was busy — for instant, reliable results add a free{' '}
            <button onClick={() => setSettingsOpen(true)} className="font-semibold text-brand-500 hover:underline">
              Google AI key
            </button>{' '}
            or{' '}
            <button onClick={() => setRegen((n) => n + 1)} className="font-semibold text-brand-500 hover:underline">
              try again
            </button>
            .
          </span>
        )}
      </div>

      <AISettings open={settingsOpen} onClose={() => setSettingsOpen(false)} onSaved={() => setRegen((n) => n + 1)} />

      {/* Connect Google AI banner (shown while on the flaky keyless default) */}
      {usingFreeAI && !bannerDismissed && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-400/30 bg-gradient-to-r from-brand-500/10 via-accent-violet/10 to-accent-cyan/10 p-4"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-violet text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">Want faster, always-tailored results?</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You're on the free no-key engine (can be slow/busy). Connect <strong>Google AI (Gemini)</strong> — it's
              free and takes ~30 seconds.
            </p>
          </div>
          <button onClick={() => setSettingsOpen(true)} className="btn-primary shrink-0 !py-2 text-xs">
            Connect Google AI
          </button>
          <button
            onClick={() => {
              localStorage.setItem('techpulse-gemini-dismissed', '1')
              setBannerDismissed(true)
            }}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass relative mb-8 overflow-hidden p-6 sm:p-8"
      >
        <div
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: `${bp.color}33` }}
        />
        <div className="relative flex flex-wrap items-start gap-4">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl"
            style={{ background: `${bp.color}22` }}
          >
            {bp.icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="chip" style={{ color: bp.color }}>{bp.category}</span>
              <span className="chip">{bp.complexity}</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{bp.title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{bp.tagline}</p>
          </div>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {bp.overview.stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-black/[0.03] p-3 text-center dark:bg-white/[0.03]">
              <div className="gradient-text text-lg font-extrabold sm:text-xl">{s.value}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[236px_1fr]">
        {/* Sidebar tabs (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-1">
            {dashboardTabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-all ${
                  tab === t
                    ? 'bg-gradient-to-r from-brand-600/90 to-accent-violet/90 text-white shadow-lg shadow-brand-500/20'
                    : 'text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5'
                }`}
              >
                <span className={tab === t ? 'text-white' : 'text-slate-400'}>{tabIcons[t]}</span>
                {t}
              </button>
            ))}
          </div>
        </aside>

        {/* Mobile tab scroller */}
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
          {dashboardTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                tab === t
                  ? 'bg-gradient-to-r from-brand-600 to-accent-violet text-white'
                  : 'border border-black/10 text-slate-600 dark:border-white/10 dark:text-slate-300'
              }`}
            >
              {tabIcons[t]} {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-w-0 space-y-5"
        >
          {tab === 'Overview' && (
            <>
              {/* Live, real facts pulled for the exact term */}
              {liveLoading && !live && (
                <div className="glass p-5">
                  <div className="skeleton mb-3 h-4 w-40 rounded" />
                  <div className="skeleton mb-2 h-3 w-full rounded" />
                  <div className="skeleton h-3 w-3/4 rounded" />
                </div>
              )}
              {live && (
                <div className="glass overflow-hidden p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-500">
                      <Globe className="h-3.5 w-3.5" /> Live facts · {live.source}
                    </span>
                    {live.url && (
                      <a
                        href={live.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:underline"
                      >
                        Source <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {live.thumbnail && (
                      <img
                        src={live.thumbnail}
                        alt={live.title}
                        className="h-28 w-full rounded-xl object-cover sm:h-28 sm:w-40 sm:shrink-0"
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold">{live.title}</h3>
                      {live.description && (
                        <p className="text-xs font-medium uppercase tracking-wide text-cyan-500">{live.description}</p>
                      )}
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{live.extract}</p>
                      {live.repo && (
                        <a
                          href={live.repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="glass-hover mt-3 inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-1.5 text-xs dark:border-white/10"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span className="font-semibold">{live.repo.fullName}</span>
                          <span className="inline-flex items-center gap-1 text-amber-500">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {live.repo.stars.toLocaleString()}
                          </span>
                          {live.repo.language && <span className="text-slate-400">· {live.repo.language}</span>}
                        </a>
                      )}
                    </div>
                  </div>
                  {live.related.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-black/5 pt-3 dark:border-white/5">
                      <span className="text-[11px] font-semibold text-slate-400">Related:</span>
                      {live.related.map((r) => (
                        <button
                          key={r}
                          onClick={() => navigate(`/search?q=${encodeURIComponent(r)}`)}
                          className="chip glass-hover !px-2 !py-0.5 !text-[11px] hover:text-brand-500"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Plain-English explainer */}
              <div className="glass relative overflow-hidden p-5 sm:p-6">
                <div
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
                  style={{ background: `${bp.color}26` }}
                />
                <div className="relative">
                  <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                    <BookOpen className="h-3.5 w-3.5" /> In simple terms
                  </span>
                  <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">{bp.overview.simple}</p>
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.03]">
                    <span className="text-xl">💡</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Simple analogy</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {bp.overview.analogy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How it works, step by step */}
              <Card title="How it works, step by step" icon={<Workflow className="h-4 w-4" />}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {bp.overview.howItWorks.map((h, i) => (
                    <div
                      key={h.title}
                      className="relative rounded-xl border border-black/5 p-4 dark:border-white/5"
                    >
                      <div
                        className="mb-2 grid h-8 w-8 place-items-center rounded-lg text-sm font-extrabold"
                        style={{ background: `${bp.color}1f`, color: bp.color }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm font-bold">{h.title.replace(/^\d+\.\s*/, '')}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{h.text}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Who uses it + business value */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Card title="Who uses it" icon={<Users className="h-4 w-4" />}>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{bp.overview.whoUsesIt}</p>
                </Card>
                <Card title="Why it's valuable" icon={<Coins className="h-4 w-4" />}>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{bp.overview.businessValue}</p>
                </Card>
              </div>

              {/* Key features + at a glance */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Card title="Key Features" icon={<Sparkles className="h-4 w-4" />}>
                  <BulletList items={bp.overview.features} color={bp.color} />
                </Card>
                <Card title="At a Glance" icon={<Gauge className="h-4 w-4" />}>
                  <div className="grid grid-cols-2 gap-3">
                    {bp.overview.stats.map((s) => (
                      <div key={s.label} className="rounded-xl bg-black/[0.03] p-4 dark:bg-white/[0.03]">
                        <div className="text-xl font-extrabold" style={{ color: bp.color }}>{s.value}</div>
                        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-slate-400">
                    Recommended pattern:{' '}
                    <span className="font-semibold text-slate-600 dark:text-slate-300">{bp.architecture.pattern}</span>
                  </p>
                </Card>
              </div>

              {/* Technical summary */}
              <Card title="Technical summary" icon={<Layers className="h-4 w-4" />}>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{bp.overview.summary}</p>
              </Card>

              {/* Glossary */}
              <Card title="Jargon, explained" icon={<HelpCircle className="h-4 w-4" />}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {bp.overview.glossary.map((g) => (
                    <div key={g.term} className="rounded-xl border border-black/5 p-3 dark:border-white/5">
                      <p className="text-sm font-bold" style={{ color: bp.color }}>{g.term}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{g.meaning}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {tab === 'Architecture' && (
            <>
              <Card title={`Architecture · ${bp.architecture.pattern}`} icon={<Network className="h-4 w-4" />}>
                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {bp.architecture.description}
                </p>
                <FlowDiagram
                  key={`arch-${bp.architecture.nodes.map((n) => n.label).join('|')}`}
                  nodes={bp.architecture.nodes}
                  edges={bp.architecture.edges}
                  height={500}
                />
                <p className="mt-3 text-xs text-slate-400">Drag nodes to explore · scroll to zoom</p>
              </Card>

              {/* Why this shape (plain language) */}
              <div className="glass flex items-start gap-3 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-500">
                  <HelpCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold">Why is it built this way?</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {bp.architecture.whyPattern}
                  </p>
                </div>
              </div>

              {/* Every part explained */}
              <Card title="Every part, explained" icon={<Boxes className="h-4 w-4" />}>
                <div className="space-y-3">
                  {bp.architecture.layers.map((l, i) => (
                    <div
                      key={l.name}
                      className="flex flex-col gap-3 rounded-xl border border-black/5 p-4 dark:border-white/5 sm:flex-row sm:items-start"
                    >
                      <div className="flex items-center gap-3 sm:w-56 sm:shrink-0">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl" style={{ background: `${bp.color}14` }}>
                          {l.icon}
                        </span>
                        <div>
                          <p className="text-sm font-bold">{l.name}</p>
                          <span className="chip !px-2 !py-0.5 !text-[10px]">{l.tech}</span>
                        </div>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{l.plain}</p>
                        <p className="flex items-start gap-1.5 text-xs leading-relaxed text-slate-400">
                          <span className="mt-0.5 font-semibold uppercase tracking-wide text-slate-400">Job:</span>
                          {l.responsibility}
                        </p>
                      </div>
                      <span className="hidden text-xs font-bold text-slate-300 dark:text-slate-600 sm:block">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Trade-offs */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Card title="Strengths of this design" icon={<Check className="h-4 w-4" />}>
                  <ul className="space-y-2.5">
                    {bp.architecture.tradeoffs.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card title="Trade-offs to plan for" icon={<ShieldAlert className="h-4 w-4" />}>
                  <ul className="space-y-2.5">
                    {bp.architecture.tradeoffs.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-rose/15 text-accent-rose">
                          <X className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </>
          )}

          {tab === 'Tech Stack' && (
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { label: 'Frontend', items: bp.stack.frontend, icon: <Code2 className="h-4 w-4" /> },
                { label: 'Backend', items: bp.stack.backend, icon: <Server className="h-4 w-4" /> },
                { label: 'Database & Storage', items: bp.stack.database, icon: <DbIcon className="h-4 w-4" /> },
                { label: 'Infra & DevOps', items: bp.stack.infra, icon: <Cloud className="h-4 w-4" /> },
                ...(bp.stack.ai ? [{ label: 'AI & ML', items: bp.stack.ai, icon: <Sparkles className="h-4 w-4" /> }] : []),
              ].map((g) => (
                <Card key={g.label} title={g.label} icon={g.icon}>
                  <div className="space-y-3">
                    {g.items.map((it) => (
                      <div key={it.name} className="rounded-xl border border-black/5 p-3 dark:border-white/5">
                        <p className="text-sm font-semibold">{it.name}</p>
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{it.why}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {tab === 'Data Flow' && (
            <>
              <Card title="What happens when you use it" icon={<Workflow className="h-4 w-4" />}>
                <FlowDiagram
                  key={`flow-${query}-${source}`}
                  nodes={bp.dataFlow.nodes}
                  edges={bp.dataFlow.edges}
                  height={360}
                />
                <p className="mb-3 mt-2 text-xs text-slate-400">Drag nodes to explore · scroll to zoom</p>
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.03]">
                  <span className="text-xl">💡</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">The gist</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {bp.dataFlow.analogy}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Step-by-step: plain + technical */}
              <Card title="Step by step" icon={<ArrowRight className="h-4 w-4" />}>
                <div className="relative space-y-4 pl-6">
                  <span className="absolute left-[9px] top-2 h-[calc(100%-1.5rem)] w-0.5 bg-gradient-to-b from-brand-500 via-accent-violet to-accent-cyan" />
                  {bp.dataFlow.steps.map((s, i) => (
                    <div key={s.title} className="relative">
                      <span className="absolute -left-6 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-brand-500 text-[10px] font-bold text-white ring-4 ring-brand-500/20">
                        {i + 1}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold">{s.title}</h4>
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                          <Timer className="h-3 w-3" /> {s.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.plain}</p>
                      <p className="mt-1.5 flex items-start gap-2 rounded-lg bg-black/[0.03] px-3 py-2 font-mono text-[11px] leading-relaxed text-slate-500 dark:bg-white/[0.04] dark:text-slate-400">
                        <Code2 className="mt-0.5 h-3 w-3 shrink-0" />
                        {s.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Failure handling */}
              <Card title="What if something goes wrong?" icon={<ShieldAlert className="h-4 w-4" />}>
                <BulletList items={bp.dataFlow.failureHandling} color="#f43f5e" />
              </Card>
            </>
          )}

          {tab === 'Pipeline' && (
            <Card title="CI/CD Pipeline" icon={<Zap className="h-4 w-4" />}>
              <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
                {bp.pipeline.steps.map((s, i) => (
                  <div key={s.name} className="flex flex-1 items-center gap-2 md:flex-col">
                    <div className="glass flex w-full flex-1 flex-col items-center gap-1 rounded-xl p-3 text-center">
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-sm font-bold">{s.name}</span>
                      <span className="text-[11px] leading-tight text-slate-500 dark:text-slate-400">{s.desc}</span>
                    </div>
                    {i < bp.pipeline.steps.length - 1 && (
                      <span className="text-brand-500 md:rotate-90">→</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'Frontend' && (
            <Card title="Frontend" icon={<Code2 className="h-4 w-4" />}>
              <BulletList items={bp.frontend} color="#ec4899" />
            </Card>
          )}

          {tab === 'Backend' && (
            <Card title="Backend" icon={<Server className="h-4 w-4" />}>
              <BulletList items={bp.backend} color="#a855f7" />
            </Card>
          )}

          {tab === 'Database' && (
            <div className="grid gap-5 lg:grid-cols-2">
              <Card title="Database Design" icon={<DbIcon className="h-4 w-4" />}>
                <BulletList items={bp.database.points} color="#10b981" />
              </Card>
              <Card title="Core Tables" icon={<Boxes className="h-4 w-4" />}>
                <div className="flex flex-wrap gap-2">
                  {bp.database.tables.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  Each table gets timestamps, soft-delete where relevant, and indexes on foreign keys & lookup columns.
                </p>
              </Card>
            </div>
          )}

          {tab === 'Authentication' && (
            <Card title="Authentication & Authorization" icon={<KeyRound className="h-4 w-4" />}>
              <BulletList items={bp.auth} color="#f59e0b" />
            </Card>
          )}

          {tab === 'API' && (
            <div className="space-y-5">
              <Card title={`API Design · ${bp.api.style}`} icon={<Cog className="h-4 w-4" />}>
                <BulletList items={bp.api.points} color="#22d3ee" />
              </Card>
              <Card title="Example Endpoints" icon={<Code2 className="h-4 w-4" />}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <tbody>
                      {bp.api.endpoints.map((e) => (
                        <tr key={e.path} className="border-b border-black/5 last:border-0 dark:border-white/5">
                          <td className="py-2.5 pr-3">
                            <span
                              className="rounded-md px-2 py-0.5 font-mono text-[11px] font-bold"
                              style={{ background: `${methodColor[e.method]}22`, color: methodColor[e.method] }}
                            >
                              {e.method}
                            </span>
                          </td>
                          <td className="py-2.5 pr-3 font-mono text-xs">{e.path}</td>
                          <td className="py-2.5 text-xs text-slate-500 dark:text-slate-400">{e.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {tab === 'Cloud' && (
            <Card title="Cloud Infrastructure" icon={<Cloud className="h-4 w-4" />}>
              <BulletList items={bp.cloud} color="#22d3ee" />
            </Card>
          )}

          {tab === 'DevOps' && (
            <Card title="DevOps & Observability" icon={<Cog className="h-4 w-4" />}>
              <BulletList items={bp.devops} color="#3363ff" />
            </Card>
          )}

          {tab === 'Deployment' && (
            <Card title="Deployment Strategy" icon={<Rocket className="h-4 w-4" />}>
              <BulletList items={bp.deployment} color="#f43f5e" />
            </Card>
          )}

          {tab === 'Security' && (
            <Card title="Security" icon={<ShieldCheck className="h-4 w-4" />}>
              <BulletList items={bp.security} color="#10b981" />
            </Card>
          )}

          {tab === 'Scaling' && (
            <Card title="Scaling Strategy" icon={<Gauge className="h-4 w-4" />}>
              <BulletList items={bp.scaling} color="#a855f7" />
            </Card>
          )}

          {tab === 'Folder Structure' && (
            <Card title="Recommended Folder Structure" icon={<FolderTree className="h-4 w-4" />}>
              <pre className="overflow-x-auto rounded-xl bg-slate-950/90 p-4 font-mono text-xs leading-relaxed text-slate-200 dark:bg-black/40">
                {bp.folders}
              </pre>
            </Card>
          )}

          {tab === 'Learning Roadmap' && (
            <Card title="Learning Roadmap" icon={<GraduationCap className="h-4 w-4" />}>
              <div className="relative space-y-6 pl-6">
                <span className="absolute left-[9px] top-1 h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-brand-500 via-accent-violet to-accent-cyan" />
                {bp.roadmap.map((ph) => (
                  <div key={ph.title} className="relative">
                    <span className="absolute -left-6 top-1 grid h-5 w-5 place-items-center rounded-full bg-brand-500 ring-4 ring-brand-500/20">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h4 className="text-sm font-bold">{ph.title}</h4>
                      <span className="chip !py-0.5 !text-[10px]">{ph.weeks}</span>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {ph.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" /> {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'Companies' && (
            <Card title="Companies Building Systems Like This" icon={<Building2 className="h-4 w-4" />}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {bp.companies.map((c) => (
                  <div
                    key={c}
                    className="glass glass-hover flex items-center gap-3 p-4"
                  >
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl text-sm font-black"
                      style={{ background: `${bp.color}22`, color: bp.color }}
                    >
                      {c.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold">{c}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Representative companies operating products in this space — used to illustrate scale & patterns.
              </p>
            </Card>
          )}

          {tab === 'Cost Estimate' && (
            <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
              <Card title="Monthly Cost Breakdown" icon={<DollarSign className="h-4 w-4" />}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs text-slate-400">
                        <th className="pb-2 font-medium">Item</th>
                        <th className="pb-2 font-medium">Tier</th>
                        <th className="pb-2 text-right font-medium">Monthly</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bp.cost.rows.map((r) => (
                        <tr key={r.item} className="border-b border-black/5 last:border-0 dark:border-white/5">
                          <td className="py-2.5 pr-2 font-medium">{r.item}</td>
                          <td className="py-2.5 pr-2 text-xs text-slate-500 dark:text-slate-400">{r.tier}</td>
                          <td className="py-2.5 text-right font-semibold">
                            {r.monthly === 0 ? 'usage' : `$${r.monthly}`}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="pt-3 font-bold">Estimated total</td>
                        <td />
                        <td className="pt-3 text-right text-lg font-extrabold" style={{ color: bp.color }}>
                          ~${totalCost}/mo
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-slate-400">{bp.cost.note}</p>
              </Card>
              <Card title="Cost Distribution" icon={<DollarSign className="h-4 w-4" />}>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={bp.cost.rows.filter((r) => r.monthly > 0)}
                      dataKey="monthly"
                      nameKey="item"
                      innerRadius={45}
                      outerRadius={85}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {bp.cost.rows
                        .filter((r) => r.monthly > 0)
                        .map((_, i) => (
                          <Cell
                            key={i}
                            fill={['#3363ff', '#a855f7', '#22d3ee', '#10b981', '#f59e0b', '#ec4899', '#f43f5e', '#8eb5ff'][i % 8]}
                          />
                        ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: dark ? 'rgba(12,16,26,0.95)' : '#fff',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                      formatter={(v: number) => `$${v}/mo`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {tab === 'Timeline' && (
            <Card title={`Development Timeline · ~${totalWeeks} weeks`} icon={<CalendarClock className="h-4 w-4" />}>
              <div className="space-y-3">
                {bp.timeline.map((t, i) => (
                  <div key={t.phase} className="flex items-center gap-3">
                    <div className="w-40 shrink-0">
                      <p className="text-sm font-semibold">{t.phase}</p>
                      <p className="text-[11px] text-slate-400">{t.weeks} weeks</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-8 overflow-hidden rounded-lg bg-black/[0.03] dark:bg-white/[0.03]">
                        <div
                          className="flex h-full items-center px-3 text-[11px] font-medium text-white"
                          style={{
                            width: `${(t.weeks / totalWeeks) * 100}%`,
                            minWidth: '30%',
                            background: ['#3363ff', '#a855f7', '#22d3ee', '#10b981', '#f59e0b'][i % 5],
                          }}
                        >
                          <span className="truncate">{t.work}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'Best Practices' && (
            <Card title="Best Practices" icon={<Sparkles className="h-4 w-4" />}>
              <BulletList items={bp.bestPractices} color="#3363ff" />
            </Card>
          )}

          {tab === 'Future Scope' && (
            <Card title="Future Scope" icon={<Lightbulb className="h-4 w-4" />}>
              <div className="grid gap-3 sm:grid-cols-2">
                {bp.futureScope.map((f) => (
                  <div key={f} className="glass flex items-start gap-2.5 p-4">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* footer nav to related */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-xs text-slate-400">
              Blueprint generated for <span className="font-semibold">"{bp.title}"</span>
            </p>
            <Link to="/#projects" className="btn-ghost text-xs">
              Explore more ideas
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
