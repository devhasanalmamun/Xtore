import { Head } from '@inertiajs/react'

import AdminLayout from '@/layouts/admin/admin-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'User Queries',
    routeName: 'admin.user-queries.index',
  },
]

export default function UserQueryIndex() {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="User Queries" />
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div>User Queries</div>
      </section>
    </AdminLayout>
  )
}
