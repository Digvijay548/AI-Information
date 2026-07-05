export interface NewsItem {
  id: string
  name: string
  version: string
  date: string
  category: string
  summary: string
  whatsNew: string[]
  breaking?: string[]
  url: string
  accent: string
}

export interface TechCard {
  id: string
  name: string
  category: string
  logo: string // emoji / short symbol
  color: string
  tagline: string
  popularity: number // 0-100
  trend: number // percent change
  stars?: string
  description: string
  strengths: string[]
  useCases: string[]
  companies: string[]
  ecosystem: string[]
}

export interface AIModel {
  id: string
  name: string
  company: string
  version: string
  date: string
  color: string
  logo: string
  contextWindow: string
  capabilities: string[]
  useCases: string[]
  benchmark: number // 0-100 composite
  modality: string[]
  pricing: string
}

export interface GithubRepo {
  id: string
  name: string
  owner: string
  stars: string
  starsToday: string
  forks: string
  language: string
  langColor: string
  description: string
  updated: string
  tags: string[]
}

export interface Framework {
  id: string
  name: string
  version: string
  date: string
  type: string
  color: string
  logo: string
  releaseNotes: string
  features: string[]
  migration: string
}

export interface Comparison {
  id: string
  slug: string
  a: string
  b: string
  category: string
  colorA: string
  colorB: string
  summary: string
  winner: string
  rows: { label: string; a: string; b: string; edge: 'a' | 'b' | 'tie' }[]
  scoreA: number
  scoreB: number
}

export interface Architecture {
  id: string
  name: string
  icon: string
  color: string
  short: string
  description: string
  pros: string[]
  cons: string[]
  bestFor: string[]
}

export interface ProjectIdea {
  id: string
  slug: string
  name: string
  icon: string
  color: string
  category: string
  blurb: string
  complexity: 'Beginner' | 'Intermediate' | 'Advanced'
  stack: string[]
}

export interface TrendMetric {
  label: string
  value: string
  change: number
  color: string
}
