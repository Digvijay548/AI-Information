// Blueprint generator: turns any search query into a full software blueprint
// used by the interactive Search Dashboard.

import { domainKnowledge, type DomainEntry } from './domains'

export interface StackItem {
  name: string
  why: string
}
export interface GraphNode {
  id: string
  label: string
  sub?: string
  x: number
  y: number
  kind: 'client' | 'edge' | 'service' | 'data' | 'external' | 'ai'
}
export interface GraphEdge {
  id: string
  source: string
  target: string
  label?: string
  animated?: boolean
}
export interface RoadmapPhase {
  title: string
  weeks: string
  items: string[]
}
export interface CostRow {
  item: string
  tier: string
  monthly: number
}
export interface TimelinePhase {
  phase: string
  weeks: number
  work: string
}
export interface HowItWorksStep {
  title: string
  text: string
}
export interface ArchLayer {
  name: string
  icon: string
  plain: string // non-technical explanation
  responsibility: string // what it is technically responsible for
  tech: string
  kind: GraphNode['kind']
}
export interface FlowStep {
  title: string
  plain: string // simple, everyday-language explanation
  detail: string // the deeper technical detail
  time: string // rough time budget
}

export interface Blueprint {
  query: string
  title: string
  tagline: string
  category: string
  complexity: 'Beginner' | 'Intermediate' | 'Advanced'
  icon: string
  color: string
  overview: {
    summary: string
    simple: string // plain-English "explain it like I'm five"
    analogy: string // real-world analogy
    howItWorks: HowItWorksStep[] // non-technical walk-through
    whoUsesIt: string
    businessValue: string // how it creates value / makes money
    glossary: { term: string; meaning: string }[]
    features: string[]
    stats: { label: string; value: string }[]
  }
  architecture: {
    pattern: string
    description: string
    whyPattern: string // plain-language reason this shape was chosen
    layers: ArchLayer[] // every part explained simply + technically
    tradeoffs: { pros: string[]; cons: string[] }
    nodes: GraphNode[]
    edges: GraphEdge[]
  }
  dataFlow: {
    nodes: GraphNode[]
    edges: GraphEdge[]
    analogy: string
    steps: FlowStep[]
    failureHandling: string[]
  }
  pipeline: { steps: { name: string; desc: string; icon: string }[] }
  stack: {
    frontend: StackItem[]
    backend: StackItem[]
    database: StackItem[]
    infra: StackItem[]
    ai?: StackItem[]
  }
  frontend: string[]
  backend: string[]
  database: { points: string[]; tables: string[] }
  auth: string[]
  api: { style: string; points: string[]; endpoints: { method: string; path: string; desc: string }[] }
  cloud: string[]
  devops: string[]
  deployment: string[]
  security: string[]
  scaling: string[]
  folders: string
  roadmap: RoadmapPhase[]
  companies: string[]
  cost: { rows: CostRow[]; note: string }
  timeline: TimelinePhase[]
  bestPractices: string[]
  futureScope: string[]
}

interface Archetype {
  key: string
  match: string[]
  category: string
  icon: string
  color: string
  extras: ('payment' | 'media' | 'realtime' | 'vector' | 'geo' | 'search' | 'ml')[]
  stackHints: { frontend: string; backend: string; database: string; special?: string }
  companies: string[]
  users: string
  rps: string
  complexity: Blueprint['complexity']
}

const archetypes: Archetype[] = [
  {
    key: 'ai',
    match: ['ai', 'chatbot', 'chat bot', 'assistant', 'llm', 'gpt', 'rag', 'saas', 'copilot', 'agent'],
    category: 'AI Application',
    icon: '🤖',
    color: '#a855f7',
    extras: ['vector', 'realtime', 'ml'],
    stackHints: { frontend: 'Next.js', backend: 'FastAPI', database: 'PostgreSQL', special: 'Claude + pgvector' },
    companies: ['OpenAI', 'Anthropic', 'Perplexity', 'Notion', 'Intercom'],
    users: '2M MAU',
    rps: '9k req/s',
    complexity: 'Advanced',
  },
  {
    key: 'ecommerce',
    match: ['ecommerce', 'e-commerce', 'shop', 'store', 'commerce', 'marketplace', 'retail', 'cart'],
    category: 'E-Commerce',
    icon: '🛒',
    color: '#10b981',
    extras: ['payment', 'search'],
    stackHints: { frontend: 'Next.js', backend: 'Node.js', database: 'PostgreSQL', special: 'Stripe + Redis' },
    companies: ['Shopify', 'Amazon', 'Etsy', 'Zalando', 'Nike'],
    users: '5M MAU',
    rps: '14k req/s',
    complexity: 'Advanced',
  },
  {
    key: 'social',
    match: ['social', 'instagram', 'twitter', 'clone', 'feed', 'network', 'community', 'reels'],
    category: 'Social Platform',
    icon: '📸',
    color: '#ec4899',
    extras: ['media', 'realtime', 'search'],
    stackHints: { frontend: 'React', backend: 'Node.js', database: 'PostgreSQL', special: 'S3 + Redis + Kafka' },
    companies: ['Meta', 'Pinterest', 'Reddit', 'Discord', 'BeReal'],
    users: '20M MAU',
    rps: '45k req/s',
    complexity: 'Advanced',
  },
  {
    key: 'streaming',
    match: ['video', 'streaming', 'stream', 'media', 'youtube', 'netflix', 'ott', 'music'],
    category: 'Streaming Platform',
    icon: '🎬',
    color: '#f43f5e',
    extras: ['media', 'search', 'ml'],
    stackHints: { frontend: 'Next.js', backend: 'Go', database: 'PostgreSQL', special: 'FFmpeg + CloudFront' },
    companies: ['Netflix', 'YouTube', 'Spotify', 'Twitch', 'Disney+'],
    users: '30M MAU',
    rps: '60k req/s',
    complexity: 'Advanced',
  },
  {
    key: 'fintech',
    match: ['bank', 'banking', 'finance', 'fintech', 'payment', 'wallet', 'trading', 'crypto', 'ledger'],
    category: 'Fintech / Banking',
    icon: '🏦',
    color: '#22d3ee',
    extras: ['payment', 'realtime'],
    stackHints: { frontend: 'Angular', backend: 'Spring Boot', database: 'PostgreSQL', special: 'Kafka + Vault' },
    companies: ['Stripe', 'Revolut', 'Plaid', 'Nubank', 'Wise'],
    users: '8M MAU',
    rps: '22k req/s',
    complexity: 'Advanced',
  },
  {
    key: 'delivery',
    match: ['delivery', 'food', 'ride', 'sharing', 'logistics', 'uber', 'doordash', 'dispatch', 'taxi'],
    category: 'On-Demand Marketplace',
    icon: '🛵',
    color: '#f59e0b',
    extras: ['geo', 'realtime', 'payment'],
    stackHints: { frontend: 'React Native', backend: 'Go', database: 'PostgreSQL', special: 'Kafka + Redis + Maps' },
    companies: ['Uber', 'DoorDash', 'Grab', 'Deliveroo', 'Lyft'],
    users: '12M MAU',
    rps: '38k req/s',
    complexity: 'Advanced',
  },
  {
    key: 'enterprise',
    match: ['erp', 'crm', 'hospital', 'healthcare', 'management', 'admin', 'internal', 'b2b', 'dashboard'],
    category: 'Enterprise System',
    icon: '🏢',
    color: '#3363ff',
    extras: ['search'],
    stackHints: { frontend: 'Angular', backend: '.NET', database: 'PostgreSQL', special: 'Redis + Azure' },
    companies: ['SAP', 'Salesforce', 'Oracle', 'Workday', 'ServiceNow'],
    users: '500k seats',
    rps: '6k req/s',
    complexity: 'Advanced',
  },
]

