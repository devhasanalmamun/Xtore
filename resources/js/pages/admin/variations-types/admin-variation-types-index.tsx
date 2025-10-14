import { Head, router } from '@inertiajs/react'
import { BreadcrumbItem } from '@/types'
import { PlusIcon } from 'lucide-react'

import AdminLayout from '@/layouts/admin/admin-layout'
import { Button } from '@/components/ui/button'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Product Variation Types',
    routeName: 'admin.variation-types.index',
  },
]

export default function AdminVariationTypesIndex() {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Variation Types For Products" />

      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Variation Types</h1>
          <Button onClick={() => router.get(route('admin.variation-types.create'))}>
            <PlusIcon strokeWidth={3} />
            <span>Create new variant type</span>
          </Button>
        </div>
      </section>
    </AdminLayout>
  )
}
