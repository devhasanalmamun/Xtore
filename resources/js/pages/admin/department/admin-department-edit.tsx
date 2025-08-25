import { Head, useForm } from '@inertiajs/react'

import AdminDepartmentForm from '@/pages/admin/department/admin-department-form'
import { IAdminDepartment } from '@/types/admin-department'
import AdminLayout from '@/layouts/admin/admin-layout'
import { Button } from '@/components/ui/button'
import Heading from '@/components/heading'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Departments',
    routeName: 'admin.departments.index',
  },
  {
    title: 'Edit',
    routeName: 'admin.departments.edit',
  },
]

interface IProps {
  department: IAdminDepartment
}

export default function AdminDepartmentEdit(props: IProps) {
  const { data, setData, errors, patch, processing } = useForm<IAdminDepartment>({
    name: props.department.name,
    slug: props.department.slug,
    meta_title: props.department.meta_title,
    meta_description: props.department.meta_description,
    active: props.department.active,
  })

  function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    patch(route('admin.departments.update', props.department.slug), {
      onSuccess: () => {
        console.log('Department updated successfully')
      },

      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Department" />

      <section className="px-4 py-8">
        <Heading
          title={`Edit department - ${props.department.name}`}
          description="This department will be edited and shown in vendors dashboard when they create a product"
        />

        <AdminDepartmentForm data={data} onDataChange={setData} errors={errors} handleSubmit={handleEdit} />

        <Button className="mt-4" disabled={processing} form="admin-department-form">
          Update Department
        </Button>
      </section>
    </AdminLayout>
  )
}
