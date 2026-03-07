import { Head, useForm } from '@inertiajs/react'

import VendorSupportTicketForm from '@/pages/vendor/support-ticket/vendor-support-ticket-form'
import { IVendorSupportTicketCreate } from '@/types/vendor-support-ticket'
import { IAdminSupportTicketCategory } from '@/types/admin-support-ticket'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { Button } from '@/components/ui/button'
import { BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Support Tickets',
    routeName: 'vendor.support-tickets.index',
  },
  {
    title: 'Create',
    routeName: 'vendor.support-tickets.create',
  },
]

interface IProps {
  support_ticket_categories: IAdminSupportTicketCategory[]
}

export default function VendorSupportTicketCreate(props: IProps) {
  const { data, setData, post, processing, errors } = useForm<IVendorSupportTicketCreate>({
    subject: '',
    description: '',
    category: '',
    attachment: null,
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    post(route('vendor.support-tickets.store'), {
      onSuccess: () => console.log('success'),
      onError: (errors) => console.log(errors),
    })
  }

  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Support Ticket" />
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="mb-6">
          <h1 className="text-xl font-medium">Create Support Ticket</h1>
          <p className="text-sm text-gray-500">Please fill in the form below to create a new support ticket.</p>
          <p className="mt-1 text-sm text-gray-600">Note: Please be as detailed as possible in your description.</p>
        </div>

        <VendorSupportTicketForm
          data={data}
          categories={props.support_ticket_categories}
          setData={setData}
          errors={errors}
          handleSubmit={handleSubmit}
        />

        <Button type="submit" className="mt-6" disabled={processing} form="vendor-support-ticket-create-form">
          Submit Ticket
        </Button>
      </section>
    </VendorLayout>
  )
}
