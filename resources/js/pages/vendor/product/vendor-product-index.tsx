import { Button } from '@/components/ui/button'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { BreadcrumbItem } from '@/types'
import { router } from '@inertiajs/react'
import { PlusIcon } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    routeName: 'vendor.products.index',
  },
]

export default function VendorProductIndex() {
  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Products</h1>
          <Button onClick={() => router.get(route('vendor.products.create'))}>
            <PlusIcon />
            <span>Create new product</span>
          </Button>
        </div>
      </section>
    </VendorLayout>
  )
}
