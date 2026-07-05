import { Architecture } from './types'

export const architectures: Architecture[] = [
  {
    id: 'microservices',
    name: 'Microservices',
    icon: '🧩',
    color: '#3363ff',
    short: 'Independent, small, deployable services',
    description:
      'Decompose an application into small, independently deployable services that communicate over the network, each owning its data.',
    pros: ['Independent scaling', 'Team autonomy', 'Tech diversity', 'Fault isolation'],
    cons: ['Operational complexity', 'Network latency', 'Distributed data', 'Harder debugging'],
    bestFor: ['Large teams', 'High-scale systems', 'Independent domains'],
  },
  {
    id: 'monolith',
    name: 'Monolith',
    icon: '🏛️',
    color: '#a855f7',
    short: 'Single deployable, unified codebase',
    description:
      'A single, cohesive codebase deployed as one unit. Simple to build, test, and deploy — ideal to start fast and modularize later.',
    pros: ['Simple to develop', 'Easy debugging', 'One deployment', 'Low latency'],
    cons: ['Scales as a unit', 'Tight coupling risk', 'Slower CI at size', 'Single tech stack'],
    bestFor: ['Startups', 'MVPs', 'Small teams'],
  },
  {
    id: 'event-driven',
    name: 'Event Driven',
    icon: '⚡',
    color: '#f59e0b',
    short: 'Services react to asynchronous events',
    description:
      'Components produce and consume events through a broker, enabling loose coupling, real-time reactions, and high scalability.',
    pros: ['Loose coupling', 'Real-time', 'Scalable', 'Resilient'],
    cons: ['Eventual consistency', 'Hard to trace', 'Complex ordering', 'Debugging'],
    bestFor: ['Real-time systems', 'IoT', 'Streaming pipelines'],
  },
  {
    id: 'serverless',
    name: 'Serverless',
    icon: '☁️',
    color: '#22d3ee',
    short: 'Functions on managed infrastructure',
    description:
      'Run code as functions on fully managed infra that auto-scales to zero. Pay per execution, no servers to manage.',
    pros: ['No server management', 'Auto-scaling', 'Pay-per-use', 'Fast to ship'],
    cons: ['Cold starts', 'Vendor lock-in', 'Execution limits', 'Local dev friction'],
    bestFor: ['Spiky workloads', 'APIs', 'Event processing'],
  },
  {
    id: 'mvc',
    name: 'MVC',
    icon: '🔀',
    color: '#10b981',
    short: 'Model – View – Controller separation',
    description:
      'Separates data (Model), presentation (View), and logic (Controller) for maintainable, testable server-rendered apps.',
    pros: ['Clear separation', 'Testable', 'Widely understood', 'Framework support'],
    cons: ['Can get bloated', 'Controller sprawl', 'Tight view coupling'],
    bestFor: ['Web apps', 'CRUD systems', 'Server-rendered UIs'],
  },
  {
    id: 'mvvm',
    name: 'MVVM',
    icon: '🪟',
    color: '#ec4899',
    short: 'Model – View – ViewModel binding',
    description:
      'Binds the View to a ViewModel that exposes state and commands, popular in reactive front-end and mobile frameworks.',
    pros: ['Two-way binding', 'Testable VM', 'Clean UI logic', 'Reactive'],
    cons: ['Binding complexity', 'Overkill for simple UIs', 'Debugging bindings'],
    bestFor: ['Rich UIs', 'Mobile apps', 'Desktop apps'],
  },
  {
    id: 'hexagonal',
    name: 'Hexagonal',
    icon: '⬡',
    color: '#f43f5e',
    short: 'Ports & adapters around a core',
    description:
      'Isolates business logic at the center with ports and adapters at the edges, keeping the domain independent of frameworks and I/O.',
    pros: ['Testable core', 'Swappable adapters', 'Framework-agnostic', 'Clear boundaries'],
    cons: ['More boilerplate', 'Learning curve', 'Over-engineering risk'],
    bestFor: ['Complex domains', 'Long-lived systems', 'Testable cores'],
  },
  {
    id: 'clean',
    name: 'Clean Architecture',
    icon: '🎯',
    color: '#8eb5ff',
    short: 'Dependency rule toward the domain',
    description:
      'Concentric layers where dependencies point inward toward entities and use cases, keeping business rules free of external concerns.',
    pros: ['Independent of frameworks', 'Highly testable', 'Maintainable', 'Flexible'],
    cons: ['Verbose', 'Steep for beginners', 'Slower to start'],
    bestFor: ['Enterprise apps', 'Long-term projects', 'Large teams'],
  },
  {
    id: 'ddd',
    name: 'Domain-Driven Design',
    icon: '🗺️',
    color: '#a855f7',
    short: 'Model complex domains as bounded contexts',
    description:
      'Aligns software with business domains using ubiquitous language, aggregates, and bounded contexts to tame complexity.',
    pros: ['Business alignment', 'Clear boundaries', 'Scales with teams', 'Rich models'],
    cons: ['Heavy upfront design', 'Requires domain experts', 'Overkill for simple apps'],
    bestFor: ['Complex domains', 'Enterprise', 'Multiple teams'],
  },
  {
    id: 'cqrs',
    name: 'CQRS',
    icon: '↔️',
    color: '#22d3ee',
    short: 'Separate read and write models',
    description:
      'Splits commands (writes) from queries (reads) into separate models, often paired with event sourcing for scale and auditability.',
    pros: ['Optimized reads/writes', 'Scalable', 'Audit trail', 'Flexibility'],
    cons: ['Added complexity', 'Eventual consistency', 'More infrastructure'],
    bestFor: ['High-read systems', 'Event sourcing', 'Complex domains'],
  },
]
