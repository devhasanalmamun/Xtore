import { CheckCircleIcon, CircleXIcon, EditIcon, PlusIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Head, router } from '@inertiajs/react'

import AdminVariationTypeDelete from '@/pages/admin/variations-types/admin-variation-type-delete'
import { BreadcrumbItem, PaginationLinks, PaginationMeta } from '@/types'
import { IAdminVariationType } from '@/types/admin-variation-type'
import AdminLayout from '@/layouts/admin/admin-layout'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/ui/pagination'

const columns: ColumnDef<IAdminVariationType>[] = [
  {
    accessorKey: 'name',
    header: 'Product Variation Type Name',
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
    cell: ({ row }) => row.getValue('created_at'),
  },
  {
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => router.get(route('admin.variation-types.edit', row.original.slug))}>
          <EditIcon />
        </Button>

        <AdminVariationTypeDelete slug={row.original.slug} />
      </div>
    ),
  },
]

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Product Variation Types',
    routeName: 'admin.variation-types.index',
  },
]

interface IProps {
  variation_types: {
    data: IAdminVariationType[]
    meta: PaginationMeta
    links: PaginationLinks
  }
}

export default function AdminVariationTypeIndex(props: IProps) {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Variation Types For Products" />

      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Variation Types</h1>
          <Button onClick={() => router.get(route('admin.variation-types.create'))}>
            <PlusIcon strokeWidth={3} />
            <span>Create new variant type</span>
          </Button>
        </div>

        <div className="mt-8">
          <DataTable columns={columns} data={props.variation_types.data} />
          <Pagination
            meta={props.variation_types.meta}
            pagination_links={props.variation_types.links}
            totalRows={props.variation_types.data.length}
          />
        </div>
      </section>
    </AdminLayout>
  )
}
