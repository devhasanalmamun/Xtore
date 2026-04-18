import { ClipboardListIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface IProps {
  subject: string
  description: string
  attachments: string[]
}

export default function SupportTicketShowInformation(props: IProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ClipboardListIcon className="h-4 w-4" />
          Ticket Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Subject</p>
          <p className="mt-1 font-medium">{props.subject}</p>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Description</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">{props.description}</p>
        </div>

        {props.attachments.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Attachments</p>
              <div className="mt-1.5 flex gap-2 overflow-x-auto">
                {props.attachments.map((attachment, i) => (
                  <div key={i}>
                    <img
                      src={attachment}
                      className="inline-flex h-24 w-48 items-center gap-1.5 rounded-md object-cover text-sm text-primary hover:underline"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
