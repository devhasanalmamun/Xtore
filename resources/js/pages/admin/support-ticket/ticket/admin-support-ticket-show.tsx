import { Head, router } from '@inertiajs/react'
import { useEcho } from '@laravel/echo-react'
import { ArrowLeftIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import AdminSupportTicketShowSubmittedBy from '@/pages/admin/support-ticket/ticket/partials/admin-support-ticket-show-submitted-by'
import AdminSupportTicketShowAssignedTo from '@/pages/admin/support-ticket/ticket/partials/admin-support-ticket-show-assigned-to'
import AdminSupportTicketShowActions from '@/pages/admin/support-ticket/ticket/partials/admin-support-ticket-show-actions'
import SupportTicketShowInformation from '@/components/support-ticket/support-ticket-show-information'
import SupportTicketShowDetails from '@/components/support-ticket/support-ticket-show-details'
import ConversationThread from '@/components/support-ticket/conversation-thread'
import { ISupportTicketMessage } from '@/types/support-ticket-messages'
import { IAdminSupportTicket } from '@/types/admin-support-ticket'
import AdminLayout from '@/layouts/admin/admin-layout'
import { statusBadgeVariant } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Auth, BreadcrumbItem } from '@/types'
import { Badge } from '@/components/ui/badge'

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
  support_ticket_messages: ISupportTicketMessage[]
  auth: Auth
}

export default function AdminSupportTicketShow(props: IProps) {
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
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Support Ticket Details" />

      <section className="px-4 py-8 md:px-4 md:py-8">
        {/* Page header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-medium">Ticket #{props.support_ticket.id}</h1>
            <Badge variant={statusBadgeVariant(props.support_ticket.status)} className="capitalize">
              {props.support_ticket.status}
            </Badge>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.get(route('admin.support-tickets.index'))}>
            <ArrowLeftIcon />
            <span>Back to Tickets</span>
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            <SupportTicketShowInformation
              subject={props.support_ticket.subject}
              description={props.support_ticket.description}
              attachment={props.support_ticket.attachment ?? ''}
            />

            <ConversationThread handleSendReply={handleSendReply} messages={messages} auth_user={props.auth.user} />
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <SupportTicketShowDetails
              ticket_status={props.support_ticket.status}
              ticket_category={props.support_ticket.category.name}
              ticket_created_at={props.support_ticket.created_at}
              ticket_updated_at={props.support_ticket.updated_at}
            />

            <AdminSupportTicketShowSubmittedBy created_by={props.support_ticket.created_by} />
            <AdminSupportTicketShowAssignedTo assigned_to={props.support_ticket.assigned_to} />
            <AdminSupportTicketShowActions />
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}
