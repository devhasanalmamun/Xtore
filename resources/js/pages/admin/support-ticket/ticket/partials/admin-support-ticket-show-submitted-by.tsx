import { AvatarFallback } from '@/components/ui/avatar'
import { Card, CardHeader } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import { CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'

interface IProps {
  created_by: {
    name: string
    role: string
  }
}

export default function AdminSupportTicketShowSubmittedBy(props: IProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Submitted By</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{props.created_by.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{props.created_by.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{props.created_by.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
