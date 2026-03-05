import { CheckCircleIcon, XCircleIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminSupportTicketShowActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start gap-2">
          <CheckCircleIcon className="h-4 w-4 text-primary" />
          Mark as Resolved
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
          <XCircleIcon className="h-4 w-4" />
          Close Ticket
        </Button>
      </CardContent>
    </Card>
  )
}
