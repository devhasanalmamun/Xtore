import { CheckCircleIcon, CircleXIcon, EditIcon, PlusIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { router } from '@inertiajs/react'

import AdminCategoryDelete from '@/pages/admin/category/admin-category-delete'
import { BreadcrumbItem, PaginationLinks, PaginationMeta } from '@/types'
import { IAdminCategory } from '@/types/admin-category'
import AdminLayout from '@/layouts/admin/admin-layout'
import { DataTable } from '@/components/ui/data-table'
import Pagination from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

const columns: ColumnDef<IAdminCategory>[] = [
  {
    header: 'Category Name',
    accessorKey: 'name',
  },
  {
    header: 'Related Department',
    accessorKey: 'department.name',
  },
  {
    header: 'Created At',
    accessorKey: 'created_at',
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
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => router.get(route('admin.categories.edit', row.original.slug))}>
          <EditIcon />
        </Button>
        <AdminCategoryDelete slug={row.original.slug} />
      </div>
    ),
  },
]

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    routeName: 'admin.categories.index',
  },
]

interface IProps {
  categories: {
    data: IAdminCategory[]
    meta: PaginationMeta
    links: PaginationLinks
  }
}

export default function AdminCategoryIndex(props: IProps) {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Categories</h1>
          <Button onClick={() => router.get(route('admin.categories.create'))}>
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
