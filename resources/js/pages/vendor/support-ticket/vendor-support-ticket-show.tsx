import { Head } from '@inertiajs/react'

import VendorLayout from '@/layouts/vendor/vendor-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Support Tickets',
    routeName: 'vendor.support-tickets.index',
  },
  {
    title: 'Support Ticket Details',
    routeName: 'vendor.support-tickets.show',
  },
]

export default function VendorSupportTicketShow() {
  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <Head title="Support Ticket Details" />
      <section className="px-4 py-8 md:px-4 md:py-8">
        <h1 className="text-xl font-medium">Support Ticket Details</h1>
      </section>
    </VendorLayout>
  )
}
