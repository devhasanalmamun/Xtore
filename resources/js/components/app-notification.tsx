import { Bell } from 'lucide-react'
import { useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Notification } from '@/types'
import { cn } from '@/lib/utils'

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    avatar: 'https://github.com/shadcn.png',
    fallback: 'A',
    message: 'New support ticket created',
    time: '12:00',
    read: false,
  },
  {
    id: 2,
    avatar: 'https://github.com/shadcn.png',
    fallback: 'B',
    message: 'New support ticket created',
    time: '12:00',
    read: false,
  },
  {
    id: 3,
    avatar: 'https://github.com/shadcn.png',
    fallback: 'C',
    message: 'New support ticket created',
    time: '12:00',
    read: false,
  },
  {
    id: 4,
    avatar: 'https://github.com/shadcn.png',
    fallback: 'D',
    message: 'New support ticket created',
    time: '12:00',
    read: false,
  },
  {
    id: 5,
    avatar: 'https://github.com/shadcn.png',
    fallback: 'E',
    message: 'New support ticket created',
    time: '12:00',
    read: false,
  },
  {
    id: 6,
    avatar: 'https://github.com/shadcn.png',
    fallback: 'E',
    message: 'New support ticket created',
    time: '12:00',
    read: true,
  },
  {
    id: 7,
    avatar: 'https://github.com/shadcn.png',
    fallback: 'E',
    message: 'New support ticket created',
    time: '12:00',
    read: true,
  },
]

export default function AppNotification() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full" aria-label="notifications">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <Badge className="absolute top-px -right-0.5 flex items-center justify-center rounded-full bg-primary px-1 py-0 text-[9px] font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-[360px] p-0 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h3 className="text-lg font-bold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto rounded-none px-2 py-1 text-xs font-medium text-primary hover:text-primary"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <Separator />

        {/* Notification List */}
        <div className="max-h-[420px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-gray-600">
              <Bell className="h-8 w-8" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={cn(
                  'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60',
                  !notification.read && 'bg-primary/10 hover:bg-primary/20',
                )}
              >
                <div className="relative mt-0.5 shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={notification.avatar} />
                    <AvatarFallback className="bg-muted text-xs font-semibold">{notification.fallback}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className={cn('text-sm leading-snug text-foreground', !notification.read && 'font-medium')}>
                    {notification.message}
                  </p>
                  <span
                    className={cn(
                      'text-xs',
                      notification.read ? 'text-muted-foreground' : 'font-semibold text-primary/80',
                    )}
                  >
                    {notification.time}
                  </span>
                </div>

                {!notification.read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary/80" />}
              </div>
            ))
          )}
        </div>

        <Separator />

        {/* Footer */}
        <div className="p-2">
          <Button variant="ghost" className="w-full text-sm font-medium text-primary hover:text-primary">
            See previous notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
