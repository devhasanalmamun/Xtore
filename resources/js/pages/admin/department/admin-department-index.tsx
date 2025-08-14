import { PlusIcon } from 'lucide-react'

import AdminLayout from '@/layouts/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Departments',
    routeName: 'admin.departments',
  },
]

export default function AdminDepartmentIndex() {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Departments</h1>
          <Button>
            <PlusIcon />
            <span>Create new department</span>
          </Button>
        </div>
      </section>
    </AdminLayout>
  )
}
