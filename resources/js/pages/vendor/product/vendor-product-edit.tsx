import { Head, useForm } from '@inertiajs/react'
import { useEffect } from 'react'

import VendorProductForm from '@/pages/vendor/product/vendor-product-form'
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
    title: 'Edit',
    routeName: 'vendor.products.edit',
  },
]

type PartialCategory = Pick<IAdminCategory, 'id' | 'department_id' | 'name'>

interface IProps {
  departments: Pick<IAdminDepartment, 'id' | 'name'>[]
  categories: PartialCategory[]
  status: productStatus[]
  product: IVendorProduct
}

export default function VendorProductEdit(props: IProps) {
  const { data, setData, processing, patch, errors } = useForm<IVendorProduct>({
    department_id: props.product.department_id,
    category_id: props.product.category_id,
    title: props.product.title,
    slug: props.product.slug,
    description: props.product.description,
    price: props.product.price,
    quantity: props.product.quantity,
    status: props.product.status,
    thumbnail_url: props.product.thumbnail_url,
    meta_title: props.product.meta_title,
    meta_description: props.product.meta_description,
  })

  function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    patch(route('vendor.products.update', props.product.slug))
  }

  useEffect(() => {
    setData('slug', data.title.replaceAll(' ', '-').toLowerCase())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.title])

  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Category" />

      <section className="px-4 py-8">
        <Heading
          title={`Edit product - ${props.product.title}`}
          description="This product will be edited and shown in landing pages."
        />

        <VendorProductForm
          departments={props.departments}
          categories={props.categories}
          data={data}
          onDataChange={setData}
          handleSubmit={handleEdit}
          status={props.status}
          errors={errors}
        />

        <Button type="submit" className="mt-6" form="vendor-product-form" disabled={processing}>
          Update product
        </Button>
      </section>
    </VendorLayout>
  )
}
