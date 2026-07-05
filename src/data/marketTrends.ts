import { TrendMetric } from './types'

export const popularLanguages = [
  { name: 'Python', value: 31.2, color: '#ffd43b' },
  { name: 'JavaScript', value: 24.6, color: '#f7df1e' },
  { name: 'TypeScript', value: 19.8, color: '#3178c6' },
  { name: 'Go', value: 9.4, color: '#00add8' },
  { name: 'Rust', value: 7.9, color: '#f74c00' },
  { name: 'Java', value: 7.1, color: '#e76f00' },
]

export const growingFrameworks = [
  { name: 'FastAPI', growth: 62 },
  { name: 'Astro', growth: 54 },
  { name: 'SvelteKit', growth: 41 },
  { name: 'Next.js', growth: 38 },
  { name: 'Axum', growth: 33 },
  { name: 'NestJS', growth: 27 },
]

export const highestPaying: TrendMetric[] = [
  { label: 'Rust', value: '$172k', change: 9.6, color: '#f74c00' },
  { label: 'Go', value: '$165k', change: 5.3, color: '#00add8' },
  { label: 'Solidity', value: '$161k', change: 4.1, color: '#627eea' },
  { label: 'Scala', value: '$158k', change: 1.2, color: '#dc322f' },
  { label: 'Elixir', value: '$154k', change: 3.4, color: '#6e4a7e' },
]

export const inDemandSkills: TrendMetric[] = [
  { label: 'AI / LLM Engineering', value: '#1', change: 118, color: '#a855f7' },
  { label: 'Cloud (AWS/GCP/Azure)', value: '#2', change: 34, color: '#22d3ee' },
  { label: 'Kubernetes / Platform', value: '#3', change: 29, color: '#326ce5' },
  { label: 'Data Engineering', value: '#4', change: 26, color: '#10b981' },
  { label: 'Cybersecurity', value: '#5', change: 41, color: '#f43f5e' },
]

export const popularDatabases = [
  { name: 'PostgreSQL', value: 49, color: '#336791' },
  { name: 'MySQL', value: 38, color: '#00758f' },
  { name: 'MongoDB', value: 31, color: '#00ed64' },
  { name: 'Redis', value: 28, color: '#dc382d' },
  { name: 'SQLite', value: 24, color: '#003b57' },
]

export const cloudPlatforms = [
  { name: 'AWS', value: 31, color: '#ff9900' },
  { name: 'Azure', value: 25, color: '#008ad7' },
  { name: 'Google Cloud', value: 13, color: '#4285f4' },
  { name: 'Cloudflare', value: 9, color: '#f38020' },
  { name: 'Vercel', value: 7, color: '#e5e7eb' },
]

export const devopsTools = [
  { name: 'Docker', value: 88, color: '#2496ed' },
  { name: 'Kubernetes', value: 71, color: '#326ce5' },
  { name: 'GitHub Actions', value: 65, color: '#2088ff' },
  { name: 'Terraform', value: 58, color: '#7b42bc' },
  { name: 'ArgoCD', value: 39, color: '#ef7b4d' },
]

// 12-month synthetic hiring trend index (base 100)
export const hiringTrend = [
  { month: 'Jul', ai: 100, cloud: 100, web: 100 },
  { month: 'Aug', ai: 108, cloud: 103, web: 101 },
  { month: 'Sep', ai: 121, cloud: 106, web: 100 },
  { month: 'Oct', ai: 134, cloud: 110, web: 102 },
  { month: 'Nov', ai: 149, cloud: 112, web: 103 },
  { month: 'Dec', ai: 158, cloud: 115, web: 101 },
  { month: 'Jan', ai: 171, cloud: 119, web: 104 },
  { month: 'Feb', ai: 185, cloud: 121, web: 105 },
  { month: 'Mar', ai: 202, cloud: 126, web: 106 },
  { month: 'Apr', ai: 219, cloud: 130, web: 107 },
  { month: 'May', ai: 238, cloud: 134, web: 108 },
  { month: 'Jun', ai: 261, cloud: 139, web: 109 },
]

export const tickerItems = [
  'React 20 stable',
  'Node 24 LTS',
  'Python 3.14 no-GIL',
  'Next.js 16 Turbopack',
  'PostgreSQL 18 async I/O',
  'Claude Opus 4.8',
  'GPT-5.1',
  'Gemini 3 Pro',
  'Kubernetes 1.33',
  'Rust 1.90 async closures',
  'TypeScript 5.8 native',
  'Llama 4 · 10M ctx',
  'pgvector everywhere',
  'DeepSeek V4',
  'Bun 1.2',
]
