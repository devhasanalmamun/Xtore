import { Head } from '@inertiajs/react'

import AdminLayout from '@/layouts/admin/admin-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Ticket Categories',
    routeName: 'admin.support-ticket-categories.index',
  },
]

export default function SupportTicketCategoryIndex() {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Support Ticket Categories" />

      <section className="px-4 py-8 md:px-4 md:py-8">
        <div>Support Ticket Categories</div>
      </section>
    </AdminLayout>
  )
}
