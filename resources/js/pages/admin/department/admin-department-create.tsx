import AdminLayout from '@/layouts/admin/admin-layout'
import { BreadcrumbItem } from '@/types'
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Departments',
    routeName: 'admin.departments',
  },
  {
    title: 'Create',
    routeName: 'admin.departments.create',
  },
]

export default function AdmindepartmentCreate() {
  return <AdminLayout breadcrumbs={breadcrumbs}>admin-department-create</AdminLayout>
}