const genericArchetype: Archetype = {
  key: 'generic',
  match: [],
  category: 'Web Application',
  icon: '🧠',
  color: '#3363ff',
  extras: ['search'],
  stackHints: { frontend: 'React', backend: 'Node.js', database: 'PostgreSQL', special: 'Redis' },
  companies: ['Vercel', 'GitHub', 'Linear', 'Stripe', 'Airbnb'],
  users: '1M MAU',
  rps: '5k req/s',
  complexity: 'Intermediate',
}

function pickArchetype(q: string): Archetype {
  const s = q.toLowerCase()
  let best: Archetype | null = null
  let bestScore = 0
  for (const a of archetypes) {
    const score = a.match.reduce((acc, m) => (s.includes(m) ? acc + m.length : acc), 0)
    if (score > bestScore) {
      bestScore = score
      best = a
    }
  }
  return best ?? genericArchetype
}

function titleCase(q: string) {
  return q
    .trim()
    .split(/\s+/)
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(' ')
}

function buildArchitecture(a: Archetype): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [
    { id: 'client', label: 'Client Apps', sub: 'Web · Mobile', x: 0, y: 160, kind: 'client' },
    { id: 'cdn', label: 'CDN / Edge', sub: 'Cloudflare', x: 230, y: 60, kind: 'edge' },
    { id: 'gw', label: 'API Gateway', sub: 'Auth · Rate limit', x: 230, y: 260, kind: 'edge' },
    { id: 'svc', label: 'Core Services', sub: a.stackHints.backend, x: 470, y: 160, kind: 'service' },
    { id: 'db', label: 'Primary DB', sub: a.stackHints.database, x: 720, y: 40, kind: 'data' },
    { id: 'cache', label: 'Cache', sub: 'Redis', x: 720, y: 160, kind: 'data' },
    { id: 'queue', label: 'Event Bus', sub: 'Kafka', x: 720, y: 280, kind: 'data' },
  ]
  const edges: GraphEdge[] = [
    { id: 'e1', source: 'client', target: 'cdn', label: 'static', animated: true },
    { id: 'e2', source: 'client', target: 'gw', label: 'API', animated: true },
    { id: 'e3', source: 'gw', target: 'svc' },
    { id: 'e4', source: 'svc', target: 'db', label: 'read/write' },
    { id: 'e5', source: 'svc', target: 'cache', label: 'cache' },
    { id: 'e6', source: 'svc', target: 'queue', label: 'events', animated: true },
  ]
  let y = 400
  const addExternal = (id: string, label: string, sub: string, kind: GraphNode['kind'] = 'external') => {
    nodes.push({ id, label, sub, x: 470, y, kind })
    edges.push({ id: `ex-${id}`, source: 'svc', target: id, animated: true })
    y += 110
  }
  if (a.extras.includes('vector')) addExternal('vector', 'Vector DB', 'pgvector / Qdrant', 'ai')
  if (a.extras.includes('ml')) addExternal('llm', 'LLM Provider', 'Claude / GPT', 'ai')
  if (a.extras.includes('payment')) addExternal('pay', 'Payments', 'Stripe')
  if (a.extras.includes('media')) addExternal('media', 'Media Pipeline', 'FFmpeg · S3')
  if (a.extras.includes('geo')) addExternal('geo', 'Geo / Maps', 'Maps · Routing')
  if (a.extras.includes('search')) addExternal('search', 'Search', 'OpenSearch')
  return { nodes, edges }
}

function buildDataFlow(a: Archetype): {
  nodes: GraphNode[]
  edges: GraphEdge[]
  analogy: string
  steps: FlowStep[]
  failureHandling: string[]
} {
  const isAI = a.extras.includes('ml') || a.extras.includes('vector')
  const nodes: GraphNode[] = [
    { id: 'u', label: 'User', sub: 'Browser · App', x: 0, y: 120, kind: 'client' },
    { id: 'edge', label: 'Edge / CDN', sub: 'TLS · Cache', x: 200, y: 120, kind: 'edge' },
    { id: 'lb', label: 'API Gateway', sub: 'Auth · Rate limit', x: 400, y: 120, kind: 'edge' },
    { id: 'app', label: 'App Service', sub: a.stackHints.backend, x: 600, y: 120, kind: 'service' },
    { id: 'cache', label: 'Cache', sub: 'Redis', x: 820, y: 20, kind: 'data' },
    { id: 'db', label: 'Database', sub: a.stackHints.database, x: 820, y: 130, kind: 'data' },
    { id: 'queue', label: 'Event Bus', sub: 'Kafka · async', x: 820, y: 240, kind: 'data' },
  ]
  const edges: GraphEdge[] = [
    { id: 'f1', source: 'u', target: 'edge', label: '1 · HTTPS', animated: true },
    { id: 'f2', source: 'edge', target: 'lb', label: '2 · route', animated: true },
    { id: 'f3', source: 'lb', target: 'app', label: '3 · verify' },
    { id: 'f4', source: 'app', target: 'cache', label: '4 · check', animated: true },
    { id: 'f5', source: 'app', target: 'db', label: '5 · query' },
    { id: 'f6', source: 'app', target: 'queue', label: '6 · emit', animated: true },
  ]

  const analogy = isAI
    ? 'Think of it like ordering at a smart coffee shop: you place an order (your message), a greeter checks your membership card (login), the barista first glances at a "recently made" shelf (cache), otherwise reads the recipe book and your notes (database + AI memory), the AI barista brews your custom drink while narrating each step (streaming answer), and a runner quietly restocks and logs the order in the back (async events).'
    : 'Think of it like ordering at a busy restaurant: you place an order (your request), the host checks your reservation (login), the waiter first looks if the dish is already prepped on the pass (cache), otherwise sends it to the kitchen (database), brings your plate back (response), and a busser cleans up and updates the tab in the background (async events).'

  const steps: FlowStep[] = [
    {
      title: 'You make a request',
      plain: 'You tap a button or type something. Your device sends a secure message over the internet to the app.',
      detail:
        'The client sends an HTTPS request. The nearest CDN/edge node terminates TLS and serves cached static assets (HTML, JS, images) instantly; only dynamic calls travel onward.',
      time: '~5–30 ms',
    },
    {
      title: 'Security checks who you are',
      plain: 'A digital "front desk" makes sure you\'re logged in and aren\'t sending too many requests too fast.',
      detail:
        'The API gateway validates the JWT/session, applies rate limiting and per-tenant quotas, then load-balances the request to the healthiest app instance.',
      time: '~1–5 ms',
    },
    {
      title: 'The app looks in short-term memory first',
      plain: 'Before doing real work, the app checks a fast "recently used" shelf so popular things come back instantly.',
      detail:
        'The service checks Redis. On a cache hit it returns immediately (sub-millisecond). On a miss it continues to the database and then populates the cache for next time.',
      time: '~1 ms (hit)',
    },
    {
      title: 'It fetches the real data',
      plain: 'If it wasn\'t on the shelf, the app opens the "filing cabinet" and safely reads or updates your information.',
      detail: `The service runs parameterized queries against ${a.stackHints.database} (using read replicas for reads), wraps writes in transactions, and enforces business rules.`,
      time: '~10–60 ms',
    },
    ...(isAI
      ? [
          {
            title: 'The AI thinks and replies',
            plain: 'The app asks an AI model for an answer, gives it relevant notes to stay accurate, and streams the reply word-by-word so it feels instant.',
            detail:
              'Relevant context is retrieved from the vector DB (RAG), combined with the prompt, and sent to the LLM. Tokens stream back over SSE/WebSocket so the user sees output as it is generated.',
            time: '~0.5–3 s',
          } as FlowStep,
        ]
      : []),
    {
      title: 'You get your answer',
      plain: 'The finished result travels back to your screen — often already cached so the next person gets it even faster.',
      detail:
        'The response is serialized (JSON/HTML), safe-to-cache results are stored, and the payload is compressed and streamed back through the gateway and edge to the client.',
      time: '~5–20 ms',
    },
    {
      title: 'Background clean-up happens',
      plain: 'Behind the scenes, the app quietly sends emails, updates search, and records analytics — without making you wait.',
      detail:
        'Side-effects are published as events to Kafka. Independent consumers handle notifications, search indexing, analytics and audit logging asynchronously with retries.',
      time: 'async',
    },
  ]

  const failureHandling = [
    'If a service instance is unhealthy, the gateway routes around it and Kubernetes restarts it automatically.',
    'If the database is slow, requests time out gracefully and fall back to cached data where possible.',
    'If a downstream call fails, retries with backoff and circuit breakers stop one failure from cascading.',
    'Every background event is retried and, if it keeps failing, parked in a dead-letter queue for inspection.',
  ]

  return { nodes, edges, analogy, steps, failureHandling }
}

