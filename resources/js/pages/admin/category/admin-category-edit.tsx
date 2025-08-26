import { Head } from '@inertiajs/react'

import AdminLayout from '@/layouts/admin/admin-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    routeName: 'admin.categories.index',
  },
  {
    title: 'Edit',
    routeName: 'admin.categories.edit',
  },
]

export default function AdminCategoryEdit() {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Category" />

      <section className="px-4 py-8"></section>
    </AdminLayout>
  )
}
