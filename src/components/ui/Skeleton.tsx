export function SkeletonLine({ w = 'w-full' }: { w?: string }) {
  return <div className={`skeleton h-4 rounded-md ${w}`} />
}

export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="skeleton mb-4 h-8 w-64 rounded-lg" />
      <div className="skeleton mb-8 h-4 w-96 rounded-md" />
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <div className="hidden space-y-2 lg:block">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="skeleton h-9 rounded-lg" />
          ))}
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-2xl" />
            ))}
          </div>
          <div className="skeleton h-72 rounded-2xl" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="skeleton h-40 rounded-2xl" />
            <div className="skeleton h-40 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
