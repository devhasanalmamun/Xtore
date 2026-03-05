import { Head, router } from '@inertiajs/react'
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClipboardListIcon,
  MessageSquareIcon,
  PaperclipIcon,
  TagIcon,
  UserIcon,
  XCircleIcon,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IAdminSupportTicket } from '@/types/admin-support-ticket'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import AdminLayout from '@/layouts/admin/admin-layout'
import { Separator } from '@/components/ui/separator'
import Textarea from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

function statusBadgeVariant(status: string): 'default' | 'secondary' | 'outline' | 'destructive' {
  switch (status?.toLowerCase()) {
    case 'open':
      return 'default'
    case 'closed':
      return 'secondary'
    case 'resolved':
      return 'secondary'
    case 'in_progress':
      return 'outline'
    default:
      return 'outline'
  }
}

export default function AdminSupportTicketShow({ support_ticket }: IProps) {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Support Ticket Details" />

      <section className="px-4 py-8 md:px-4 md:py-8">
        {/* Page header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-medium">Ticket #{support_ticket.id}</h1>
            <Badge variant={statusBadgeVariant(support_ticket.status)} className="capitalize">
              {support_ticket.status}
            </Badge>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.get(route('admin.support-tickets.index'))}>
            <ArrowLeftIcon />
            <span>Back to Tickets</span>
          </Button>
        </div>

        {/* Main grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ── Left column ── */}
          <div className="space-y-6 lg:col-span-2">
            {/* Ticket info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ClipboardListIcon className="h-4 w-4" />
                  Ticket Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Subject</p>
                  <p className="mt-1 font-medium">{support_ticket.subject}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Description</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">{support_ticket.description}</p>
                </div>

                {support_ticket.attachment && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Attachment</p>
                      <a
                        href={support_ticket.attachment}
                        className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <PaperclipIcon className="h-3.5 w-3.5" />
                        View Attachment
                      </a>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Conversation thread */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquareIcon className="h-4 w-4" />
                  Conversation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Customer message */}
                <div className="flex gap-3">
                  <Avatar className="mt-0.5 shrink-0">
                    <AvatarFallback className="text-xs">
                      {support_ticket.created_by.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{support_ticket.created_by.name}</p>
                      <Badge variant="outline" className="py-0 text-xs capitalize">
                        {support_ticket.created_by.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{support_ticket.created_at}</span>
                    </div>
                    <div className="mt-2 rounded-lg border bg-muted/40 px-4 py-3 text-sm leading-relaxed">
                      I placed an order and the payment was deducted but I haven't received any confirmation email.
                      Could you please check the status of my order?
                    </div>
                  </div>
                </div>

                {/* Admin reply (static example) */}
                <div className="flex gap-3">
                  <Avatar className="mt-0.5 shrink-0">
                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">A</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">Admin Support</p>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-relaxed">
                      Thank you for reaching out. We have located your order and found a temporary processing delay on
                      our payment gateway. Your confirmation email will be sent within the next 30 minutes. We apologize
                      for the inconvenience.
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Reply box */}
                <div className="space-y-3">
                  <p className="text-sm font-medium">Add Reply</p>
                  <Textarea placeholder="Type your reply here..." rows={4} />
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="reply-attachment"
                      className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <PaperclipIcon className="h-4 w-4" />
                      Attach file
                      <input id="reply-attachment" type="file" className="sr-only" />
                    </label>
                    <Button>Send Reply</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Right sidebar ── */}
          <div className="space-y-4">
            {/* Ticket details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={statusBadgeVariant(support_ticket.status)} className="capitalize">
                    {support_ticket.status}
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <TagIcon className="h-3.5 w-3.5 shrink-0" />
                    Category
                  </span>
                  <span className="text-right font-medium">{support_ticket.category.name}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                    Opened
                  </span>
                  <span className="text-right">{support_ticket.created_at}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                    Last Update
                  </span>
                  <span className="text-right">{support_ticket.updated_at}</span>
                </div>
              </CardContent>
            </Card>

            {/* Submitted by */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Submitted By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{support_ticket.created_by.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{support_ticket.created_by.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{support_ticket.created_by.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assigned to */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Assigned To</CardTitle>
              </CardHeader>
              <CardContent>
                {support_ticket.asssigned_to ? (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{support_ticket.asssigned_to?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{support_ticket.asssigned_to}</p>
                      <p className="text-xs text-muted-foreground">Support Agent</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UserIcon className="h-4 w-4" />
                    <span>Unassigned</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />
                  Mark as Resolved
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                >
                  <XCircleIcon className="h-4 w-4" />
                  Close Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}
