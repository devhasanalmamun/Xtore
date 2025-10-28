import { CheckCircleIcon, CircleXIcon, EditIcon, MoveRightIcon, PlusIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { router } from '@inertiajs/react'

import AdminCategoryDelete from '@/pages/admin/category/admin-category-delete'
import { BreadcrumbItem, PaginationLinks, PaginationMeta } from '@/types'
import { DataTable } from '@/components/ui/data-table'
import AdminLayout from '@/layouts/admin/admin-layout'
import { IAdminBanner } from '@/types/admin-banner'
import Pagination from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

const columns: ColumnDef<IAdminBanner>[] = [
  {
    header: 'Image',
    cell: ({ row }) => <img className="h-12 w-36 object-cover" src={row.original.image} alt={row.original.title} />,
  },
  {
    header: 'Location',
    cell: ({ row }) => (
      <p className="flex items-center gap-1">
        {row.original.page}
        <MoveRightIcon />
        {row.original.section}
      </p>
    ),
  },
  {
    header: 'Created At',
    accessorKey: 'created_at',
  },
  {
    header: 'Active',
    cell: ({ row }) =>
      row.original.active ? <CheckCircleIcon className="text-primary" /> : <CircleXIcon className="text-red-500" />,
  },

  {
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => router.get(route('admin.banners.edit', row.original.slug))}>
          <EditIcon />
        </Button>
        <AdminCategoryDelete slug={row.original.slug} />
      </div>
    ),
  },
]

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Banners',
    routeName: 'admin.banner.index',
  },
]

interface IProps {
  banners: {
    data: IAdminBanner[]
    meta: PaginationMeta
    links: PaginationLinks
  }
}

export default function AdminBannerIndex(props: IProps) {
  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <section className="px-4 py-8 md:px-4 md:py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">All Banners</h1>
          <Button onClick={() => router.get(route('admin.banners.create'))}>
            <PlusIcon />
            <span>Create new banner</span>
          </Button>
        </div>

        <div className="mt-8">
          <DataTable columns={columns} data={props.banners.data} />
          <Pagination
            meta={props.banners.meta}
            pagination_links={props.banners.links}
            totalRows={props.banners.data.length}
          />
        </div>
      </section>
    </AdminLayout>
  )
}
