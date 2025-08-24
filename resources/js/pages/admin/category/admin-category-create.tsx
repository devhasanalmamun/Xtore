import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IAdminDepartment } from '@/types/admin-department'
import { IAdminCategory } from '@/types/admin-category'
import AdminLayout from '@/layouts/admin/admin-layout'
import { Checkbox } from '@/components/ui/checkbox'
import Textarea from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
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
  departments: Pick<IAdminDepartment, 'name' | 'slug'>[]
}

export default function AdminCategoryCreate(props: IProps) {
  const { data, setData, post, errors } = useForm<IAdminCategory & { department_slug: string }>({
    name: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    department_slug: '',
    active: true,
  })

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    console.log(data)
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

        <form className="max-w-xl space-y-2">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="Enter the category name. ex: Hard disk"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={data.slug}
              onChange={(e) => setData('slug', e.target.value)}
              placeholder="Enter the slug for category. ex: hard-disk"
              required
            />
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
          </div>

          <div>
            <Label htmlFor="department">Choose Department</Label>

            <Select name="department" onValueChange={(value) => setData('department_slug', value)}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {props.departments.length ? <p>Select a department</p> : <p>No department found</p>}
                  </SelectLabel>
                  {props.departments.map((department) => (
                    <SelectItem key={department.slug} value={department.slug}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Checkbox
              id="active"
              name="active"
              defaultChecked={data.active}
              onCheckedChange={(e) => setData('active', e)}
            />
            <Label htmlFor="active" className="mb-0 font-normal">
              Uncheck this, if you want this category to be inactive.
            </Label>
          </div>
        </form>

        <Button className="mt-6" onClick={handleSubmit}>
          Submit Category
        </Button>
      </section>
    </AdminLayout>
  )
}
