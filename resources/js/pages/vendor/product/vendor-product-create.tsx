import { useForm } from '@inertiajs/react'

import VendorProductForm from '@/pages/vendor/product/vendor-product-form'
import { IAdminDepartment } from '@/types/admin-department'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { IAdminCategory } from '@/types/admin-category'
import { prodectStatus } from '@/types/vendor-product'
import { Button } from '@/components/ui/button'
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
type PartialCategory = Pick<IAdminCategory, 'id' | 'department_id' | 'name'>

interface IProps {
  status: prodectStatus[]
  departments: Pick<IAdminDepartment, 'id' | 'name'>[]
  categories: PartialCategory[]
}

export default function VendorProductCreate(props: IProps) {
  const { processing } = useForm({})

  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Create a product"
          description="This product will be shown in website under the selected department and category"
        />

        <VendorProductForm status={props.status} departments={props.departments} categories={props.categories} />

        <Button type="submit" className="mt-6" disabled={processing} form="vendor-product-form">
          Upload Product
        </Button>
      </section>
    </VendorLayout>
  )
}
