import VendorLayout from '@/layouts/vendor/vendor-layout'
import Heading from '@/components/heading'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    routeName: 'vendor.products.index',
  },
  {
    title: 'Create',
    routeName: 'vendor.products.create',
  },
]

export default function VendorProductCreate() {
  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Create a product"
          description="This product will be shown in website under the selected department and category"
        />
      </section>
    </VendorLayout>
  )
}
