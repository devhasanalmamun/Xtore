import { useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'

import AdminBannerForm from '@/pages/admin/banner/admin-banner-form'
import AdminLayout from '@/layouts/admin/admin-layout'
import { IAdminBanner } from '@/types/admin-banner'
import { Button } from '@/components/ui/button'
import Heading from '@/components/heading'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Banners',
    routeName: 'admin.banners.index',
  },
  {
    title: 'Create',
    routeName: 'admin.banners.create',
  },
]

interface IEnumLabel {
  label: string
  value: string
}

interface IProps {
  pages: IEnumLabel[]
  sections: IEnumLabel[]
  banner: IAdminBanner
}

export default function AdminBannerEdit(props: IProps) {
  const { data, setData, errors, patch, processing } = useForm<IAdminBanner>({
    title: props.banner.title,
    slug: props.banner.slug,
    image: props.banner.image,
    page: props.banner.page.replaceAll(' ', '').toLocaleLowerCase(),
    section: props.banner.section.trim().toLocaleLowerCase(),
    active: props.banner.active,
  })

  function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    patch(route('admin.banners.update', props.banner.slug), {
      onSuccess: () => {
        console.log('Updated category')
      },
      onError: () => {
        console.log('Failed to update the category')
      },
    })
  }

  useEffect(() => {
    setData('slug', data.title!.replaceAll(' ', '-').toLowerCase())
  }, [data.title, setData])

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Update a Banner Image"
          description="This Banner image will be shown in different pages on different locations based on page name and section"
        />

        <AdminBannerForm
          data={data}
          pages={props.pages}
          sections={props.sections}
          onDataChange={setData}
          errors={errors}
          handleSubmit={handleEdit}
        />

        <Button type="submit" className="mt-6" form="admin-banner-form" disabled={processing}>
          Update banner
        </Button>
      </section>
    </AdminLayout>
  )
}
