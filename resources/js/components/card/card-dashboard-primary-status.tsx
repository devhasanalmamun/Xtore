import { ArrowDownRight, ArrowUpRight, LucideIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formateCommaSeparatedNumber } from '@/lib/utils'

interface IProps {
  title: string
  value: number
  change: number
  color: string
  bg: string
  icon: LucideIcon
}

export default function CardDashboardPrimaryStatus(props: IProps) {
  const Icon = props.icon
  const isUp = props.change > 0

  return (
    <Card className="gap-3 py-5">
      <CardHeader className="flex-row items-center justify-between gap-0 pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{props.title}</CardTitle>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${props.bg}`}>
          <Icon className={`h-4 w-4 ${props.color}`} />
        </span>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-2xl font-bold tracking-tight text-foreground">{formateCommaSeparatedNumber(props.value)}</p>
        <div className="mt-1 flex items-center gap-1.5">
          {isUp ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
          )}
          <span className={`text-xs font-semibold ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
            {props.change} %
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
