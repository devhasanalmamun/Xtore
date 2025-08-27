import { Head, useForm } from '@inertiajs/react'

import { IAdminCategory } from '@/types/admin-category'
import AdminLayout from '@/layouts/admin/admin-layout'
import Heading from '@/components/heading'
import { BreadcrumbItem } from '@/types'
import AdminCategoryForm from './admin-category-form'
import { Button } from '@/components/ui/button'
import { IAdminDepartment } from '@/types/admin-department'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    routeName: 'admin.categories.index',
  },
  {
    title: 'Edit',
    routeName: 'admin.categories.edit',
  },
]

interface IProps {
  category: IAdminCategory
  departments: Pick<IAdminDepartment, 'id' | 'name'>[]
  categories: Pick<IAdminCategory, 'id' | 'department_id' | 'name'>[]
}

export default function AdminCategoryEdit(props: IProps) {
  const { data, setData, errors, patch, processing } = useForm<IAdminCategory>({
    id: props.category.id,
    parent_id: props.category.parent_id ?? undefined,
    department_id: props.category.department_id,
    name: props.category.name,
    slug: props.category.slug,
    meta_title: props.category.meta_title,
    meta_description: props.category.meta_description,
    active: props.category.active,
  })

  function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    patch(route('admin.categories.update', props.category.slug), {
      onSuccess: () => {
        console.log('Updated category')
      },
      onError: () => {
        console.log('Failed to update the category')
      },
    })
  }

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Category" />

      <section className="px-4 py-8">
        <Heading
          title={`Edit category - ${props.category.name}`}
          description="This category will be edited and shown in vendors dashboard when they create a product"
        />

        <AdminCategoryForm
          departments={props.departments}
          categories={props.categories}
          data={data}
          onDataChange={setData}
          errors={errors}
          handleSubmit={handleEdit}
        />

        <Button type="submit" className="mt-6" form="admin-category-form" disabled={processing}>
          Update category
        </Button>
      </section>
    </AdminLayout>
  )
}
