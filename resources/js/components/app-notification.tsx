import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import axios from 'axios'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import AppNotificationItem from '@/components/app-notification-item'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Notification } from '@/types'

export default function AppNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.is_read).length

  function markAsRead(notification: Notification) {
    axios.patch(route('notifications.update', notification.id)).then(() => {
      setNotifications((prev) =>
        prev.map((item) => {
          if (item.id === notification.id) {
            item.is_read = true
          }
          return item
        }),
      )
    })
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
  }

  useEffect(() => {
    axios.get(route('notifications.index')).then((response) => {
      setNotifications(response.data)
      console.log(response.data)
    })
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full" aria-label="notifications">
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
              <AppNotificationItem key={notification.id} notification={notification} markAsRead={markAsRead} />
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
