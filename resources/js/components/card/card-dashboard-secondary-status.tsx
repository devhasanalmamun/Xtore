import { LucideIcon } from 'lucide-react'

interface IProps {
  label: string
  value: number
  icon: LucideIcon
  color: string
}

export default function CardDashboardSecondaryStatus(props: IProps) {
  const Icon = props.icon

  return (
    <div
      key={props.label}
      className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 bg-card px-4 py-3.5 dark:border-sidebar-border"
    >
      <Icon className={`h-5 w-5 shrink-0 ${props.color}`} />
      <div className="min-w-0">
        <p className="truncate text-xs text-muted-foreground">{props.label}</p>
        <p className="text-lg font-bold text-foreground">{props.value}</p>
      </div>
    </div>
  )
}
