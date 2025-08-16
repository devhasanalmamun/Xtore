import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'

import AdminLayout from '@/layouts/admin/admin-layout'
import InputError from '@/components/ui/input-error'
import { Checkbox } from '@/components/ui/checkbox'
import Textarea from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  const { data, setData, processing, post, errors } = useForm({
    name: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    active: 1,
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(route('admin.departments.store'))
  }

  useEffect(() => {
    setData('slug', data.name.replaceAll(' ', '-').toLocaleLowerCase())
  }, [data.name])

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Create a department"
          description="This department will be shown in vendors dashboard when they create a product"
        />

        <form className="max-w-xl space-y-2" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="Enter a depertment name ex: Electronics"
              required
            />
            <InputError message={errors.name} />
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={data.slug}
              onChange={(e) => setData('slug', e.target.value)}
              placeholder="Enter slug ex: Electronics"
              required
            />
            <InputError message={errors.slug} />
          </div>

          <div>
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input
              id="meta_title"
              name="meta_title"
              value={data.meta_title}
              onChange={(e) => setData('meta_title', e.target.value)}
              placeholder="Enter Meta title for SEO"
              required
            />
            <InputError message={errors.meta_title} />
          </div>

          <div>
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              name="meta_description"
              value={data.meta_description}
              onChange={(e) => setData('meta_description', e.target.value)}
              rows={5}
              placeholder="Enter Meta description for SEO"
              required
            />
            <InputError message={errors.meta_description} />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Checkbox
              id="active"
              name="active"
              defaultChecked
              onCheckedChange={(e) => setData('active', e === true ? 1 : 0)}
            />
            <Label htmlFor="active" className="mb-0 font-normal">
              Uncheck this if you want this department to be inactive
            </Label>
            <InputError message={errors.active} />
          </div>

          <Button type="submit" className="mt-4" disabled={processing}>
            Submit Department
          </Button>
        </form>
      </section>
    </AdminLayout>
  )
}
