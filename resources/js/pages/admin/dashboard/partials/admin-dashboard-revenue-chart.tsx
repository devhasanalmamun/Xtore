import { TrendingUp } from 'lucide-react'

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'
import { Separator } from '@/components/ui/separator'

export default function AdminDashboardRevenueChart() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 lg:col-span-2 dark:border-sidebar-border">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
        </div>
        <div className="flex gap-1.5">
          {['7D', '30D', '90D', '1Y'].map((range, i) => (
            <button
              key={range}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                i === 1 ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <Separator />
      <div className="relative min-h-56 flex-1 overflow-hidden">
        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <TrendingUp className="h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground/60">Revenue chart will render here</p>
        </div>
      </div>
    </div>
  )
}
