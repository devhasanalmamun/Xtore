import { ArrowUp, EditIcon, PlusIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { router } from '@inertiajs/react'
import { formatDistance } from 'date-fns'

import AdminDepartmentDelete from '@/pages/admin/department/admin-department-delete'
import { IAdminDepartment } from '@/types/admin-department'
import { BreadcrumbItem, PaginationMeta } from '@/types'
import { DataTable } from '@/components/ui/data-table'
import AdminLayout from '@/layouts/admin/admin-layout'
import Pagination from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const columns: ColumnDef<IAdminDepartment>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="has-[>svg]:px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'desc' ? false : true)}
      >
        Department Name
        <ArrowUp
          className={cn(
            'transition-transform duration-200',
            column.getIsSorted() === 'desc' ? 'rotate-180' : 'rotate-0',
          )}
        />
      </Button>
    ),
  },
  {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="has-[>svg]:px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'desc' ? false : true)}
      >
        Active
        <ArrowUp
          className={cn(
            'transition-transform duration-200',
            column.getIsSorted() === 'desc' ? 'rotate-180' : 'rotate-0',
          )}
        />
      </Button>
    ),
    accessorKey: 'active',
    cell: ({ row }) =>
      row.getValue('active') ? <p className="text-green-600">Yes</p> : <p className="text-red-600">No</p>,
  },
  {
    header: 'Created At',
    accessorKey: 'created_at',
    cell: ({ row }) => formatDistance(new Date(row.getValue('created_at')), new Date(), { addSuffix: true }),
  },
  {
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => router.get(route('admin.departments.edit', row.original.slug))}>
          <EditIcon />
        </Button>

        <AdminDepartmentDelete slug={row.original.slug} />
      </div>
    ),
  },
]

interface IProps {
  departments: IAdminDepartment[]
  meta: PaginationMeta
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Departments',
    routeName: 'admin.departments.index',
  },
]

export default function AdminDepartmentIndex(props: IProps) {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Departments</h1>
          <Button onClick={() => router.get(route('admin.departments.create'))}>
            <PlusIcon />
            <span>Create new department</span>
          </Button>
        </div>

        <div className="mt-8">
          <DataTable columns={columns} data={props.departments} />
          <Pagination meta={props.meta} />
        </div>
      </section>
    </AdminLayout>
  )
}
