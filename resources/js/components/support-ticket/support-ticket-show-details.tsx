import { CalendarIcon, TagIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { statusBadgeVariant } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface IProps {
  ticket_status: string
  ticket_category: string
  ticket_created_at: string
  ticket_updated_at: string
}

export default function SupportTicketShowDetails(props: IProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Status</span>
          <Badge variant={statusBadgeVariant(props.ticket_status)} className="capitalize">
            {props.ticket_status}
          </Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <TagIcon className="h-3.5 w-3.5 shrink-0" />
            Category
          </span>
          <span className="text-right font-medium">{props.ticket_category}</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
            Opened
          </span>
          <span className="text-right">{props.ticket_created_at}</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
            Last Update
          </span>
          <span className="text-right">{props.ticket_updated_at}</span>
        </div>
      </CardContent>
    </Card>
  )
}
