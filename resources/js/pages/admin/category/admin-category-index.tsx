import AdminLayout from '@/layouts/admin/admin-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    routeName: 'admin.categories.index',
  },
]

export default function AdminCategoryIndex() {
  return <AdminLayout breadcrumbs={breadcrumbs}>admin-category-index</AdminLayout>
}
