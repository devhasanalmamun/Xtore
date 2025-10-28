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
}

export default function AdminBannerCreate(props: IProps) {
  const { data, setData, errors, post, processing } = useForm<IAdminBanner>({
    title: '',
    slug: '',
    image: '',
    page: '',
    section: '',
    active: true,
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(route('admin.banners.store'))
  }

  useEffect(() => {
    setData('slug', data.title!.replaceAll(' ', '-').toLowerCase())
  }, [data.title, setData])

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Create a Banner Image"
          description="This Banner image will be shown in different pages on different locations based on page name and section"
        />

        <AdminBannerForm
          data={data}
          pages={props.pages}
          sections={props.sections}
          onDataChange={setData}
          errors={errors}
          handleSubmit={handleSubmit}
        />

        <Button type="submit" className="mt-6" form="admin-banner-form" disabled={processing}>
          Create banner
        </Button>
      </section>
    </AdminLayout>
  )
}
