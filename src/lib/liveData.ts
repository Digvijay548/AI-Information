// Keyless, CORS-enabled live data: pulls REAL, term-specific facts for anything
// the user types, so the dashboard is never static — no API key required.
// All endpoints verified CORS-* and keyless. Results are cached in localStorage
// (24h) to keep repeat lookups instant and stay under GitHub's rate limits.

export interface LiveRepo {
  fullName: string
  stars: number
  language?: string
  url: string
  description?: string
}

export interface LiveInfo {
  title: string
  extract: string
  description?: string
  thumbnail?: string
  url?: string
  related: string[]
  repo?: LiveRepo
  source: 'Wikipedia'
}

const WIKI = 'https://en.wikipedia.org'
const CACHE_PREFIX = 'techpulse-live:'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24h

interface WikiSearchItem {
  title: string
}
interface WikiSummary {
  type?: string
  title?: string
  extract?: string
  description?: string
  thumbnail?: { source?: string }
  content_urls?: { desktop?: { page?: string } }
}

// ---- cache ----
function readCache(key: string): LiveInfo | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null
    const { ts, data } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return data as LiveInfo
  } catch {
    return null
  }
}
function writeCache(key: string, data: LiveInfo) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ ts: Date.now(), data }))
  } catch {
    /* quota — ignore */
  }
}

// ---- Wikipedia ----
async function searchTitles(query: string, signal?: AbortSignal): Promise<string[]> {
  const url = `${WIKI}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    query,
  )}&srlimit=6&format=json&origin=*`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`wiki search ${res.status}`)
  const data = await res.json()
  const items: WikiSearchItem[] = data?.query?.search ?? []
  return Array.isArray(items) ? items.map((s) => s.title).filter(Boolean) : []
}

async function getSummary(title: string, signal?: AbortSignal): Promise<WikiSummary | null> {
  const url = `${WIKI}/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`
  const res = await fetch(url, { signal, headers: { accept: 'application/json' } })
  if (!res.ok) return null
  return (await res.json()) as WikiSummary
}

// ---- GitHub (optional enrichment, best-effort, own short timeout) ----
async function topRepo(query: string, signal?: AbortSignal): Promise<LiveRepo | undefined> {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 4500)
    signal?.addEventListener('abort', () => ctrl.abort())
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query,
    )}&sort=stars&order=desc&per_page=1`
    const res = await fetch(url, { signal: ctrl.signal, headers: { accept: 'application/vnd.github+json' } })
    clearTimeout(timer)
    if (!res.ok) return undefined
    const data = await res.json()
    const r = data?.items?.[0]
    if (!r) return undefined
    return {
      fullName: r.full_name,
      stars: r.stargazers_count ?? 0,
      language: r.language ?? undefined,
      url: r.html_url,
      description: r.description ?? undefined,
    }
  } catch {
    return undefined
  }
}

function toInfo(s: WikiSummary, titles: string[]): LiveInfo {
  return {
    title: s.title || titles[0],
    extract: s.extract || '',
    description: s.description,
    thumbnail: s.thumbnail?.source,
    url: s.content_urls?.desktop?.page,
    related: titles.filter((t) => t !== s.title).slice(0, 5),
    source: 'Wikipedia',
  }
}

/**
 * Fetch real, term-specific info for any query. Wikipedia (search -> resolve ->
 * summarise) is the required core; GitHub adds an optional top-repo. Cached 24h.
 * Returns null only if Wikipedia yields nothing usable.
 */
export async function fetchLiveInfo(query: string, signal?: AbortSignal): Promise<LiveInfo | null> {
  const cacheKey = query.trim().toLowerCase()
  const cached = readCache(cacheKey)
  if (cached) return cached

  try {
    const [titles, repo] = await Promise.all([
      searchTitles(query, signal),
      topRepo(query, signal), // best-effort, never throws
    ])
    if (!titles.length) return null
    for (const t of titles) {
      const s = await getSummary(t, signal)
      if (s && s.extract && s.type !== 'disambiguation') {
        const info = toInfo(s, titles)
        if (repo) info.repo = repo
        writeCache(cacheKey, info)
        return info
      }
    }
    return null
  } catch {
    return null
  }
}
