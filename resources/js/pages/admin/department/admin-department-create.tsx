import Heading from '@/components/heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AdminLayout from '@/layouts/admin/admin-layout'
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

        <form>
          <div>
            <Label>Department Name</Label>
            <Input placeholder="Enter a depertment name ex: Electronics" />
          </div>
        </form>
      </section>
    </AdminLayout>
  )
}
