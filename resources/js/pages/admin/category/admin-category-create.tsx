import AdminLayout from '@/layouts/admin/admin-layout'
import Heading from '@/components/heading'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    routeName: 'admin.categories.index',
  },
  {
    title: 'Create',
    routeName: 'admin.categories.create',
  },
]

export default function AdminCategoryCreate() {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Create a category"
          description="This category will be shown in vendors dashboard when they create a product"
        />
      </section>
    </AdminLayout>
  )
}
