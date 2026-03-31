import { type BreadcrumbItem as BreadcrumbItemType } from '@/types'
import AppNotification from '@/components/app-notification'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Breadcrumbs } from '@/components/breadcrumbs'

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  return (
    <header className="fixed top-0 left-0 z-[10] flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 bg-white px-6 transition-[left,width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:left-(--sidebar-width-icon) group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 group-has-data-[collapsible=icon]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width-icon))] group-has-data-[state=expanded]/sidebar-wrapper:left-(--sidebar-width) group-has-data-[state=expanded]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width))] md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <AppNotification />
    </header>
  )
}
