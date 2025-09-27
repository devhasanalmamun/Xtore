import { fill } from '@cloudinary/url-gen/actions/resize'
import { ColumnDef } from '@tanstack/react-table'
import { EditIcon, PlusIcon } from 'lucide-react'
import { Cloudinary } from '@cloudinary/url-gen'
import { router } from '@inertiajs/react'
import { useMemo } from 'react'

import VendorProductDelete from '@/pages/vendor/product/vendor-product-delete'
import { BreadcrumbItem, PaginationLinks, PaginationMeta } from '@/types'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { IVendorProduct } from '@/types/vendor-product'
import { DataTable } from '@/components/ui/data-table'
import Pagination from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    routeName: 'vendor.products.index',
  },
]

interface IProps {
  products: {
    data: IVendorProduct[]
    meta: PaginationMeta
    links: PaginationLinks
  }
}

export default function VendorProductIndex(props: IProps) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dpxzczlob',
    },
  })

  const columns = useMemo<ColumnDef<IVendorProduct>[]>(
    () => [
      {
        header: 'Thumbnail',
        accessorKey: 'thumbnail_url',
        cell: ({ row }) => {
          const publicId = row.original.thumbnail_image?.public_id || row.original.thumbnail_image?.secure_url
          const small = row.original.thumbnail_image?.public_id
            ? cld.image(publicId).resize(fill().width(200).height(200)).toURL()
            : publicId

          return <img className="h-14 w-40 rounded object-cover" src={small} alt={row.original.title} />
        },
      },
      {
        header: 'Title',
        accessorKey: 'title',
        cell: ({ row }) => String(row.getValue('title')).slice(0, 20) + ' ...',
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
        cell: ({ row }) => {
          const status: string = row.getValue('status')
          return <p className={cn(status === 'Published' && 'text-primary')}>{status}</p>
        },
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
            <Button variant="outline" onClick={() => router.get(route('vendor.products.edit', row.original.slug))}>
              <EditIcon />
            </Button>

            <VendorProductDelete slug={row.original.slug} />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

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
          <DataTable columns={columns} data={props.products.data} />
          <Pagination
            meta={props.products.meta}
            pagination_links={props.products.links}
            totalRows={props.products.data.length}
          />
        </div>
      </section>
    </VendorLayout>
  )
}
