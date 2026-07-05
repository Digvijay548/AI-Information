import { NewsItem } from './types'

export const news: NewsItem[] = [
  {
    id: 'react-20',
    name: 'React',
    version: '20.0',
    date: 'Jun 28, 2026',
    category: 'Frontend',
    summary:
      'React 20 ships the stable React Compiler by default, first-class Server Actions, and a leaner runtime with automatic memoization.',
    whatsNew: [
      'React Compiler enabled by default — no more manual useMemo/useCallback',
      'Server Actions promoted to stable across all renderers',
      '~18% smaller hydration payload with streaming islands',
      'New <Activity> and <ViewTransition> primitives',
    ],
    breaking: ['Legacy Context API removed', 'defaultProps on function components dropped'],
    url: 'https://react.dev',
    accent: '#61dafb',
  },
  {
    id: 'node-24',
    name: 'Node.js',
    version: '24 LTS',
    date: 'Jun 20, 2026',
    category: 'Backend',
    summary:
      'Node 24 enters LTS with a stable built-in TypeScript loader, native fetch/WebSocket, and the new permission model on by default.',
    whatsNew: [
      'Type stripping for .ts files without a build step',
      'Stable node:sqlite and built-in test runner UI',
      'V8 13.x with faster startup and lower memory',
      'Permission model (--permission) hardened for production',
    ],
    breaking: ['Removed deprecated url.parse()', 'OpenSSL 3.5 baseline'],
    url: 'https://nodejs.org',
    accent: '#3c873a',
  },
  {
    id: 'python-314',
    name: 'Python',
    version: '3.14',
    date: 'May 30, 2026',
    category: 'Language',
    summary:
      'Python 3.14 makes the free-threaded (no-GIL) build officially supported and lands a template-string (t-string) syntax.',
    whatsNew: [
      'Free-threaded CPython supported, not experimental',
      't-strings for safe, lazy string templating',
      'Deferred evaluation of annotations by default',
      'An experimental JIT graduates to opt-in stable',
    ],
    url: 'https://python.org',
    accent: '#ffd43b',
  },
  {
    id: 'next-16',
    name: 'Next.js',
    version: '16',
    date: 'Jun 12, 2026',
    category: 'Framework',
    summary:
      'Next.js 16 makes Turbopack the default bundler for dev and build, and stabilizes Partial Prerendering.',
    whatsNew: [
      'Turbopack default for `next dev` and `next build`',
      'Partial Prerendering (PPR) marked stable',
      'Cache Components with granular `use cache` directives',
      'Node.js middleware runtime out of beta',
    ],
    breaking: ['Minimum React 19.2', 'AMP support fully removed'],
    url: 'https://nextjs.org',
    accent: '#ffffff',
  },
  {
    id: 'postgres-18',
    name: 'PostgreSQL',
    version: '18',
    date: 'May 8, 2026',
    category: 'Database',
    summary:
      'PostgreSQL 18 adds asynchronous I/O, virtual generated columns, and native UUIDv7 for time-sortable keys.',
    whatsNew: [
      'Asynchronous I/O subsystem for big throughput gains',
      'Native uuidv7() for time-ordered primary keys',
      'Virtual generated columns computed on read',
      'Skip-scan optimization for multicolumn B-tree indexes',
    ],
    url: 'https://postgresql.org',
    accent: '#336791',
  },
  {
    id: 'k8s-133',
    name: 'Kubernetes',
    version: '1.33',
    date: 'Apr 23, 2026',
    category: 'DevOps',
    summary:
      'Kubernetes 1.33 "Octarine" graduates in-place pod resize and sidecar containers to stable.',
    whatsNew: [
      'In-place vertical pod scaling (no restart) is stable',
      'Native sidecar containers GA',
      'User namespaces enabled by default',
      'Structured authorization config improvements',
    ],
    url: 'https://kubernetes.io',
    accent: '#326ce5',
  },
  {
    id: 'rust-190',
    name: 'Rust',
    version: '1.90',
    date: 'Jun 5, 2026',
    category: 'Language',
    summary:
      'Rust 1.90 brings async closures to stable, refined trait upcasting, and faster incremental builds.',
    whatsNew: [
      'Async closures stabilized',
      'Trait upcasting coercion in stable',
      'Parallel front-end on by default for faster builds',
      'Improved diagnostics for lifetime errors',
    ],
    url: 'https://rust-lang.org',
    accent: '#f74c00',
  },
  {
    id: 'ts-58',
    name: 'TypeScript',
    version: '5.8',
    date: 'Jun 18, 2026',
    category: 'Language',
    summary:
      'TypeScript 5.8 previews the native Go-based compiler (tsgo) with up to 10× faster type-checking.',
    whatsNew: [
      'Native compiler preview (Project Corsa) — 10× faster',
      'Granular return-type narrowing in conditionals',
      'require() of ESM modules in Node',
      'Better inference for generic tuples',
    ],
    url: 'https://typescriptlang.org',
    accent: '#3178c6',
  },
]
