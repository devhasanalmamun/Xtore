import VendorLayout from '@/layouts/vendor/vendor-layout'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    routeName: 'vendor.products.index',
  },
]

export default function VendorProductIndex() {
  return <VendorLayout breadcrumbs={breadcrumbs}>vendor-product-index</VendorLayout>
}
