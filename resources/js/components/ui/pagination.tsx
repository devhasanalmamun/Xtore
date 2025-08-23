import { router } from '@inertiajs/react'

import { PaginationLinks, PaginationMeta } from '@/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface IPaginationProps {
  meta: PaginationMeta
  pagination_links: PaginationLinks
  totalRows: number
}

export default function Pagination(props: IPaginationProps) {
  return (
    <div className="flex items-center justify-end space-x-2 px-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {props.meta.total} of {props.totalRows} row(s) selected.
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!props.pagination_links.prev}
          onClick={() => props.pagination_links.prev && router.get(props.pagination_links.prev)}
        >
          Previous
        </Button>

        <ul className="flex items-center space-x-0.5 text-sm">
          {props.meta.links.slice(1, props.meta.links.length - 1).map((link, i) => {
            return (
              <li
                key={i}
                className={cn('cursor-pointer p-2', link.active && 'text-primary')}
                onClick={() => link.url && router.get(link.url)}
              >
                {link.label}
              </li>
            )
          })}
        </ul>

        <Button
          variant="outline"
          size="sm"
          disabled={!props.pagination_links.next}
          onClick={() => props.pagination_links.next && router.get(props.pagination_links.next)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
