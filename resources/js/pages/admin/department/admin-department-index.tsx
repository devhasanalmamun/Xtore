import AdminLayout from '@/layouts/admin/admin-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Departments',
    routeName: 'admin.departments',
  },
]

export default function AdminDepartmentIndex() {
  return <AdminLayout breadcrumbs={breadcrumbs}>admin-department-index</AdminLayout>
}
