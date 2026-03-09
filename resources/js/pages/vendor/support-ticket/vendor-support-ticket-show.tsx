import { Head, router } from '@inertiajs/react'
import { useEcho } from '@laravel/echo-react'
import { useEffect, useState } from 'react'

import SupportTicketShowInformation from '@/components/support-ticket/support-ticket-show-information'
import SupportTicketShowDetails from '@/components/support-ticket/support-ticket-show-details'
import SupportTicketHeader from '@/components/support-ticket/support-ticket-header'
import ConversationThread from '@/components/support-ticket/conversation-thread'
import { IVendorSupportTicketIndex } from '@/types/vendor-support-ticket'
import { ISupportTicketMessage } from '@/types/support-ticket-messages'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { Auth, BreadcrumbItem } from '@/types'

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
  auth: Auth
}

export default function VendorSupportTicketShow(props: IProps) {
  const [messages, setMessages] = useState<ISupportTicketMessage[]>(props.support_ticket_messages)

  function handleSendReply(message: string) {
    if (!message.trim()) return

    router.post(
      route('support-tickets.messages.store', { ticket: props.support_ticket.id }),
      { message },
      {
        onSuccess: () => {
          console.log('Message sent successfully')
        },
        onError: () => {
          console.log('Failed to send message')
        },
        preserveScroll: true,
      },
    )
  }

  useEcho(
    `support.ticket.${props.support_ticket.id}`,
    'support.ticket.message.created',
    (event: ISupportTicketMessage) => {
      setMessages((prevMessages) => {
        const exists = prevMessages.some((message) => message.id === event.id)

        if (exists) return prevMessages

        return [...prevMessages, event]
      })
    },
  )

  useEffect(() => {
    setMessages(props.support_ticket_messages)
  }, [props.support_ticket_messages])

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

        <ConversationThread messages={messages} auth_user={props.auth.user} handleSendReply={handleSendReply} />
      </section>
    </VendorLayout>
  )
}
