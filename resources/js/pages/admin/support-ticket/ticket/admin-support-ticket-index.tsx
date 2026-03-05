import { ColumnDef } from '@tanstack/react-table'
import { Head, router } from '@inertiajs/react'
import { EyeIcon } from 'lucide-react'

import AdminSupportTicketFilters from '@/pages/admin/support-ticket/ticket/admin-support-ticket-filters'
import { BreadcrumbItem, PaginationLinks, PaginationMeta } from '@/types'
import { IAdminSupportTicket } from '@/types/admin-support-ticket'
import AdminLayout from '@/layouts/admin/admin-layout'
import { DataTable } from '@/components/ui/data-table'
import Pagination from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { limitWords } from '@/lib/utils'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Support Tickets',
    routeName: 'admin.support-tickets.index',
  },
]

const columns: ColumnDef<IAdminSupportTicket>[] = [
  {
    header: 'Created By',
    accessorKey: 'created_by.name',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-truncate">{row.original.created_by.name}</span>
        <Badge variant={row.original.created_by.role === 'Customer' ? 'default' : 'outline'} className="py-0 text-xs">
          {row.original.created_by.role.toLowerCase()}
        </Badge>
      </div>
    ),
  },
  {
    header: 'Category',
    cell: ({ row }) => <span className="text-truncate">{limitWords(row.original.category.name, 2)}</span>,
  },
  {
    header: 'Subject',
    accessorKey: 'subject',
    cell: ({ row }) => <span className="text-truncate">{limitWords(row.original.subject, 7)}</span>,
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Created At',
    accessorKey: 'created_at',
  },
  {
    header: 'Updated At',
    accessorKey: 'updated_at',
  },
  {
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="icon"
        onClick={() => router.get(route('admin.support-tickets.show', row.original.id))}
      >
        <EyeIcon />
      </Button>
    ),
  },
]

interface IProps {
  ticket_status_options: string[]
  support_tickets: {
    data: IAdminSupportTicket[]
    meta: PaginationMeta
    links: PaginationLinks
  }
}

export default function SupportTicketIndex(props: IProps) {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Support Tickets" />
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Tickets</h1>
          <AdminSupportTicketFilters ticket_status_options={props.ticket_status_options} />
        </div>

        <div className="mt-8">
          <DataTable columns={columns} data={props.support_tickets.data} />
          <Pagination
            meta={props.support_tickets.meta}
            pagination_links={props.support_tickets.links}
            totalRows={props.support_tickets.data.length}
          />
        </div>
      </section>
    </AdminLayout>
  )
}