// ---- Plain-language + deep-dive generators ----

function buildArchExplain(a: Archetype): {
  whyPattern: string
  layers: ArchLayer[]
  tradeoffs: { pros: string[]; cons: string[] }
} {
  const isAI = a.extras.includes('ml') || a.extras.includes('vector')
  const isEnterprise = a.key === 'enterprise'

  const whyPattern = isEnterprise
    ? `We start as a well-organized single application (a "modular monolith") because the team and traffic are predictable, then peel off the busiest parts into their own services later. In plain terms: build one tidy house first, and only add separate buildings when you actually outgrow it.`
    : `We use small, independent services instead of one giant program because ${a.category.toLowerCase()}s have very different workloads (e.g. logins vs. ${a.extras.includes('media') ? 'video processing' : a.extras.includes('payment') ? 'payments' : 'search'}) that need to scale and fail independently. In plain terms: instead of one worker doing everything, we hire a team of specialists who can each be added or replaced without stopping the others.`

  const layers: ArchLayer[] = [
    {
      name: 'Client Apps',
      icon: '📱',
      plain: 'What people actually see and touch — the website and mobile app.',
      responsibility: `Renders the UI, collects input, and shows results. Built with ${a.stackHints.frontend}.`,
      tech: a.stackHints.frontend,
      kind: 'client',
    },
    {
      name: 'CDN / Edge',
      icon: '🌍',
      plain: 'A worldwide network of mini-servers that keeps a copy of the app close to every user, so it loads fast anywhere.',
      responsibility: 'Serves static files (images, scripts), handles HTTPS, and absorbs traffic spikes & bad bots.',
      tech: 'Cloudflare / CloudFront',
      kind: 'edge',
    },
    {
      name: 'API Gateway',
      icon: '🚪',
      plain: 'The front door with a security guard — every request passes through here to be identified and checked.',
      responsibility: 'Authentication, rate limiting, request routing, and a single stable entry point for clients.',
      tech: 'Gateway + Auth',
      kind: 'edge',
    },
    {
      name: 'Core Services',
      icon: '⚙️',
      plain: 'The "brain" of the app — where the actual work and rules live (e.g. placing an order, posting a photo).',
      responsibility: `Runs business logic, validates data, and coordinates the databases. Built with ${a.stackHints.backend}.`,
      tech: a.stackHints.backend,
      kind: 'service',
    },
    {
      name: 'Primary Database',
      icon: '💾',
      plain: 'The long-term memory — where all important information is stored safely and never lost.',
      responsibility: 'Reliable, consistent storage of records with transactions, backups and read replicas.',
      tech: a.stackHints.database,
      kind: 'data',
    },
    {
      name: 'Cache',
      icon: '⚡',
      plain: 'A short-term memory for popular data, so the app doesn\'t repeat the same work over and over.',
      responsibility: 'Sub-millisecond reads for hot data, sessions, rate-limit counters and queues.',
      tech: 'Redis',
      kind: 'data',
    },
    {
      name: 'Event Bus',
      icon: '📮',
      plain: 'An internal mailroom that lets different parts of the system message each other without waiting in line.',
      responsibility: 'Decouples services; carries events for notifications, analytics and indexing with replay & retries.',
      tech: 'Kafka',
      kind: 'data',
    },
  ]

  if (a.extras.includes('vector'))
    layers.push({
      name: 'Vector Database',
      icon: '🧭',
      plain: 'A special memory that stores the "meaning" of text so the AI can find relevant information by idea, not just keywords.',
      responsibility: 'Stores embeddings and powers semantic search / retrieval-augmented generation (RAG).',
      tech: 'pgvector / Qdrant',
      kind: 'ai',
    })
  if (a.extras.includes('ml'))
    layers.push({
      name: 'LLM Provider',
      icon: '🤖',
      plain: 'The AI model itself — the part that understands language and generates human-like answers.',
      responsibility: 'Reasoning, generation and tool use; called with retrieved context and streamed back to users.',
      tech: 'Claude / GPT',
      kind: 'ai',
    })
  if (a.extras.includes('payment'))
    layers.push({
      name: 'Payments',
      icon: '💳',
      plain: 'A trusted outside company that safely handles money, so we never store sensitive card details ourselves.',
      responsibility: 'Processes charges, subscriptions and payouts; sends secure webhooks back to our services.',
      tech: 'Stripe',
      kind: 'external',
    })
  if (a.extras.includes('media'))
    layers.push({
      name: 'Media Pipeline',
      icon: '🎞️',
      plain: 'A factory that takes uploaded photos and videos and converts them into fast, streamable formats.',
      responsibility: 'Transcoding, thumbnails and adaptive streaming (HLS) delivered via object storage + CDN.',
      tech: 'FFmpeg · S3',
      kind: 'external',
    })
  if (a.extras.includes('geo'))
    layers.push({
      name: 'Geo / Maps',
      icon: '🗺️',
      plain: 'The maps-and-location brain — it knows where things are and how long they take to reach.',
      responsibility: 'Geocoding, routing, ETAs and live location tracking for real-time matching.',
      tech: 'Maps · Routing API',
      kind: 'external',
    })
  if (a.extras.includes('search'))
    layers.push({
      name: 'Search',
      icon: '🔎',
      plain: 'A super-fast index — like the index at the back of a book — so users can find anything instantly.',
      responsibility: 'Full-text and faceted search kept in sync with the database via events.',
      tech: 'OpenSearch',
      kind: 'external',
    })

  const tradeoffs = {
    pros: [
      'Each part can be scaled up on its own when it gets busy — you only pay for what needs more power.',
      'If one part breaks, the rest keep working (no single point of total failure).',
      'Teams can build and ship features in parallel without stepping on each other.',
      'Popular data is cached, so the app stays fast and the database stays calm under load.',
    ],
    cons: [
      'More moving parts means more to set up, monitor and operate than a simple single app.',
      'Pieces talk over the network, which adds small delays and needs careful error handling.',
      'Data is spread across services, so keeping everything consistent takes extra design.',
      isEnterprise ? 'Splitting too early adds complexity before you need it.' : 'Debugging a request that crosses several services requires good tracing.',
    ],
  }

  return { whyPattern, layers, tradeoffs }
}

