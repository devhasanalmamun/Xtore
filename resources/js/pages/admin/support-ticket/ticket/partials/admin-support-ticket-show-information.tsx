import { ClipboardListIcon, PaperclipIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface IProps {
  subject: string
  description: string
  attachment: string
}

export default function AdminSupportTicketShowInformation(props: IProps) {
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

        {props.attachment && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Attachment</p>
              <a
                href={props.attachment}
                className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <PaperclipIcon className="h-3.5 w-3.5" />
                View Attachment
              </a>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
