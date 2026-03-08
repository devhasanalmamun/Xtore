import { PaperclipIcon, MessageSquareIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ISupportTicketMessage } from '@/types/support-ticket-messages'
import { cn, isThisMessageFromCurrentUser } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import Textarea from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User } from '@/types'

interface IProps {
  messages: ISupportTicketMessage[]
  auth_user: User
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
        <div className="h-100 space-y-5 overflow-y-auto">
          {props.messages.map((message) => (
            <div key={message.id}>
              <div className="flex gap-3">
                <Avatar className="mt-0.5 shrink-0">
                  <AvatarImage src={message.sender.image} />
                  <AvatarFallback className="text-xs">{message.sender.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">
                      {isThisMessageFromCurrentUser(message, props.auth_user) ? 'You' : message.sender.name}
                    </p>
                    {!isThisMessageFromCurrentUser(message, props.auth_user) && (
                      <Badge variant="outline" className="py-0 text-xs capitalize">
                        {message.sender.role}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">{message.created_at}</span>
                  </div>
                  <div
                    className={cn(
                      'mt-2 rounded-lg border px-4 py-3 text-sm leading-relaxed',
                      isThisMessageFromCurrentUser(message, props.auth_user) ? 'bg-primary/15' : 'text-gray-700',
                    )}
                  >
                    {message.message}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
