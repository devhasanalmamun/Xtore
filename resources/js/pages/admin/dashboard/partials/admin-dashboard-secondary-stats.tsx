import { Clock, Package, Ticket, Wallet } from 'lucide-react'

import CardDashboardSecondaryStatus from '@/components/card/card-dashboard-secondary-status'

const secondaryStats = [
  { label: 'Pending Vendor Approvals', value: 14, icon: Clock, color: 'text-amber-500' },
  { label: 'Active Products', value: 9471, icon: Package, color: 'text-sky-500' },
  { label: 'Open Support Tickets', value: 37, icon: Ticket, color: 'text-rose-500' },
  { label: 'Pending Withdrawals', value: 8240, icon: Wallet, color: 'text-emerald-500' },
]

export default function AdminDashboardSecondaryStats() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {secondaryStats.map((stat) => {
        const Icon = stat.icon
        return (
          <CardDashboardSecondaryStatus
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={Icon}
            color={stat.color}
          />
        )
      })}
    </div>
  )
}
