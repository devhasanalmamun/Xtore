import { PaperclipIcon, MessageSquareIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ISupportTicketMessage } from '@/types/support-ticket-messages'
import { cn, isThisMessageFromCurrentUser } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import Textarea from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { User } from '@/types'

interface IProps {
  messages: ISupportTicketMessage[]
  auth_user: User
  handleSendReply: (message: string) => void
}

export default function ConversationThread(props: IProps) {
  const [message, setMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  function handleChange() {
    props.handleSendReply(message)
    setMessage('')
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [props.messages])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquareIcon className="h-4 w-4" />
          Conversation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div ref={scrollRef} className="h-100 space-y-5 overflow-y-auto">
          {props.messages.map((message) => {
            const isMine = isThisMessageFromCurrentUser(message, props.auth_user)
            return (
              <div key={message.id} className={cn('flex gap-3', isMine ? 'flex-row-reverse' : 'flex-row')}>
                <Avatar className="mt-0.5 shrink-0">
                  <AvatarImage src={message.sender.image} />
                  <AvatarFallback className="text-xs">{message.sender.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className={cn('flex max-w-[60%] flex-col', isMine ? 'items-end' : 'items-start')}>
                  <div className={cn('flex flex-wrap items-center gap-2', isMine && 'flex-row-reverse')}>
                    <p className="text-sm font-medium">{isMine ? 'You' : message.sender.name}</p>
                    {!isMine && (
                      <Badge variant="outline" className="py-0 text-xs capitalize">
                        {message.sender.role}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">{message.created_at}</span>
                  </div>
                  <div
                    className={cn(
                      'mt-2 rounded-lg border px-4 py-3 text-sm leading-relaxed',
                      isMine ? 'bg-primary/15' : 'text-gray-700',
                    )}
                  >
                    {message.message}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Separator />

        {/* Reply box */}
        <div className="space-y-3">
          <Label htmlFor="reply-message" className="text-sm font-medium">
            Add Reply
          </Label>
          <Textarea
            id="reply-message"
            placeholder="Type your reply here..."
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Label
              htmlFor="reply-attachment"
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <PaperclipIcon className="h-4 w-4" />
              Attach file
              <input id="reply-attachment" type="file" className="sr-only" />
            </Label>
            <Button onClick={handleChange} disabled={!message.trim()}>
              Send Reply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
