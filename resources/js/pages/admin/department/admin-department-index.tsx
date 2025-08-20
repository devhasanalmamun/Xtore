import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { router } from '@inertiajs/react'
import { formatDistance } from 'date-fns'

import { DataTable } from '@/components/ui/data-table'
import AdminLayout from '@/layouts/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Departments',
    routeName: 'admin.departments.index',
  },
]

type Department = {
  name: string
  active: boolean
  created_at: string
}

const columns: ColumnDef<Department>[] = [
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
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <EditIcon />
        </Button>

        <Button variant="destructive">
          <TrashIcon />
        </Button>
      </div>
    ),
  },
]

interface IProps {
  departments: Department[]
}

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
