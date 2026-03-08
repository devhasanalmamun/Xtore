import { PaperclipIcon, MessageSquareIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ISupportTicketMessage } from '@/types/support-ticket-messages'
import { Separator } from '@/components/ui/separator'
import Textarea from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface IProps {
  messages: ISupportTicketMessage[]
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
        {props.messages.map((message) => (
          <div key={message.id}>
            <div className="flex gap-3">
              <Avatar className="mt-0.5 shrink-0">
                <AvatarImage src={message.sender.image} />
                <AvatarFallback className="text-xs">{message.sender.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{message.sender.name}</p>
                  <Badge variant="outline" className="py-0 text-xs capitalize">
                    {message.sender.role}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{message.created_at}</span>
                </div>
                <div className="mt-2 rounded-lg border bg-muted/40 px-4 py-3 text-sm leading-relaxed">
                  {message.message}
                </div>
              </div>
            </div>
          </div>
        ))}

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