function buildPlainOverview(
  a: Archetype,
  title: string,
): {
  simple: string
  analogy: string
  howItWorks: HowItWorksStep[]
  whoUsesIt: string
  businessValue: string
  glossary: { term: string; meaning: string }[]
} {
  const isAI = a.extras.includes('ml') || a.extras.includes('vector')

  const byKey: Record<
    string,
    { simple: string; analogy: string; whoUsesIt: string; businessValue: string }
  > = {
    ai: {
      simple: `${title} is an app that talks with people using artificial intelligence. You ask it something in plain language and it understands the question, looks up the right information, and writes back a clear, helpful answer — almost like chatting with a very knowledgeable assistant that never sleeps.`,
      analogy: 'It works like a brilliant new employee who has instantly read all of your company documents: you ask a question, they quickly flip to the right pages, and then explain the answer in their own words.',
      whoUsesIt: 'Everyday users wanting quick answers, support teams automating replies, and businesses adding an AI helper to their product or website.',
      businessValue: 'Saves time and support costs by answering instantly and 24/7, and usually earns money through monthly subscriptions or per-use pricing.',
    },
    ecommerce: {
      simple: `${title} is an online store. People browse products, add them to a cart, pay securely, and get their orders shipped — while the business manages inventory, prices and orders behind the scenes.`,
      analogy: 'It\'s a shopping mall that never closes: shelves (the catalog), a cart, a checkout counter (payments), and a stockroom & staff (inventory and admin) — all running on the internet.',
      whoUsesIt: 'Shoppers buying products, and store owners managing catalog, orders, promotions and shipping.',
      businessValue: 'Makes money on every sale, and grows revenue with better search, recommendations and a smooth, fast checkout that reduces abandoned carts.',
    },
    social: {
      simple: `${title} is a place where people share posts, photos and videos, follow each other, like and comment, and chat in real time. A personalized feed decides what each person sees.`,
      analogy: 'It\'s like a giant, always-updating noticeboard mixed with a mailroom: everyone can pin content, everyone can react, and messages fly back and forth instantly.',
      whoUsesIt: 'Everyday people connecting with friends and creators, plus advertisers who want to reach large, engaged audiences.',
      businessValue: 'Grows by keeping people engaged, then makes money through advertising, premium features and creator tools.',
    },
    streaming: {
      simple: `${title} lets people watch videos or listen to audio on demand. Content is uploaded, converted into smooth-playing formats, and delivered so it starts fast and rarely buffers — with recommendations for what to watch next.`,
      analogy: 'It\'s like a global TV network with an endless library: a control room converts every show into the right quality for your screen and internet speed, then beams it from the nearest tower to you.',
      whoUsesIt: 'Viewers watching content, and creators/studios uploading and monetizing it.',
      businessValue: 'Earns through subscriptions, ads, or rentals, and keeps viewers longer with fast playback and smart recommendations.',
    },
    fintech: {
      simple: `${title} helps people manage money — checking balances, sending payments, and tracking transactions — safely and instantly. Every action is recorded precisely so the numbers always add up.`,
      analogy: 'It\'s a digital bank branch in your pocket: a teller (the app) that never miscounts, a vault (secure storage), and a perfectly accurate ledger that records every single cent.',
      whoUsesIt: 'People and businesses moving or managing money, and finance teams needing accurate records.',
      businessValue: 'Makes money through transaction fees, subscriptions, or interest — and trust is the product, so security and accuracy come first.',
    },
    delivery: {
      simple: `${title} connects customers, sellers/drivers, and the business in real time. You place an order, the system finds the nearest driver, and you watch it arrive live on a map.`,
      analogy: 'It\'s like an air-traffic controller for orders: it constantly sees where everyone is, matches the right driver to the right order, and guides them along the fastest route.',
      whoUsesIt: 'Customers ordering, drivers/couriers fulfilling, and restaurants/stores managing incoming orders.',
      businessValue: 'Earns commission and delivery fees on each order; efficiency (smart matching, routing) directly drives profit.',
    },
    enterprise: {
      simple: `${title} is a business tool that keeps a company organized — managing its data, workflows and teams in one secure place, with dashboards and reports so leaders can see what\'s happening.`,
      analogy: 'It\'s the digital "operations HQ" of a company: one organized building where every department\'s paperwork, approvals and reports live together instead of scattered spreadsheets.',
      whoUsesIt: 'Employees doing daily work, managers approving and reviewing, and admins configuring the system.',
      businessValue: 'Saves companies money by replacing manual work and scattered tools; typically sold as per-seat subscriptions.',
    },
    generic: {
      simple: `${title} is a web application: people open it in a browser or app, do something useful (create, view, or manage information), and the system stores it safely and shows it back whenever they need it.`,
      analogy: 'It\'s like a smart, shared notebook on the internet: many people can use it at once, nothing gets lost, and it stays fast even as it grows.',
      whoUsesIt: 'End users who need the core feature, plus admins who manage content and settings.',
      businessValue: 'Delivers value by doing a job faster and more reliably than manual methods; commonly monetized via subscriptions.',
    },
  }

  const p = byKey[a.key] ?? byKey.generic

  const howItWorks: HowItWorksStep[] = [
    {
      title: '1. You open the app',
      text: `You visit ${title} in a browser or mobile app. The screens you see are the "frontend" — the friendly face of the system.`,
    },
    {
      title: '2. You do something',
      text: isAI
        ? 'You type a question or request. The app sends it securely to the servers that do the real thinking.'
        : 'You click, type or search. The app sends that action securely to the servers that do the real work.',
    },
    {
      title: '3. The servers do the work',
      text: `Powerful computers (the "backend") check who you are, apply the rules, and ${
        isAI ? 'ask an AI model for an answer using relevant information' : 'look up or update your information in a database'
      }.`,
    },
    {
      title: '4. Your data is stored safely',
      text: 'Everything important is saved in a well-protected database, with backups so nothing is ever lost, plus a fast "cache" so common things load instantly.',
    },
    {
      title: '5. You get your result',
      text: 'The answer travels back to your screen in a fraction of a second — and quiet background tasks (like emails or updates) happen without making you wait.',
    },
  ]

  const glossary = [
    { term: 'Frontend', meaning: 'The part you see and click — the app\'s screens in your browser or phone.' },
    { term: 'Backend', meaning: 'The behind-the-scenes computers that do the real work and enforce the rules.' },
    { term: 'Database', meaning: 'The organized, permanent storage where all information is kept safely.' },
    { term: 'Cache', meaning: 'A fast short-term memory for popular data so the app feels instant.' },
    { term: 'API', meaning: 'The messenger that lets the app and servers talk to each other in a standard way.' },
    ...(isAI
      ? [{ term: 'RAG', meaning: 'Giving the AI relevant notes to read before it answers, so it stays accurate.' }]
      : [{ term: 'Cloud', meaning: 'Renting computers over the internet instead of owning your own servers.' }]),
  ]

  return { ...p, howItWorks, glossary }
}

