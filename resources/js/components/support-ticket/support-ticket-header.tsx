import { ArrowLeftIcon } from 'lucide-react'
import { router } from '@inertiajs/react'

import { statusBadgeVariant } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface IProps {
  ticket_id: number
  ticket_status: string
}

export default function SupportTicketHeader(props: IProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-medium">Ticket #{props.ticket_id}</h1>
        <Badge variant={statusBadgeVariant(props.ticket_status)} className="capitalize">
          {props.ticket_status}
        </Badge>
      </div>
      <Button variant="outline" size="sm" onClick={() => router.get(route('vendor.support-tickets.index'))}>
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Tickets</span>
      </Button>
    </div>
  )
}
