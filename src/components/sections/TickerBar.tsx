import { TrendingUp } from 'lucide-react'
import { tickerItems } from '../../data/marketTrends'

export default function TickerBar() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="relative border-y border-black/5 bg-white/40 py-2.5 backdrop-blur dark:border-white/5 dark:bg-white/[0.02]">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {items.map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              {item}
              <span className="text-emerald-500">▲</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
