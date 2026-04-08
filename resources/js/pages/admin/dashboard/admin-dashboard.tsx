import { Bell, CheckCheck } from 'lucide-react'
import { Head } from '@inertiajs/react'

import DashboardNotificationsSkeleton from '@/components/skeletons/dashboard-notifications-skeleton'
import NotificationItem from '@/components/notification/notification-item'
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'
import useNotifications from '@/stores/useNotifications'
import AdminLayout from '@/layouts/admin/admin-layout'
import { Separator } from '@/components/ui/separator'
import EmptyState from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    routeName: 'admin.dashboard',
  },
]

export default function AdminDashboard() {
  const notifications = useNotifications((state) => state.notifications)
  const isLoading = useNotifications((state) => state.isLoading)
  const unreadCount = useNotifications((state) => state.unreadCount)
  const markAllAsRead = useNotifications((state) => state.markAllAsRead)

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-hidden rounded-xl p-4">
        <p>This is admin dashboard</p>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          </div>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          {/* Notifications Panel */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge className="rounded-full px-1.5 py-0 text-[10px] font-bold">{unreadCount}</Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={markAllAsRead}
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </Button>
            </div>

            <Separator />

            {/* Notification Items */}
            <div className="max-h-80 flex-1 overflow-y-auto">
              {isLoading ? (
                <DashboardNotificationsSkeleton />
              ) : notifications.length > 0 ? (
                notifications.map((notification) => {
                  return (
                    <div key={notification.id}>
                      <NotificationItem notification={notification} />
                    </div>
                  )
                })
              ) : (
                <EmptyState title="No notifications found" description="No notifications found for this section" />
              )}
            </div>
            {notifications.length > 10 && (
              <div className="p-1.5">
                <Button variant="ghost" className="w-full text-sm font-semibold text-primary hover:text-primary">
                  Load more
                </Button>
              </div>
            )}
          </div>

          <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
