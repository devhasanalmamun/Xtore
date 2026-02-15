import { Head } from '@inertiajs/react'

import AdminLayout from '@/layouts/admin/admin-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Support Ticket Categories',
    routeName: 'admin.support-ticket-categories.index',
  },
  {
    title: 'Create',
    routeName: 'admin.support-ticket-categories.create',
  },
]

export default function SupportTicketCategoryCreate() {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Support Ticket's Category" />
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Create Support Ticket Category</h1>
        </div>
      </section>
    </AdminLayout>
  )
}
