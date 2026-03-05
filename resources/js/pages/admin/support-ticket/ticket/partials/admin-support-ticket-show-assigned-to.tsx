import { UserIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AvatarFallback } from '@/components/ui/avatar'
import { Avatar } from '@/components/ui/avatar'

interface IProps {
  assigned_to: string
}

export default function AdminSupportTicketShowAssignedTo(props: IProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Assigned To</CardTitle>
      </CardHeader>
      <CardContent>
        {props.assigned_to ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{props.assigned_to?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{props.assigned_to}</p>
              <p className="text-xs text-muted-foreground">Support Agent</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserIcon className="h-4 w-4" />
            <span>Unassigned</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
