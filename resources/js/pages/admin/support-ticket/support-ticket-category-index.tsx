import { CheckCircleIcon, CircleXIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Head, router } from '@inertiajs/react'

import { IAdminSupportTicketCategory } from '@/types/admin-support-ticket'
import { BreadcrumbItem, PaginationLinks, PaginationMeta } from '@/types'
import AdminLayout from '@/layouts/admin/admin-layout'
import { DataTable } from '@/components/ui/data-table'
import Pagination from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

const columns: ColumnDef<IAdminSupportTicketCategory>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Visibility',
    accessorKey: 'visibility',
  },
  {
    header: 'Sort Order',
    accessorKey: 'sort_order',
  },
  {
    header: 'Active',
    accessorKey: 'active',
    cell: ({ row }) =>
      row.getValue('active') === true ? (
        <CheckCircleIcon className="text-primary" />
      ) : (
        <CircleXIcon className="text-red-500" />
      ),
  },
  {
    header: 'Created At',
    accessorKey: 'created_at',
  },
  {
    header: 'Actions',
    accessorKey: 'actions',
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Ticket Categories',
    routeName: 'admin.support-ticket-categories.index',
  },
]

interface IProps {
  categories: {
    data: IAdminSupportTicketCategory[]
    meta: PaginationMeta
    links: PaginationLinks
  }
}

export default function SupportTicketCategoryIndex(props: IProps) {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Support Ticket Categories" />

      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Categories</h1>
          <Button onClick={() => router.get(route('admin.support-ticket-categories.create'))}>
            <PlusIcon />
            <span>Create new category</span>
          </Button>
        </div>

        <div className="mt-8">
          <DataTable columns={columns} data={props.categories.data} />
          <Pagination
            meta={props.categories.meta}
            pagination_links={props.categories.links}
            totalRows={props.categories.data.length}
          />
        </div>
      </section>
    </AdminLayout>
  )
}
