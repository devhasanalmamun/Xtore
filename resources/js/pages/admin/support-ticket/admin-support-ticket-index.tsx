import { Head } from '@inertiajs/react'

import AdminLayout from '@/layouts/admin/admin-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Support Tickets',
    routeName: 'admin.support-tickets.index',
  },
]

export default function SupportTicketIndex() {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Support Tickets" />
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div>Support Tickets</div>
      </section>
    </AdminLayout>
  )
}
