import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

const SKELETON_COUNT = 5

export default function DashboardNotificationsSkeleton() {
  return (
    <>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div key={index} className="overflow-x-hidden">
          <div className="flex items-start gap-3 px-4 py-3">
            {/* Avatar */}
            <Skeleton className="mt-0.5 h-10 w-10 shrink-0 rounded-full" />

            {/* Text lines */}
            <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3 w-1/3 rounded" />
            </div>

            {/* Unread dot placeholder — alternate to add visual variety */}
            {index % 2 === 0 && <Skeleton className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full" />}
          </div>
          {index < SKELETON_COUNT - 1 && <Separator className="mx-4 opacity-50" />}
        </div>
      ))}
    </>
  )
}
