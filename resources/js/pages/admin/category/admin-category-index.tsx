import { ColumnDef } from '@tanstack/react-table'
import { router } from '@inertiajs/react'
import { EditIcon, PlusIcon } from 'lucide-react'

import { IAdminCategory } from '@/types/admin-category'
import AdminLayout from '@/layouts/admin/admin-layout'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { BreadcrumbItem } from '@/types'

const columns: ColumnDef<IAdminCategory>[] = [
  {
    header: 'Category Name',
    accessorKey: 'name',
  },
  {
    header: 'Related Department',
    accessorKey: 'department_id',
  },
  {
    header: 'Created At',
    accessorKey: 'created_at',
  },
  {
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => router.get(route('admin.departments.edit', row.original.slug))}>
          <EditIcon />
        </Button>
        🗑️
        {/* <AdminDepartmentDelete slug={row.original.slug} /> */}
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
          {/* <Pagination
                    meta={props.departments.meta}
                    pagination_links={props.departments.links}
                    totalRows={props.departments.data.length}
                  /> */}
        </div>
      </section>
    </AdminLayout>
  )
}