function generateFromArchetype(query: string): Blueprint {
  const a = pickArchetype(query)
  const title = titleCase(query || 'Software Idea')
  const arch = buildArchitecture(a)
  const flow = buildDataFlow(a)
  const archExplain = buildArchExplain(a)
  const plain = buildPlainOverview(a, title)
  const isAI = a.extras.includes('ml') || a.extras.includes('vector')

  const stack: Blueprint['stack'] = {
    frontend: [
      { name: a.stackHints.frontend, why: 'Component-driven UI with strong ecosystem & SSR.' },
      { name: 'TypeScript', why: 'End-to-end type safety across the stack.' },
      { name: 'Tailwind CSS', why: 'Fast, consistent, responsive styling.' },
      { name: 'TanStack Query', why: 'Server-state caching & background sync.' },
    ],
    backend: [
      { name: a.stackHints.backend, why: 'High-throughput API layer for core business logic.' },
      { name: 'REST + WebSockets', why: 'Standard APIs plus realtime channels.' },
      { name: 'Redis', why: 'Caching, sessions, rate limiting & queues.' },
      { name: 'Kafka', why: 'Durable event streaming between services.' },
    ],
    database: [
      { name: a.stackHints.database, why: 'ACID relational core with JSON & extensions.' },
      { name: 'Redis', why: 'Sub-millisecond cache & ephemeral state.' },
      { name: 'S3-compatible storage', why: 'Blobs, uploads & backups.' },
    ],
    infra: [
      { name: 'Docker', why: 'Reproducible container images.' },
      { name: 'Kubernetes', why: 'Orchestration, autoscaling & self-healing.' },
      { name: 'Terraform', why: 'Infrastructure as code.' },
      { name: 'GitHub Actions', why: 'CI/CD automation.' },
    ],
  }
  if (isAI) {
    stack.ai = [
      { name: 'Claude Opus 4.8', why: 'Reasoning, tool use & long-context generation.' },
      { name: 'pgvector', why: 'Embedding storage & semantic retrieval (RAG).' },
      { name: 'LangGraph', why: 'Orchestrating multi-step agent workflows.' },
      { name: 'Embeddings API', why: 'Turn documents into searchable vectors.' },
    ]
  }
  if (a.extras.includes('payment')) stack.backend.push({ name: 'Stripe', why: 'Payments, subscriptions & billing.' })
  if (a.extras.includes('media')) stack.infra.push({ name: 'FFmpeg + CloudFront', why: 'Transcoding & global media delivery.' })
  if (a.extras.includes('geo')) stack.backend.push({ name: 'Maps / Routing API', why: 'Geocoding, ETA & live tracking.' })

  return {
    query,
    title,
    tagline: `A production-grade blueprint for building a ${a.category.toLowerCase()} like "${title}".`,
    category: a.category,
    complexity: a.complexity,
    icon: a.icon,
    color: a.color,
    overview: {
      summary: `${title} is modeled as a ${a.category.toLowerCase()} built on a ${a.stackHints.frontend} frontend and a ${a.stackHints.backend} backend, backed by ${a.stackHints.database}. The system is designed for scale, reliability, and fast iteration — with clear separation between the presentation layer, business services, and data stores, plus ${a.stackHints.special} for its most demanding workloads.`,
      simple: plain.simple,
      analogy: plain.analogy,
      howItWorks: plain.howItWorks,
      whoUsesIt: plain.whoUsesIt,
      businessValue: plain.businessValue,
      glossary: plain.glossary,
      features: [
        'Responsive, accessible UI with dark/light theming',
        'Secure authentication & role-based access control',
        'Horizontally scalable services behind an API gateway',
        'Realtime updates via WebSockets & event streaming',
        'Observability: metrics, logs, traces & alerting',
        isAI ? 'AI features with retrieval-augmented generation' : 'Full-text & faceted search',
      ],
      stats: [
        { label: 'Target scale', value: a.users },
        { label: 'Peak load', value: a.rps },
        { label: 'p95 latency', value: '< 180ms' },
        { label: 'Uptime SLO', value: '99.95%' },
      ],
    },
    architecture: {
      pattern: a.key === 'enterprise' ? 'Modular Monolith → Microservices' : 'Microservices + Event-Driven',
      description: `A gateway fronts a set of ${a.stackHints.backend} services that own their data. Redis absorbs read load, Kafka decouples side-effects, and ${a.stackHints.special} handles specialized workloads. The design starts pragmatic and splits into services along domain boundaries as traffic grows.`,
      whyPattern: archExplain.whyPattern,
      layers: archExplain.layers,
      tradeoffs: archExplain.tradeoffs,
      nodes: arch.nodes,
      edges: arch.edges,
    },
    dataFlow: flow,
    pipeline: {
      steps: [
        { name: 'Source', desc: 'Push to Git triggers the pipeline', icon: '🔀' },
        { name: 'Build', desc: 'Install, typecheck, compile, bundle', icon: '🔨' },
        { name: 'Test', desc: 'Unit, integration & e2e suites', icon: '🧪' },
        { name: 'Scan', desc: 'SAST, deps & container CVE scan', icon: '🛡️' },
        { name: 'Package', desc: 'Build & push Docker image', icon: '📦' },
        { name: 'Deploy', desc: 'Canary rollout to Kubernetes', icon: '🚀' },
        { name: 'Observe', desc: 'Metrics, logs, traces & alerts', icon: '📊' },
      ],
    },
    stack,
    frontend: [
      `Built with ${a.stackHints.frontend} + TypeScript, using a component library and design tokens.`,
      'Server-side rendering / streaming for fast first paint and SEO.',
      'Client state via TanStack Query; global UI state via a lightweight store.',
      'Code-splitting, image optimization, and skeleton loading for perceived speed.',
      'Fully responsive with dark/light mode and accessibility (WCAG AA).',
    ],
    backend: [
      `A ${a.stackHints.backend} service layer exposes REST + WebSocket APIs behind a gateway.`,
      'Domain logic organized by bounded context with clean boundaries.',
      'Redis for caching, rate limiting, and background job queues.',
      'Kafka streams domain events to consumers (search, analytics, notifications).',
      'Idempotent handlers, retries with backoff, and circuit breakers for resilience.',
    ],
    database: {
      points: [
        `${a.stackHints.database} is the source of truth with migrations in version control.`,
        'Read replicas and connection pooling absorb read-heavy traffic.',
        'Redis caches hot rows; S3 stores large blobs and backups.',
        'Partitioning / sharding strategy defined for the largest tables.',
      ],
      tables:
        a.key === 'ecommerce'
          ? ['users', 'products', 'carts', 'orders', 'payments', 'inventory', 'reviews']
          : a.key === 'social'
          ? ['users', 'posts', 'media', 'follows', 'likes', 'comments', 'messages']
          : a.key === 'fintech'
          ? ['users', 'accounts', 'transactions', 'ledger_entries', 'cards', 'kyc']
          : isAI
          ? ['users', 'conversations', 'messages', 'documents', 'embeddings', 'usage']
          : ['users', 'organizations', 'projects', 'items', 'activity', 'audit_log'],
    },
    auth: [
      'OAuth 2.0 / OIDC social login plus email + password with hashing (Argon2).',
      'Short-lived JWT access tokens with rotating refresh tokens (httpOnly cookies).',
      'Role-based & attribute-based access control (RBAC/ABAC).',
      'MFA (TOTP / passkeys) and device/session management.',
      'Central identity via Auth0 / Clerk / Keycloak or a self-hosted service.',
    ],
    api: {
      style: isAI ? 'REST + Streaming (SSE) + WebSockets' : 'REST + WebSockets (GraphQL optional)',
      points: [
        'Versioned, documented with OpenAPI; typed clients generated for the frontend.',
        'Consistent error envelope, pagination, filtering, and idempotency keys.',
        'Rate limiting, request signing, and per-tenant quotas at the gateway.',
      ],
      endpoints: [
        { method: 'POST', path: '/api/v1/auth/login', desc: 'Authenticate & issue tokens' },
        { method: 'GET', path: '/api/v1/me', desc: 'Current user profile' },
        { method: 'GET', path: '/api/v1/items', desc: 'List with pagination & filters' },
        { method: 'POST', path: '/api/v1/items', desc: 'Create a new resource' },
        isAI
          ? { method: 'POST', path: '/api/v1/chat', desc: 'Streamed AI completion (SSE)' }
          : { method: 'GET', path: '/api/v1/search', desc: 'Full-text & faceted search' },
        { method: 'WS', path: '/ws', desc: 'Realtime channel for live updates' },
      ],
    },
    cloud: [
      'Multi-AZ deployment on AWS / GCP / Azure with infra as code (Terraform).',
      'Managed Kubernetes (EKS/GKE/AKS) for stateless services; managed DB for state.',
      'Object storage + global CDN for static assets and media.',
      'Secrets in a vault; least-privilege IAM; VPC isolation and private subnets.',
    ],
    devops: [
      'GitOps workflow (ArgoCD) with environment promotion (dev → staging → prod).',
      'Observability stack: Prometheus + Grafana, OpenTelemetry traces, centralized logs.',
      'Autoscaling (HPA/KEDA), pod disruption budgets, and health/readiness probes.',
      'Automated backups, disaster recovery drills, and runbooks.',
    ],
    deployment: [
      'Immutable Docker images tagged by commit SHA; scanned before promotion.',
      'Progressive delivery: canary / blue-green with automated rollback on SLO breach.',
      'Zero-downtime migrations (expand/contract) and feature flags for safe releases.',
      'Edge deployment for the frontend; regional services close to users.',
    ],
    security: [
      'HTTPS everywhere, HSTS, secure cookies, and strict CSP headers.',
      'Input validation, output encoding, and parameterized queries (no SQLi/XSS).',
      'Secrets management, encryption at rest & in transit, key rotation.',
      'Dependency & container scanning, SAST/DAST in CI, and regular pen-tests.',
      'Audit logging, anomaly detection, and least-privilege everywhere.',
    ],
    scaling: [
      'Stateless services scale horizontally behind the load balancer.',
      'Read replicas, caching layers, and CDN offload the database and origin.',
      'Async processing via queues smooths spikes; backpressure protects the system.',
      'Sharding / partitioning for the largest datasets; multi-region for global users.',
      'Load & chaos testing validate capacity and failure behavior before launch.',
    ],
    folders: `${a.key}-app/
├─ apps/
│  ├─ web/                 # ${a.stackHints.frontend} frontend
│  │  ├─ app/              # routes / pages
│  │  ├─ components/       # UI components
│  │  ├─ lib/              # api client, hooks, utils
│  │  └─ styles/
│  └─ api/                 # ${a.stackHints.backend} backend
│     ├─ src/
│     │  ├─ modules/       # bounded contexts
│     │  ├─ routes/        # http handlers
│     │  ├─ services/      # business logic
│     │  ├─ db/            # models & migrations
│     │  └─ jobs/          # background workers
│     └─ tests/
├─ packages/
│  ├─ ui/                  # shared component library
│  ├─ config/              # eslint, tsconfig, tailwind
│  └─ types/               # shared types & schemas
├─ infra/
│  ├─ terraform/           # cloud resources
│  ├─ k8s/                 # manifests / helm charts
│  └─ docker/              # Dockerfiles
├─ .github/workflows/      # CI/CD pipelines
├─ docker-compose.yml
└─ README.md`,
    roadmap: [
      {
        title: 'Foundations',
        weeks: 'Weeks 1–3',
        items: [
          'HTML, CSS, JavaScript & TypeScript fundamentals',
          'Git, GitHub, and command-line basics',
          'How the web works: HTTP, DNS, REST',
        ],
      },
      {
        title: 'Frontend',
        weeks: 'Weeks 4–7',
        items: [
          `${a.stackHints.frontend} components, state & routing`,
          'Tailwind CSS & responsive design',
          'Data fetching, forms & auth flows',
        ],
      },
      {
        title: 'Backend & Data',
        weeks: 'Weeks 8–12',
        items: [
          `${a.stackHints.backend} APIs, validation & error handling`,
          `${a.stackHints.database} schema design & queries`,
          'Auth, caching with Redis & background jobs',
        ],
      },
      {
        title: 'Scale & Ship',
        weeks: 'Weeks 13–16',
        items: [
          'Docker, CI/CD & cloud deployment',
          'Observability, testing & security hardening',
          isAI ? 'RAG, embeddings & LLM integration' : 'Search, performance & load testing',
        ],
      },
    ],
    companies: a.companies,
    cost: {
      note: 'Estimated monthly infrastructure cost at early-scale (thousands of active users). Costs grow roughly linearly with traffic and storage.',
      rows: [
        { item: 'Compute (Kubernetes / servers)', tier: '3–6 nodes', monthly: 420 },
        { item: 'Managed database + replica', tier: 'Medium instance', monthly: 260 },
        { item: 'Redis cache', tier: 'Standard', monthly: 70 },
        { item: 'Object storage + CDN', tier: 'Pay-as-you-go', monthly: 90 },
        { item: 'Load balancer + networking', tier: 'Standard', monthly: 60 },
        { item: 'Monitoring & logging', tier: 'Team plan', monthly: 80 },
        ...(isAI ? [{ item: 'LLM / AI usage', tier: 'Per-token', monthly: 500 }] : []),
        ...(a.extras.includes('media') ? [{ item: 'Media transcode + egress', tier: 'Usage', monthly: 340 }] : []),
        ...(a.extras.includes('payment') ? [{ item: 'Payments (Stripe fees vary)', tier: '2.9% + 30¢', monthly: 0 }] : []),
      ],
    },
    timeline: [
      { phase: 'Discovery & Design', weeks: 2, work: 'Requirements, wireframes, data model, architecture.' },
      { phase: 'Core MVP', weeks: 6, work: 'Auth, primary flows, database, key APIs & UI.' },
      { phase: 'Feature Build-out', weeks: 5, work: 'Secondary features, integrations, admin, realtime.' },
      { phase: 'Hardening', weeks: 3, work: 'Testing, security, performance, observability.' },
      { phase: 'Launch & Iterate', weeks: 2, work: 'Deploy, monitor, gather feedback, iterate.' },
    ],
    bestPractices: [
      'Start with the simplest architecture that works; split into services only when needed.',
      'Automate everything: tests, builds, deploys, and infrastructure.',
      'Design for failure — retries, timeouts, circuit breakers, and graceful degradation.',
      'Measure before optimizing; add observability from day one.',
      'Keep security and privacy as first-class requirements, not an afterthought.',
      'Write clear docs and ADRs so the team can move fast without breaking things.',
    ],
    futureScope: [
      isAI ? 'Deeper agentic workflows and multi-modal (voice/vision) features.' : 'AI-assisted features (search, recommendations, summarization).',
      'Multi-region active-active for global low latency.',
      'Advanced analytics & a self-serve data platform.',
      'Mobile apps with offline-first sync.',
      'Marketplace / plugin ecosystem and public API.',
      'Cost optimization via autoscaling, spot instances, and caching.',
    ],
  }
}

