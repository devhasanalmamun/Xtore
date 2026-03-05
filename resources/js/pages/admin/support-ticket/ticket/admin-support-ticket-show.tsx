import { Head } from '@inertiajs/react'

import { IAdminSupportTicket } from '@/types/admin-support-ticket'
import AdminLayout from '@/layouts/admin/admin-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Support Tickets',
    routeName: 'admin.support-tickets.index',
  },
  {
    title: 'Ticket Details',
    routeName: 'admin.support-tickets.show',
  },
]

interface IProps {
  support_ticket: IAdminSupportTicket
}

export default function AdminSupportTicketShow(props: IProps) {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Support Ticket Details" />
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Ticket Details: #{props.support_ticket.id}</h1>
        </div>
      </section>
    </AdminLayout>
  )
}
