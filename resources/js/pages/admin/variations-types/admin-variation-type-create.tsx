import { useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'

import AdminVariationTypeForm from '@/pages/admin/variations-types/admin-variation-type-form'
import { IAdminVariationType } from '@/types/admin-variation-type'
import AdminLayout from '@/layouts/admin/admin-layout'
import { Button } from '@/components/ui/button'
import Heading from '@/components/heading'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Product Variation Types',
    routeName: 'admin.variation-types.index',
  },
  {
    title: 'Create',
    routeName: 'admin.variation-types.create',
  },
]

export default function AdminVariationTypeCreate() {
  const { data, setData, processing, post, errors } = useForm<IAdminVariationType>({
    name: '',
    slug: '',
    active: true,
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    post(route('admin.variation-types.store'))
  }

  useEffect(() => {
    setData('slug', data.name.replaceAll(' ', '-').toLocaleLowerCase())
  }, [data.name, setData])

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Create a variation type for products"
          description="This vartion type will appear when vendor starts creating variations for their product"
        />

        <AdminVariationTypeForm data={data} onDataChange={setData} errors={errors} handleSubmit={handleSubmit} />

        <Button type="submit" className="mt-4" disabled={processing} form="admin-department-form">
          Submit Department
        </Button>
      </section>
    </AdminLayout>
  )
}
