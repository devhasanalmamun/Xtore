import { Head } from '@inertiajs/react'

import { IAdminDepartment } from '@/types/admin-department'
import AdminLayout from '@/layouts/admin/admin-layout'
import Heading from '@/components/heading'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Departments',
    routeName: 'admin.departments.index',
  },
  {
    title: 'Edit',
    routeName: 'admin.departments.edit',
  },
]

interface IProps {
  department: IAdminDepartment
}

export default function AdminDepartmentEdit(props: IProps) {
  console.log(props.department)

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Department" />

      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title={`Edit department - ${props.department.name}`}
          description="This department will be edited and shown in vendors dashboard when they create a product"
        />
      </section>
    </AdminLayout>
  )
}
