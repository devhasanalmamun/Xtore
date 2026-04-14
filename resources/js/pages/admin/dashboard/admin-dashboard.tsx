import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CheckCheck,
  ChevronRight,
  Clock,
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  Store,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import { Head } from '@inertiajs/react'

import DashboardNotificationsSkeleton from '@/components/skeletons/dashboard-notifications-skeleton'
import NotificationItem from '@/components/notification/notification-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

const statCards = [
  {
    title: 'Total Revenue',
    value: '$124,563.00',
    change: '+12.5%',
    trend: 'up',
    period: 'vs last month',
    icon: DollarSign,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    title: 'Total Orders',
    value: '3,842',
    change: '+8.2%',
    trend: 'up',
    period: 'vs last month',
    icon: ShoppingCart,
    color: 'text-sky-600',
    bg: 'bg-sky-50 dark:bg-sky-950/30',
  },
  {
    title: 'Active Vendors',
    value: '218',
    change: '+4.1%',
    trend: 'up',
    period: 'vs last month',
    icon: Store,
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    title: 'Total Customers',
    value: '15,290',
    change: '-1.3%',
    trend: 'down',
    period: 'vs last month',
    icon: Users,
    color: 'text-rose-600',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
  },
]

const secondaryStats = [
  { label: 'Pending Vendor Approvals', value: '14', icon: Clock, color: 'text-amber-500' },
  { label: 'Active Products', value: '9,471', icon: Package, color: 'text-sky-500' },
  { label: 'Open Support Tickets', value: '37', icon: Ticket, color: 'text-rose-500' },
  { label: 'Pending Withdrawals', value: '$8,240', icon: Wallet, color: 'text-emerald-500' },
]

const recentOrders = [
  {
    id: '#ORD-8821',
    customer: 'Alice Johnson',
    vendor: 'TechHub Store',
    amount: '$149.99',
    status: 'Delivered',
    date: 'Apr 13',
  },
  {
    id: '#ORD-8820',
    customer: 'Carlos Reyes',
    vendor: 'FashionX',
    amount: '$89.50',
    status: 'Processing',
    date: 'Apr 13',
  },
  {
    id: '#ORD-8819',
    customer: 'Priya Nair',
    vendor: 'HomeGoods Co.',
    amount: '$212.00',
    status: 'Pending',
    date: 'Apr 12',
  },
  {
    id: '#ORD-8818',
    customer: 'Mark Daniels',
    vendor: 'SportZone',
    amount: '$54.75',
    status: 'Cancelled',
    date: 'Apr 12',
  },
  {
    id: '#ORD-8817',
    customer: 'Sofia Lee',
    vendor: 'BeautyBox',
    amount: '$38.20',
    status: 'Delivered',
    date: 'Apr 11',
  },
]

const vendorApplications = [
  { name: 'UrbanWear Ltd.', category: 'Fashion', submitted: 'Apr 13, 2026', rating: null, status: 'Pending' },
  { name: 'GadgetPro', category: 'Electronics', submitted: 'Apr 12, 2026', rating: null, status: 'Under Review' },
  {
    name: 'GreenLeaf Organics',
    category: 'Food & Grocery',
    submitted: 'Apr 11, 2026',
    rating: null,
    status: 'Pending',
  },
  { name: 'KidsWorld', category: 'Toys', submitted: 'Apr 10, 2026', rating: null, status: 'Under Review' },
]

const topVendors = [
  { name: 'TechHub Store', sales: '$24,100', orders: 412, rating: 4.9 },
  { name: 'FashionX', sales: '$18,740', orders: 338, rating: 4.7 },
  { name: 'HomeGoods Co.', sales: '$14,320', orders: 290, rating: 4.8 },
  { name: 'SportZone', sales: '$11,680', orders: 215, rating: 4.6 },
]

const statusStyles: Record<string, string> = {
  Delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Processing: 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  Cancelled: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
  'Under Review': 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400',
}

