import { PaperclipIcon, MessageSquareIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Textarea from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface IProps {
  created_by: {
    name: string
    role: string
  }
  created_at: string
}

export default function ConversationThread(props: IProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquareIcon className="h-4 w-4" />
          Conversation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Customer message */}
        <div className="flex gap-3">
          <Avatar className="mt-0.5 shrink-0">
            <AvatarFallback className="text-xs">{props.created_by.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium">{props.created_by.name}</p>
              <Badge variant="outline" className="py-0 text-xs capitalize">
                {props.created_by.role}
              </Badge>
              <span className="text-xs text-muted-foreground">{props.created_at}</span>
            </div>
            <div className="mt-2 rounded-lg border bg-muted/40 px-4 py-3 text-sm leading-relaxed">
              I placed an order and the payment was deducted but I haven't received any confirmation email. Could you
              please check the status of my order?
            </div>
          </div>
        </div>

        {/* Admin reply (static example) */}
        <div className="flex gap-3">
          <Avatar className="mt-0.5 shrink-0">
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">A</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium">Admin Support</p>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-relaxed">
              Thank you for reaching out. We have located your order and found a temporary processing delay on our
              payment gateway. Your confirmation email will be sent within the next 30 minutes. We apologize for the
              inconvenience.
            </div>
          </div>
        </div>

        <Separator />

        {/* Reply box */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Add Reply</p>
          <Textarea placeholder="Type your reply here..." rows={4} />
          <div className="flex items-center justify-between">
            <label
              htmlFor="reply-attachment"
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <PaperclipIcon className="h-4 w-4" />
              Attach file
              <input id="reply-attachment" type="file" className="sr-only" />
            </label>
            <Button>Send Reply</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