// Public generator: start from the archetype base, then overlay the best-matching
// domain knowledge so the offline result is genuinely tailored to the query.
export function generateBlueprint(query: string): Blueprint {
  const bp = generateFromArchetype(query)
  const d = pickDomain(query)
  if (d) applySpec(bp, domainToSpec(d, bp.title))
  return bp
}

function pickDomain(query: string): DomainEntry | null {
  const s = ` ${query.toLowerCase()} `
  let best: DomainEntry | null = null
  let bestScore = 0
  for (const d of domainKnowledge) {
    let score = 0
    for (const kw of d.keywords) {
      const k = kw.toLowerCase().trim()
      if (!k) continue
      // whole-word-ish match scores higher than a loose substring
      if (s.includes(` ${k} `)) score += k.length + 3
      else if (s.includes(k)) score += k.length
    }
    if (score > bestScore) {
      bestScore = score
      best = d
    }
  }
  return bestScore > 0 ? best : null
}

function domainToSpec(d: DomainEntry, title: string): AISpec {
  return {
    category: d.category,
    icon: d.icon,
    complexity: d.complexity,
    overview: {
      simple: `${title} is a ${d.label.toLowerCase()} system. ${d.overview.whoUsesIt} ${d.overview.businessValue}`,
      analogy: d.overview.analogy,
      whoUsesIt: d.overview.whoUsesIt,
      businessValue: d.overview.businessValue,
      howItWorks: d.overview.howItWorks,
      features: d.overview.features,
    },
    architecture: {
      pattern: d.architecture.pattern,
      whyPattern: d.architecture.whyPattern,
      components: d.architecture.components,
      pros: d.architecture.pros,
      cons: d.architecture.cons,
    },
    dataFlow: {
      analogy: d.dataFlow.analogy,
      steps: d.dataFlow.steps,
      failureHandling: d.dataFlow.failureHandling,
    },
    stack: d.stack,
    database: { tables: d.tables },
    companies: d.companies,
  }
}

