# TechPulse — Tech Intelligence Dashboard

A modern, animated **Tech Intelligence Dashboard** that surfaces the latest trends across the software
and AI industry — and turns *any* software idea into a complete interactive blueprint.

Built with **Vite · React · TypeScript · Tailwind CSS · Framer Motion · React Flow · Recharts**.

## ✨ Features

**Landing page (auto-populated intelligence)**
- Animated hero with a typewriter search box and example searches
- Live scrolling ticker of the latest releases
- 16-topic overview grid (AI, languages, frameworks, cloud, DevOps, frontend, backend, DB, mobile, Web3…)
- **Latest Tech News** — release cards with "what's new" + breaking changes (expandable)
- **Trending Technologies** — filterable cards → full technology page
- **Trending AI Models** — GPT, Claude, Gemini, Llama, Mistral, DeepSeek, Qwen, Phi (context window, capabilities, pricing)
- **Trending GitHub Projects** — stars, language, tags, last updated
- **Latest Framework Releases** — version, notes, features, migration
- **Technology Comparison** — head-to-head cards → detailed comparison page
- **Popular Software Architectures** — expandable pros/cons/best-for
- **Featured Projects** — click to instantly generate an architecture
- **Live Market Trends** — charts for languages, frameworks, salaries, skills, databases, cloud, DevOps, hiring

**Search experience → full interactive dashboard**
Search anything (or click a project) and get a generated blueprint with **22 tabs**:
Overview · Architecture (React Flow) · Tech Stack · Data Flow (React Flow) · Pipeline · Frontend · Backend ·
Database · Authentication · API · Cloud · DevOps · Deployment · Security · Scaling · Folder Structure ·
Learning Roadmap · Companies · Cost Estimate (chart) · Timeline · Best Practices · Future Scope.

The generator is **archetype-aware** — searching "Banking App", "Food Delivery", "Instagram Clone",
"AI SaaS" etc. tailors the stack, diagrams, tables, companies and costs to that domain.

**Design**
- Glassmorphism, animated gradients, floating orbs, smooth page transitions
- Dark / light mode (persisted), fully responsive
- Skeleton loading, interactive charts, React Flow diagrams, timeline animations

## 🚀 Getting started

```bash
npm install      # already done
npm run dev      # start the dev server (opens http://localhost:5173)
```

Other scripts:

```bash
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## 🗂 Project structure

```
src/
├─ components/          # Navbar, Hero, Footer, FlowDiagram, AnimatedBackground
│  ├─ sections/         # Home page sections (News, Trending, AI, GitHub, …)
│  └─ ui/               # Section, Reveal, Skeleton primitives
├─ context/             # ThemeContext (dark/light)
├─ data/                # typed mock data + blueprint generator
└─ pages/               # Home, SearchDashboard, TechDetail, ComparisonDetail, NotFound
```

> All data shown is illustrative (curated mock data reflecting the state of the industry in mid-2026).
> Swap the modules in `src/data/` for live API calls to make it real-time.
