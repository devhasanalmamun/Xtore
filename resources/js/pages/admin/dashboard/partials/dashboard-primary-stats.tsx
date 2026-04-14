import CardDashboardPrimaryStatus from '@/components/card/card-dashboard-primary-status'
import { DollarSign, ShoppingCart, Store, Users } from 'lucide-react'
import React from 'react'

const statCards = [
  {
    title: 'Total Revenue',
    icon: DollarSign,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    getValue: (props: IProps) => props.primary_stats.revenue.total_revenue,
    getChange: (props: IProps) => props.primary_stats.revenue.revenue_growth_last_month,
  },
  {
    title: 'Total Orders',
    icon: ShoppingCart,
    color: 'text-sky-600',
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    getValue: (props: IProps) => props.primary_stats.orders.total_orders,
    getChange: (props: IProps) => props.primary_stats.orders.orders_growth_last_month,
  },
  {
    title: 'Active Vendors',
    icon: Store,
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    getValue: (props: IProps) => props.primary_stats.vendors.active_vendors,
    getChange: (props: IProps) => props.primary_stats.vendors.vendors_growth_last_month,
  },
  {
    title: 'Total Customers',
    icon: Users,
    color: 'text-rose-600',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    getValue: (props: IProps) => props.primary_stats.customers.total_customers,
    getChange: (props: IProps) => props.primary_stats.customers.customers_growth_last_month,
  },
]

interface IProps {
  primary_stats: {
    revenue: {
      total_revenue: number
      revenue_growth_last_month: number
    }
    orders: {
      total_orders: number
      orders_growth_last_month: number
    }
    vendors: {
      active_vendors: number
      vendors_growth_last_month: number
    }
    customers: {
      total_customers: number
      customers_growth_last_month: number
    }
  }
}

export default function DashboardPrimaryStats(props: IProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => (
        <CardDashboardPrimaryStatus
          key={card.title}
          title={card.title}
          value={card.getValue(props)}
          change={card.getChange(props)}
          color={card.color}
          bg={card.bg}
          icon={card.icon}
        />
      ))}
    </div>
  )
}
