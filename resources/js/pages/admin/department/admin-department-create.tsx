import AdminLayout from '@/layouts/admin/admin-layout'
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
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Create a department"
          description="This department will be shown in vendors dashboard when they create a product"
        />

        <form className="max-w-xl space-y-2">
          <div>
            <Label htmlFor="name">Department Name</Label>
            <Input id="name" name="name" placeholder="Enter a depertment name ex: Electronics" />
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" placeholder="Enter slug ex: Electronics" />
          </div>

          <div>
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input id="meta_title" name="meta_title" placeholder="Enter Meta title for SEO" />
          </div>

          <div>
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              name="meta_description"
              rows={5}
              placeholder="Enter Meta description for SEO"
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Checkbox id="active" name="active" defaultChecked />
            <Label htmlFor="active" className="mb-0 font-normal">
              Uncheck this if you want this department to be inactive
            </Label>
          </div>

          <Button className="mt-4">Submit Department</Button>
        </form>
      </section>
    </AdminLayout>
  )
}
