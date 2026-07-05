import type { AISpec } from '../data/blueprint'

// ---------------------------------------------------------------------------
// Provider config (stored locally in the browser only)
// ---------------------------------------------------------------------------
export type AIProvider = 'pollinations' | 'gemini' | 'openai'

export interface AIConfig {
  provider: AIProvider
  geminiKey?: string
  geminiModel?: string
  openaiBase?: string
  openaiKey?: string
  openaiModel?: string
}

const STORAGE_KEY = 'techpulse-ai'

export const providerLabels: Record<AIProvider, string> = {
  pollinations: 'Free AI (no key)',
  gemini: 'Google Gemini',
  openai: 'OpenAI-compatible',
}

export function getAIConfig(): AIConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const c = JSON.parse(raw)
      if (c && c.provider) return c
    }
  } catch {
    /* ignore */
  }
  return { provider: 'pollinations' }
}

export function setAIConfig(cfg: AIConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg))
}

export function isConfigured(cfg: AIConfig = getAIConfig()): boolean {
  if (cfg.provider === 'pollinations') return true
  if (cfg.provider === 'gemini') return !!cfg.geminiKey
  if (cfg.provider === 'openai') return !!cfg.openaiKey && !!cfg.openaiBase && !!cfg.openaiModel
  return false
}

// ---------------------------------------------------------------------------
// Prompt
// ---------------------------------------------------------------------------
function buildPrompt(query: string): string {
  return `You are a senior software architect. Design a blueprint for this idea: "${query}".

Return ONLY minified JSON (no markdown, no commentary). Keep every string short. Match this shape:

{
"title":"short product-style name",
"category":"the real domain (e.g. Computer Vision / Manufacturing QA)",
"icon":"one emoji",
"complexity":"Beginner|Intermediate|Advanced",
"overview":{
 "simple":"2-3 sentences a NON-TECHNICAL person understands. No jargon.",
 "analogy":"one everyday real-world analogy",
 "howItWorks":[{"title":"short","text":"one plain sentence"}],
 "features":["6 concrete domain-specific features"],
 "whoUsesIt":"one sentence",
 "businessValue":"one sentence on value / money"
},
"architecture":{
 "pattern":"e.g. Event-Driven Pipeline",
 "whyPattern":"1-2 plain sentences why this fits THIS idea",
 "components":[{"name":"","icon":"emoji","plain":"non-technical what it is","responsibility":"technical job","tech":"concrete technology","kind":"client|edge|service|data|ai|external"}],
 "pros":["3 strengths"],
 "cons":["3 trade-offs"]
},
"dataFlow":{
 "analogy":"one analogy for the journey of a request/item through the system",
 "steps":[{"title":"","plain":"non-technical","detail":"technical detail","time":"~10ms"}],
 "failureHandling":["3 ways it stays reliable when things fail"]
},
"stack":{"frontend":[{"name":"","why":""}],"backend":[{"name":"","why":""}],"database":[{"name":"","why":""}],"infra":[{"name":"","why":""}],"ai":[{"name":"","why":""}]},
"database":{"tables":["domain-specific names"]},
"companies":["5 REAL companies/products in this exact space"]
}

Rules: Make EVERYTHING specific to "${query}" — use the actual domain's concepts, hardware, models and companies. NO generic web-app boilerplate. "components" = 6-9 items ordered user-facing → data/AI. "dataFlow.steps" = 5-7. "howItWorks" = 5. Valid JSON, all fields present.`
}

// ---------------------------------------------------------------------------
// Robust JSON extraction
// ---------------------------------------------------------------------------
function extractJSON(text: string): AISpec {
  if (!text || !text.trim()) throw new Error('Empty AI response')
  let t = text.trim()
  t = t.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '')
  const first = t.indexOf('{')
  const last = t.lastIndexOf('}')
  if (first >= 0 && last > first) t = t.slice(first, last + 1)
  return JSON.parse(t) as AISpec
}

// ---------------------------------------------------------------------------
// Provider calls
// ---------------------------------------------------------------------------
async function callGemini(prompt: string, cfg: AIConfig, signal?: AbortSignal): Promise<string> {
  const model = cfg.geminiModel || 'gemini-2.0-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
    cfg.geminiKey || '',
  )}`
  const res = await fetch(url, {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.7, maxOutputTokens: 8192 },
    }),
  })
  if (!res.ok) throw new Error(`Gemini error ${res.status}. Check your API key.`)
  const data = await res.json()
  const parts = data?.candidates?.[0]?.content?.parts
  return Array.isArray(parts) ? parts.map((p: { text?: string }) => p.text || '').join('') : ''
}

// Pollinations models — rotated across retries so a congested backend on one
// attempt can succeed on the next.
const POLL_MODELS = ['openai', 'openai-fast']

async function callOpenAICompatible(
  prompt: string,
  cfg: AIConfig,
  signal?: AbortSignal,
  attempt = 0,
): Promise<string> {
  const isPoll = cfg.provider === 'pollinations'
  const endpoint = isPoll
    ? 'https://text.pollinations.ai/openai'
    : `${(cfg.openaiBase || '').replace(/\/+$/, '')}/chat/completions`
  const model = isPoll ? POLL_MODELS[attempt % POLL_MODELS.length] : cfg.openaiModel || 'gpt-4o-mini'
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (!isPoll && cfg.openaiKey) headers.Authorization = `Bearer ${cfg.openaiKey}`

  const res = await fetch(endpoint, {
    method: 'POST',
    signal,
    headers,
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are a senior software architect. Output ONLY valid minified JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  })
  if (!res.ok) throw new Error(`AI error ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ''
}

// Combine an outer abort signal with a per-attempt timeout.
function withTimeout(outer: AbortSignal | undefined, ms: number): { signal: AbortSignal; clear: () => void } {
  const ctrl = new AbortController()
  const onAbort = () => ctrl.abort()
  if (outer) {
    if (outer.aborted) ctrl.abort()
    else outer.addEventListener('abort', onAbort)
  }
  const timer = setTimeout(() => ctrl.abort(), ms)
  return {
    signal: ctrl.signal,
    clear: () => {
      clearTimeout(timer)
      outer?.removeEventListener('abort', onAbort)
    },
  }
}

export async function generateSpec(
  query: string,
  cfg: AIConfig = getAIConfig(),
  signal?: AbortSignal,
  attempts = 3,
): Promise<AISpec> {
  const prompt = buildPrompt(query)
  let lastErr: unknown
  for (let i = 0; i < attempts; i++) {
    if (signal?.aborted) throw new Error('aborted')
    const t = withTimeout(signal, 80000)
    try {
      const raw =
        cfg.provider === 'gemini'
          ? await callGemini(prompt, cfg, t.signal)
          : await callOpenAICompatible(prompt, cfg, t.signal, i)
      const spec = extractJSON(raw)
      if (!spec || typeof spec !== 'object') throw new Error('Invalid AI response')
      return spec
    } catch (e) {
      lastErr = e
      // stop early if the outer request was cancelled (new search / unmount)
      if (signal?.aborted) throw new Error('aborted')
    } finally {
      t.clear()
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('AI request failed')
}