// ============================================================================
// AI-powered blueprint: merge a loosely-typed spec from an LLM over the
// template so results are always complete, even if the model omits fields.
// ============================================================================

export interface AISpec {
  title?: string
  category?: string
  icon?: string
  complexity?: string
  overview?: {
    simple?: string
    analogy?: string
    howItWorks?: unknown[]
    features?: string[]
    whoUsesIt?: string
    businessValue?: string
  }
  architecture?: {
    pattern?: string
    whyPattern?: string
    components?: unknown[]
    pros?: string[]
    cons?: string[]
  }
  dataFlow?: { analogy?: string; steps?: unknown[]; failureHandling?: string[] }
  stack?: { frontend?: unknown[]; backend?: unknown[]; database?: unknown[]; infra?: unknown[]; ai?: unknown[] }
  database?: { tables?: string[]; points?: string[] }
  api?: { style?: string; endpoints?: unknown[] }
  auth?: string[]
  cloud?: string[]
  devops?: string[]
  deployment?: string[]
  security?: string[]
  scaling?: string[]
  frontend?: string[]
  backend?: string[]
  roadmap?: unknown[]
  companies?: string[]
  cost?: unknown[]
  timeline?: unknown[]
  bestPractices?: string[]
  futureScope?: string[]
}

function normKind(k?: string): GraphNode['kind'] {
  const s = (k || '').toLowerCase()
  if (/(client|front|user|ui|mobile|web|browser|app\b|device|camera)/.test(s)) return 'client'
  if (/(edge|cdn|gateway|proxy|balanc|ingress|router)/.test(s)) return 'edge'
  if (/(ai|ml|model|vision|llm|vector|inference|embedding|neural|detector)/.test(s)) return 'ai'
  if (/(data|db|database|cache|store|queue|storage|bucket|warehouse|index|stream|kafka|redis)/.test(s)) return 'data'
  if (/(external|third|payment|maps|twilio|stripe|sms|email|webhook|provider|vendor)/.test(s)) return 'external'
  return 'service'
}

const asStr = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() ? v.trim() : undefined
const asStrArr = (v: unknown): string[] | undefined =>
  Array.isArray(v) ? (v.filter((x) => typeof x === 'string' && x.trim()) as string[]) : undefined
const asArr = (v: unknown): Record<string, unknown>[] | undefined =>
  Array.isArray(v) && v.length ? (v as Record<string, unknown>[]) : undefined

