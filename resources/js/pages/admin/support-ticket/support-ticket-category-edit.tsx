import { Head, useForm } from '@inertiajs/react'

import SupportTicketCategoryForm from '@/pages/admin/support-ticket/support-ticket-category-form'
import { IAdminSupportTicketCategory } from '@/types/admin-support-ticket'
import AdminLayout from '@/layouts/admin/admin-layout'
import { Button } from '@/components/ui/button'
import Heading from '@/components/heading'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Ticket Categories',
    routeName: 'admin.support-ticket-categories.index',
  },
  {
    title: 'Edit',
    routeName: 'admin.support-ticket-categories.edit',
  },
]

interface IProps {
  visibility_options: string[]
  category: IAdminSupportTicketCategory
}

export default function SupportTicketCategoryEdit(props: IProps) {
  const { data, setData, post, errors, processing } = useForm<IAdminSupportTicketCategory>({
    name: props.category.name,
    visibility: props.category.visibility,
    active: props.category.active,
    sort_order: props.category.sort_order,
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    post(route('admin.support-ticket-categories.store'), {
      onSuccess: () => console.log('success'),
      onError: (errors) => console.log(errors),
    })

    console.log(data)
  }

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Update Support Ticket's Category" />

      <section className="px-4 py-8 md:px-4 md:py-8">
        <Heading
          title="Update Support Ticket Category"
          description="This category will be updated and shown in support ticket categories when users create a support ticket"
        />

        <SupportTicketCategoryForm
          visibility_options={props.visibility_options}
          data={data}
          onDataChange={setData}
          onSubmit={handleSubmit}
          errors={errors}
        />

        <Button type="submit" className="mt-6" form="support-ticket-category-form" disabled={processing}>
          Update Support Ticket Category
        </Button>
      </section>
    </AdminLayout>
  )
}
