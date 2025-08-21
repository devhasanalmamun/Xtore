import { router } from '@inertiajs/react'

import { Button } from '@/components/ui/button'
import { PaginationMeta } from '@/types'
import { cn } from '@/lib/utils'

interface IPaginationProps {
  meta: PaginationMeta
}

export default function Pagination(props: IPaginationProps) {
  const selectedRows = props.meta.next_page_url ? props.meta.per_page : props.meta.total - props.meta.per_page

  return (
    <div className="flex items-center justify-end space-x-2 px-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {props.meta.total} of {selectedRows} row(s) selected.
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!props.meta.prev_page_url}
          onClick={() => props.meta.prev_page_url && router.get(props.meta.prev_page_url)}
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
          disabled={!props.meta.next_page_url}
          onClick={() => props.meta.next_page_url && router.get(props.meta.next_page_url)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
