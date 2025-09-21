import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'

import VendorProductForm from '@/pages/vendor/product/vendor-product-form'
import VendorProductStatusEnum from '@/enums/vendor-product-status-enums'
import { IVendorProduct, productStatus } from '@/types/vendor-product'
import { IAdminDepartment } from '@/types/admin-department'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { IAdminCategory } from '@/types/admin-category'
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
  status: productStatus[]
  departments: Pick<IAdminDepartment, 'id' | 'name'>[]
  categories: PartialCategory[]
}

export default function VendorProductCreate(props: IProps) {
  const { data, setData, post, errors, processing } = useForm<IVendorProduct>({
    department_id: undefined,
    category_id: undefined,
    title: '',
    slug: '',
    description: 'Description will be added later',
    price: 100,
    quantity: 1,
    status: VendorProductStatusEnum.PUBLISHED,
    thumbnail_url: '',
    product_images: [],
    meta_title: '',
    meta_description: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(route('vendor.products.store'))
  }

  useEffect(() => {
    setData('slug', data.title.replaceAll(' ', '-').toLowerCase())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.title])

  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Create a product"
          description="This product will be shown in website under the selected department and category"
        />

        <VendorProductForm
          status={props.status}
          departments={props.departments}
          categories={props.categories}
          data={data}
          handleSubmit={handleSubmit}
          onDataChange={setData}
          errors={errors}
        />

        <Button type="submit" className="mt-6" disabled={processing} form="vendor-product-form">
          Upload Product
        </Button>
      </section>
    </VendorLayout>
  )
}
