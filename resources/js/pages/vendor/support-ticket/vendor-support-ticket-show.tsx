import { Head } from '@inertiajs/react'

import SupportTicketShowInformation from '@/components/support-ticket/support-ticket-show-information'
import SupportTicketShowDetails from '@/components/support-ticket/support-ticket-show-details'
import SupportTicketHeader from '@/components/support-ticket/support-ticket-header'
import ConversationThread from '@/components/support-ticket/conversation-thread'
import { IVendorSupportTicketIndex } from '@/types/vendor-support-ticket'
import { ISupportTicketMessage } from '@/types/support-ticket-messages'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Support Tickets',
    routeName: 'vendor.support-tickets.index',
  },
  {
    title: 'Ticket Details',
    routeName: 'vendor.support-tickets.show',
  },
]

interface IProps {
  support_ticket: IVendorSupportTicketIndex
  support_ticket_messages: ISupportTicketMessage[]
}

export default function VendorSupportTicketShow(props: IProps) {
  console.log(props.support_ticket_messages)
  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <Head title="Support Ticket Details" />

      <section className="px-4 py-8 md:px-4 md:py-8">
        <SupportTicketHeader ticket_id={props.support_ticket.id} ticket_status={props.support_ticket.status} />

        <div className="my-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column - Ticket information */}
          <div className="lg:col-span-2">
            <SupportTicketShowInformation
              subject={props.support_ticket.subject}
              description={props.support_ticket.description}
              attachment="https://via.placeholder.com/150"
            />
          </div>

          <SupportTicketShowDetails
            ticket_status={props.support_ticket.status}
            ticket_category={props.support_ticket.category.name}
            ticket_created_at={props.support_ticket.created_at}
            ticket_updated_at={props.support_ticket.updated_at}
          />
        </div>

        <ConversationThread messages={props.support_ticket_messages} />
      </section>
    </VendorLayout>
  )
}