function layoutComponents(comps: Record<string, unknown>[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
  type C = { name: string; tech?: string; kind: GraphNode['kind'] }
  const buckets: Record<'client' | 'edge' | 'service' | 'sink', C[]> = {
    client: [],
    edge: [],
    service: [],
    sink: [],
  }
  comps.forEach((raw) => {
    const kind = normKind(asStr(raw.kind))
    const c: C = { name: asStr(raw.name) || 'Component', tech: asStr(raw.tech), kind }
    const b = kind === 'client' ? 'client' : kind === 'edge' ? 'edge' : kind === 'service' ? 'service' : 'sink'
    buckets[b].push(c)
  })
  const X = { client: 0, edge: 250, service: 510, sink: 790 }
  const GAP = 110
  const nodes: GraphNode[] = []
  const place = (list: C[], x: number): string[] =>
    list.map((c, i) => {
      const id = `n${nodes.length}`
      nodes.push({ id, label: c.name, sub: c.tech, x, y: i * GAP, kind: c.kind })
      return id
    })
  const clientIds = place(buckets.client, X.client)
  const edgeIds = place(buckets.edge, X.edge)
  const serviceIds = place(buckets.service, X.service)
  const sinkIds = place(buckets.sink, X.sink)

  const edges: GraphEdge[] = []
  let ei = 0
  const link = (s: string, t: string, animated?: boolean) =>
    s && t && edges.push({ id: `ae${ei++}`, source: s, target: t, animated })
  const firstEdge = edgeIds[0] || serviceIds[0] || sinkIds[0]
  clientIds.forEach((c) => link(c, firstEdge, true))
  const hub = serviceIds[0] || edgeIds[0] || clientIds[0]
  edgeIds.forEach((e) => (serviceIds[0] ? link(e, serviceIds[0]) : sinkIds.forEach((s) => link(e, s))))
  serviceIds.slice(1).forEach((s) => link(hub, s))
  sinkIds.forEach((s) => link(hub, s, true))
  return { nodes, edges }
}

export function buildBlueprintFromSpec(query: string, spec: AISpec): Blueprint {
  const bp = generateBlueprint(query) // full, domain-aware template as the safety net
  applySpec(bp, spec, `AI-generated blueprint for "${bp.title}".`)
  return bp
}

// Overlay a (partial, loosely-typed) spec onto an existing blueprint in place.
// Used by both the AI path and the offline domain knowledge base.
function applySpec(bp: Blueprint, spec: AISpec, tagline?: string): void {
  const s = spec || {}

  if (asStr(s.title)) bp.title = asStr(s.title)!
  if (asStr(s.category)) bp.category = asStr(s.category)!
  if (asStr(s.icon)) bp.icon = asStr(s.icon)!.slice(0, 2)
  if (s.complexity && ['Beginner', 'Intermediate', 'Advanced'].includes(s.complexity))
    bp.complexity = s.complexity as Blueprint['complexity']
  if (tagline) bp.tagline = tagline

  const ov = s.overview || {}
  if (asStr(ov.simple)) bp.overview.simple = asStr(ov.simple)!
  if (asStr(ov.analogy)) bp.overview.analogy = asStr(ov.analogy)!
  if (asStr(ov.whoUsesIt)) bp.overview.whoUsesIt = asStr(ov.whoUsesIt)!
  if (asStr(ov.businessValue)) bp.overview.businessValue = asStr(ov.businessValue)!
  if (asStrArr(ov.features)?.length) bp.overview.features = asStrArr(ov.features)!
  const hiw = asArr(ov.howItWorks)
  if (hiw)
    bp.overview.howItWorks = hiw
      .map((h, i) =>
        typeof h === 'string'
          ? { title: `Step ${i + 1}`, text: h }
          : { title: asStr(h.title) || `Step ${i + 1}`, text: asStr(h.text) || '' },
      )
      .filter((h) => h.text)

  const ar = s.architecture || {}
  if (asStr(ar.pattern)) bp.architecture.pattern = asStr(ar.pattern)!
  if (asStr(ar.whyPattern)) bp.architecture.whyPattern = asStr(ar.whyPattern)!
  const comps = asArr(ar.components)
  if (comps && comps.length >= 3) {
    const layers = comps
      .map((c) => ({
        name: asStr(c.name) || 'Component',
        icon: asStr(c.icon) || '🔧',
        plain: asStr(c.plain) || '',
        responsibility: asStr(c.responsibility) || asStr(c.tech) || '',
        tech: asStr(c.tech) || '',
        kind: normKind(asStr(c.kind)),
      }))
      .filter((l) => l.plain)
    if (layers.length >= 3) {
      bp.architecture.layers = layers
      const g = layoutComponents(comps)
      if (g.nodes.length >= 3) {
        bp.architecture.nodes = g.nodes
        bp.architecture.edges = g.edges
      }
    }
  }
  if (asStrArr(ar.pros)?.length) bp.architecture.tradeoffs.pros = asStrArr(ar.pros)!
  if (asStrArr(ar.cons)?.length) bp.architecture.tradeoffs.cons = asStrArr(ar.cons)!

  const df = s.dataFlow || {}
  if (asStr(df.analogy)) bp.dataFlow.analogy = asStr(df.analogy)!
  const steps = asArr(df.steps)
  if (steps)
    bp.dataFlow.steps = steps
      .map((x) => ({
        title: asStr(x.title) || 'Step',
        plain: asStr(x.plain) || '',
        detail: asStr(x.detail) || '',
        time: asStr(x.time) || '—',
      }))
      .filter((x) => x.plain || x.detail)
  if (asStrArr(df.failureHandling)?.length) bp.dataFlow.failureHandling = asStrArr(df.failureHandling)!

  const stk = s.stack || {}
  const mapStack = (v: unknown): StackItem[] | undefined =>
    Array.isArray(v)
      ? (v
          .map((x) => (typeof x === 'string' ? { name: x, why: '' } : { name: asStr((x as any).name) || '', why: asStr((x as any).why) || '' }))
          .filter((x) => x.name) as StackItem[])
      : undefined
  if (mapStack(stk.frontend)?.length) bp.stack.frontend = mapStack(stk.frontend)!
  if (mapStack(stk.backend)?.length) bp.stack.backend = mapStack(stk.backend)!
  if (mapStack(stk.database)?.length) bp.stack.database = mapStack(stk.database)!
  if (mapStack(stk.infra)?.length) bp.stack.infra = mapStack(stk.infra)!
  if (mapStack(stk.ai)?.length) bp.stack.ai = mapStack(stk.ai)!

  const db = s.database || {}
  if (asStrArr(db.tables)?.length) bp.database.tables = asStrArr(db.tables)!
  if (asStrArr(db.points)?.length) bp.database.points = asStrArr(db.points)!

  const api = s.api || {}
  if (asStr(api.style)) bp.api.style = asStr(api.style)!
  const eps = asArr(api.endpoints)
  if (eps)
    bp.api.endpoints = eps
      .map((e) => ({
        method: (asStr(e.method) || 'GET').toUpperCase().slice(0, 6),
        path: asStr(e.path) || '/',
        desc: asStr(e.desc) || '',
      }))
      .filter((e) => e.path)

  if (asStrArr(s.auth)?.length) bp.auth = asStrArr(s.auth)!
  if (asStrArr(s.cloud)?.length) bp.cloud = asStrArr(s.cloud)!
  if (asStrArr(s.devops)?.length) bp.devops = asStrArr(s.devops)!
  if (asStrArr(s.deployment)?.length) bp.deployment = asStrArr(s.deployment)!
  if (asStrArr(s.security)?.length) bp.security = asStrArr(s.security)!
  if (asStrArr(s.scaling)?.length) bp.scaling = asStrArr(s.scaling)!
  if (asStrArr(s.frontend)?.length) bp.frontend = asStrArr(s.frontend)!
  if (asStrArr(s.backend)?.length) bp.backend = asStrArr(s.backend)!
  if (asStrArr(s.bestPractices)?.length) bp.bestPractices = asStrArr(s.bestPractices)!
  if (asStrArr(s.futureScope)?.length) bp.futureScope = asStrArr(s.futureScope)!
  if (asStrArr(s.companies)?.length) bp.companies = asStrArr(s.companies)!

  const rm = asArr(s.roadmap)
  if (rm)
    bp.roadmap = rm
      .map((p) => ({ title: asStr(p.title) || 'Phase', weeks: asStr(p.weeks) || '', items: asStrArr(p.items) || [] }))
      .filter((p) => p.items.length)

  const cost = asArr(s.cost)
  if (cost)
    bp.cost.rows = cost
      .map((c) => ({ item: asStr(c.item) || 'Item', tier: asStr(c.tier) || '', monthly: Number(c.monthly) || 0 }))
      .filter((c) => c.item)

  const tl = asArr(s.timeline)
  if (tl)
    bp.timeline = tl
      .map((t) => ({ phase: asStr(t.phase) || 'Phase', weeks: Number(t.weeks) || 2, work: asStr(t.work) || '' }))
      .filter((t) => t.phase)
}

export const dashboardTabs = [
  'Overview',
  'Architecture',
  'Tech Stack',
  'Data Flow',
  'Pipeline',
  'Frontend',
  'Backend',
  'Database',
  'Authentication',
  'API',
  'Cloud',
  'DevOps',
  'Deployment',
  'Security',
  'Scaling',
  'Folder Structure',
  'Learning Roadmap',
  'Companies',
  'Cost Estimate',
  'Timeline',
  'Best Practices',
  'Future Scope',
] as const
export type DashboardTab = (typeof dashboardTabs)[number]