export default function AdminDashboard() {
  const notifications = useNotifications((state) => state.notifications)
  const isLoading = useNotifications((state) => state.isLoading)
  const unreadCount = useNotifications((state) => state.unreadCount)
  const markAllAsRead = useNotifications((state) => state.markAllAsRead)

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-hidden p-4 md:p-6">
        {/* ── Stat Cards ── */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon
            const isUp = card.trend === 'up'
            return (
              <Card key={card.title} className="gap-3 py-5">
                <CardHeader className="flex-row items-center justify-between gap-0 pb-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.bg}`}>
                    <Icon className={`h-4 w-4 ${card.color}`} />
                  </span>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-2xl font-bold tracking-tight text-foreground">{card.value}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    {isUp ? (
                      <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                    )}
                    <span className={`text-xs font-semibold ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                      {card.change}
                    </span>
                    <span className="text-xs text-muted-foreground">{card.period}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* ── Secondary Stats ── */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {secondaryStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 bg-card px-4 py-3.5 dark:border-sidebar-border"
              >
                <Icon className={`h-5 w-5 shrink-0 ${stat.color}`} />
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Revenue Chart + Order Stats ── */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Revenue Chart Placeholder */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 lg:col-span-2 dark:border-sidebar-border">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
              </div>
              <div className="flex gap-1.5">
                {['7D', '30D', '90D', '1Y'].map((range, i) => (
                  <button
                    key={range}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      i === 1 ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <Separator />
            <div className="relative min-h-56 flex-1 overflow-hidden">
              <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <TrendingUp className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground/60">Revenue chart will render here</p>
              </div>
            </div>
          </div>

          {/* Order Stats Placeholder */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <div className="flex items-center gap-2 px-5 py-4">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Order Breakdown</h3>
            </div>
            <Separator />
            <div className="flex flex-1 flex-col gap-3 p-5">
              {[
                { label: 'Delivered', count: 2104, pct: 55, color: 'bg-emerald-500' },
                { label: 'Processing', count: 842, pct: 22, color: 'bg-sky-500' },
                { label: 'Pending', count: 612, pct: 16, color: 'bg-amber-500' },
                { label: 'Cancelled', count: 284, pct: 7, color: 'bg-red-500' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="text-muted-foreground">
                      {item.count.toLocaleString()} ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Recent Orders + Vendor Applications ── */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Recent Orders */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Recent Orders</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                View all <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
            <Separator />
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between px-5 py-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{order.id}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {order.customer} &bull; <span className="italic">{order.vendor}</span>
                    </p>
                  </div>
                  <div className="ml-4 shrink-0 text-right">
                    <p className="text-sm font-semibold text-foreground">{order.amount}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor Applications */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2">
                <Store className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Vendor Applications</h3>
                <Badge className="rounded-full px-1.5 py-0 text-[10px] font-bold">{vendorApplications.length}</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                View all <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
            <Separator />
            <div className="divide-y divide-border">
              {vendorApplications.map((app) => (
                <div key={app.name} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground uppercase">
                      {app.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{app.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {app.category} &bull; {app.submitted}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[app.status]}`}>
                      {app.status}
                    </span>
                    <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Notifications + Top Vendors ── */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Notifications Panel */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <div className="flex items-center justify-between px-5 py-4">
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
            <div className="max-h-72 flex-1 overflow-y-auto">
              {isLoading ? (
                <DashboardNotificationsSkeleton />
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              ) : (
                <EmptyState title="No notifications found" description="You're all caught up!" />
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

          {/* Top Vendors */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Top Vendors</h3>
                <span className="text-xs text-muted-foreground">This month</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                View all <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
            <Separator />
            <div className="divide-y divide-border">
              {topVendors.map((vendor, idx) => (
                <div key={vendor.name} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                      {idx + 1}
                    </span>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground uppercase">
                      {vendor.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{vendor.name}</p>
                      <p className="text-xs text-muted-foreground">{vendor.orders} orders</p>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0 text-right">
                    <p className="text-sm font-semibold text-foreground">{vendor.sales}</p>
                    <div className="flex items-center justify-end gap-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-muted-foreground">{vendor.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
