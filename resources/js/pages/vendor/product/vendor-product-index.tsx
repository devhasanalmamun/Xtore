import { router } from '@inertiajs/react'
import { EditIcon, PlusIcon } from 'lucide-react'

import VendorLayout from '@/layouts/vendor/vendor-layout'
import { Button } from '@/components/ui/button'
import { BreadcrumbItem } from '@/types'
import { IVendorProduct } from '@/types/vendor-product'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import AdminDepartmentDelete from '@/pages/admin/department/admin-department-delete'

const columns: ColumnDef<IVendorProduct>[] = [
  {
    header: 'Title',
    accessorKey: 'title',
    cell: ({ row }) => String(row.getValue('title')).slice(0, 20) + ' ...',
  },
  {
    header: 'Description',
    accessorKey: 'description',
    cell: ({ row }) => String(row.getValue('description')).slice(0, 30) + ' ...',
  },
  {
    header: 'Price',
    accessorKey: 'price',
    cell: ({ row }) => row.getValue('price') + ' bdt',
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
    cell: ({ row }) => row.getValue('quantity') + ' piece',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Created At',
    accessorKey: 'created_at',
    cell: ({ row }) => row.getValue('created_at'),
  },
  {
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => router.get(route('admin.departments.edit', row.original.slug))}>
          <EditIcon />
        </Button>

        <AdminDepartmentDelete slug={row.original.slug} />
      </div>
    ),
  },
]

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    routeName: 'vendor.products.index',
  },
]

interface IProps {
  products: IVendorProduct[]
}

export default function VendorProductIndex(props: IProps) {
  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Products</h1>
          <Button onClick={() => router.get(route('vendor.products.create'))}>
            <PlusIcon />
            <span>Create new product</span>
          </Button>
        </div>

        <div className="mt-8">
          <DataTable columns={columns} data={props.products} />
        </div>
      </section>
    </VendorLayout>
  )
}
