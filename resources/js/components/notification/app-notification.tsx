import { router } from '@inertiajs/react'
import { Bell } from 'lucide-react'
import { useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import NotificationItem from '@/components/notification/notification-item'
import useNotifications from '@/stores/useNotifications'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AppNotification() {
  const [open, setOpen] = useState(false)

  const notifications = useNotifications((state) => state.notifications)
  const unreadCount = useNotifications((state) => state.unreadCount)
  const markAllAsRead = useNotifications((state) => state.markAllAsRead)

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
            notifications
              .slice(0, 10)
              .map((notification) => <NotificationItem key={notification.id} notification={notification} />)
          )}
        </div>

        <Separator />

        {/* Footer */}
        <div className="p-2">
          <Button
            onClick={() => router.get(route('admin.dashboard.index'))}
            variant="ghost"
            className="w-full text-sm font-medium text-primary hover:text-primary"
          >
            See all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
