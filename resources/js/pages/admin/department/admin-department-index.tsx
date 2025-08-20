import { ColumnDef } from '@tanstack/react-table'
import { EditIcon, PlusIcon } from 'lucide-react'
import { router } from '@inertiajs/react'
import { formatDistance } from 'date-fns'

import AdminDepartmentDelete from '@/pages/admin/department/admin-department-delete'
import { IAdminDepartment } from '@/types/admin-department'
import { DataTable } from '@/components/ui/data-table'
import AdminLayout from '@/layouts/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { BreadcrumbItem } from '@/types'

const columns: ColumnDef<IAdminDepartment>[] = [
  {
    header: 'Department Name',
    accessorKey: 'name',
  },
  {
    header: 'Active',
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
        <Button variant="outline">
          <EditIcon />
        </Button>

        <AdminDepartmentDelete id={row.original.id} />
      </div>
    ),
  },
]

interface IProps {
  departments: IAdminDepartment[]
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
        </div>
      </section>
    </AdminLayout>
  )
}
