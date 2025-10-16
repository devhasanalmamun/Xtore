import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'

import AdminLayout from '@/layouts/admin/admin-layout'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    routeName: 'vendor.products.index',
  },
  {
    title: 'Create Product',
    routeName: 'vendor.products.create',
  },
  {
    title: 'Create Product Variation',
    routeName: 'vendor.products.create',
  },
]
export default function VendorProductVariationCreate() {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Adding product variations" />
    </AdminLayout>
  )
}
