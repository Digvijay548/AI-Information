import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, KeyRound, Check, ExternalLink, Zap, Server } from 'lucide-react'
import { AIConfig, AIProvider, getAIConfig, setAIConfig } from '../lib/ai'

const options: { id: AIProvider; label: string; icon: React.ReactNode; desc: string; badge?: string }[] = [
  {
    id: 'pollinations',
    label: 'Free AI',
    icon: <Zap className="h-4 w-4" />,
    desc: 'Works instantly — no API key, no signup. Uses a free open-source model. Great default.',
    badge: 'No key',
  },
  {
    id: 'gemini',
    label: 'Google Gemini',
    icon: <Sparkles className="h-4 w-4" />,
    desc: 'Highest quality. Get a free API key from Google AI Studio (free tier is generous).',
    badge: 'Free key',
  },
  {
    id: 'openai',
    label: 'OpenAI-compatible',
    icon: <Server className="h-4 w-4" />,
    desc: 'Bring your own endpoint: OpenAI, Groq, OpenRouter, Ollama, LM Studio, etc.',
    badge: 'Advanced',
  },
]

export default function AISettings({
  open,
  onClose,
  onSaved,
}: {
  open: boolean
  onClose: () => void
  onSaved: (cfg: AIConfig) => void
}) {
  const [cfg, setCfg] = useState<AIConfig>(() => getAIConfig())

  const save = () => {
    setAIConfig(cfg)
    onSaved(cfg)
    onClose()
  }

  const set = (patch: Partial<AIConfig>) => setCfg((c) => ({ ...c, ...patch }))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="glass relative z-10 w-full max-w-lg overflow-hidden !bg-white/90 p-6 dark:!bg-[#0b1120]/95"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-violet text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold">AI Engine</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Choose what powers your blueprints</p>
                </div>
              </div>
              <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              {options.map((o) => {
                const active = cfg.provider === o.id
                return (
                  <button
                    key={o.id}
                    onClick={() => set({ provider: o.id })}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                      active
                        ? 'border-brand-400 bg-brand-500/10'
                        : 'border-black/10 hover:border-brand-300 dark:border-white/10'
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                        active ? 'bg-brand-500 text-white' : 'bg-black/5 text-slate-500 dark:bg-white/10'
                      }`}
                    >
                      {o.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">{o.label}</p>
                        {o.badge && <span className="chip !px-2 !py-0.5 !text-[10px]">{o.badge}</span>}
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{o.desc}</p>
                    </div>
                    {active && <Check className="mt-1 h-4 w-4 shrink-0 text-brand-500" />}
                  </button>
                )
              })}
            </div>

            {/* Provider-specific fields */}
            {cfg.provider === 'gemini' && (
              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <KeyRound className="h-3.5 w-3.5" /> Gemini API key
                  </span>
                  <input
                    type="password"
                    value={cfg.geminiKey || ''}
                    onChange={(e) => set({ geminiKey: e.target.value })}
                    placeholder="AIza…"
                    className="w-full rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none focus:border-brand-400 dark:border-white/10 dark:bg-white/[0.04]"
                  />
                </label>
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:underline"
                >
                  Get a free key from Google AI Studio <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-[11px] text-slate-400">
                  Free tier · model <code className="rounded bg-black/5 px-1 dark:bg-white/10">gemini-2.5-flash</code>.
                  Tip: restrict the key to your site in AI Studio before sharing.
                </p>
              </div>
            )}

            {cfg.provider === 'openai' && (
              <div className="mt-4 grid gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">Base URL</span>
                  <input
                    value={cfg.openaiBase || ''}
                    onChange={(e) => set({ openaiBase: e.target.value })}
                    placeholder="https://api.groq.com/openai/v1"
                    className="w-full rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none focus:border-brand-400 dark:border-white/10 dark:bg-white/[0.04]"
                  />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">Model</span>
                    <input
                      value={cfg.openaiModel || ''}
                      onChange={(e) => set({ openaiModel: e.target.value })}
                      placeholder="llama-3.3-70b"
                      className="w-full rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none focus:border-brand-400 dark:border-white/10 dark:bg-white/[0.04]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">API key</span>
                    <input
                      type="password"
                      value={cfg.openaiKey || ''}
                      onChange={(e) => set({ openaiKey: e.target.value })}
                      placeholder="sk-…"
                      className="w-full rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none focus:border-brand-400 dark:border-white/10 dark:bg-white/[0.04]"
                    />
                  </label>
                </div>
              </div>
            )}

            <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
              Keys are stored only in your browser (localStorage) and sent directly to the provider you pick. Nothing is
              saved on any server.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button onClick={onClose} className="btn-ghost">
                Cancel
              </button>
              <button onClick={save} className="btn-primary">
                <Check className="h-4 w-4" /> Save & regenerate
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
