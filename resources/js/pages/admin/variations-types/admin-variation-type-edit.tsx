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
    title: 'Edit',
    routeName: 'admin.variation-types.edit',
  },
]

interface IProps {
  variation_type: IAdminVariationType
}

export default function AdminVariationTypeEdit(props: IProps) {
  const { data, setData, processing, patch, errors } = useForm<IAdminVariationType>({
    name: props.variation_type.name,
    slug: props.variation_type.slug,
    active: props.variation_type.active,
  })

  function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    patch(route('admin.variation-types.update', props.variation_type.slug), {
      onSuccess: () => {
        console.log('Variation type updated successfully')
      },

      onError: (error) => {
        console.error(error)
      },
    })
  }

  useEffect(() => {
    setData('slug', data.name.replaceAll(' ', '-').toLocaleLowerCase())
  }, [data.name, setData])

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title={`Edit variation type ${props.variation_type.name} for products`}
          description="This vartion type will appear when vendor starts creating variations for their product"
        />

        <AdminVariationTypeForm data={data} onDataChange={setData} errors={errors} handleSubmit={handleEdit} />

        <Button type="submit" className="mt-4" disabled={processing} form="admin-variation-type-form">
          Update Variation Type
        </Button>
      </section>
    </AdminLayout>
  )
}
