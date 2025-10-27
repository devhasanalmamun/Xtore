import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'

import AdminCategoryForm from '@/pages/admin/category/admin-category-form'
import { IAdminDepartment } from '@/types/admin-department'
import { IAdminCategory } from '@/types/admin-category'
import AdminLayout from '@/layouts/admin/admin-layout'
import { Button } from '@/components/ui/button'
import Heading from '@/components/heading'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    routeName: 'admin.categories.index',
  },
  {
    title: 'Create',
    routeName: 'admin.categories.create',
  },
]

interface IProps {
  departments: Pick<IAdminDepartment, 'id' | 'name'>[]
  categories: Pick<IAdminCategory, 'id' | 'department_id' | 'name'>[]
}

export default function AdminCategoryCreate(props: IProps) {
  const { data, setData, errors, post, processing } = useForm<IAdminCategory>({
    parent_id: undefined,
    department_id: undefined,
    name: '',
    slug: '',
    image: '',
    meta_title: '',
    meta_description: '',
    active: true,
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(route('admin.categories.store'))
  }

  useEffect(() => {
    setData('slug', data.name.replaceAll(' ', '-').toLowerCase())
  }, [data.name, setData])

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Create a category"
          description="This category will be shown in vendors dashboard when they create a product"
        />

        <AdminCategoryForm
          departments={props.departments}
          categories={props.categories}
          data={data}
          onDataChange={setData}
          errors={errors}
          handleSubmit={handleSubmit}
        />

        <Button type="submit" className="mt-6" form="admin-category-form" disabled={processing}>
          Create category
        </Button>
      </section>
    </AdminLayout>
  )
}
