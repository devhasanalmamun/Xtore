import { ColumnDef } from '@tanstack/react-table'
import { Head, Link, router } from '@inertiajs/react'
import { EyeIcon, PlusIcon } from 'lucide-react'

import { PaginationMeta, PaginationLinks, BreadcrumbItem } from '@/types'
import { IVendorSupportTicketIndex } from '@/types/vendor-support-ticket'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { DataTable } from '@/components/ui/data-table'
import Pagination from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { statusBadgeVariant } from '@/lib/utils'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Support Tickets',
    routeName: 'vendor.support-tickets.index',
  },
]

const columns: ColumnDef<IVendorSupportTicketIndex>[] = [
  {
    header: 'Subject',
    accessorKey: 'subject',
  },
  {
    header: 'Category',
    accessorKey: 'category.name',
  },
  {
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={statusBadgeVariant(row.original.status ?? '')} className="py-0 text-xs capitalize">
        {row.original.status}
      </Badge>
    ),
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
        onClick={() => router.get(route('vendor.support-tickets.show', row.original.id))}
      >
        <EyeIcon className="h-4 w-4" />
      </Button>
    ),
  },
]

interface IProps {
  support_tickets: {
    data: IVendorSupportTicketIndex[]
    meta: PaginationMeta
    links: PaginationLinks
  }
}

export default function VendorSupportTicketIndex(props: IProps) {
  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <Head title="Support Tickets" />

      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Tickets </h1>
          <Button asChild>
            <Link href={route('vendor.support-tickets.create')}>
              <PlusIcon className="h-4 w-4" />
              Create Support Ticket
            </Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-col overflow-x-auto rounded">
          <DataTable columns={columns} data={props.support_tickets.data} />
          <Pagination
            meta={props.support_tickets.meta}
            pagination_links={props.support_tickets.links}
            totalRows={props.support_tickets.data.length}
          />
        </div>
      </section>
    </VendorLayout>
  )
}
