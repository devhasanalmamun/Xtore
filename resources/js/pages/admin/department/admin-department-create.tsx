import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'

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
    title: 'Create',
    routeName: 'admin.departments.create',
  },
]

export default function AdmindepartmentCreate() {
  const { data, setData, processing, post, errors } = useForm<IAdminDepartment>({
    name: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    active: true,
  })

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault()
    post(route('admin.departments.store'))
  }

  useEffect(() => {
    setData('slug', data.name.replaceAll(' ', '-').toLocaleLowerCase())
  }, [data.name, setData])

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Create a department"
          description="This department will be shown in vendors dashboard when they create a product"
        />

        <AdminDepartmentForm data={data} onDataChange={setData} errors={errors} />

        <Button type="submit" className="mt-4" disabled={processing} onClick={handleSubmit}>
          Submit Department
        </Button>
      </section>
    </AdminLayout>
  )
}
