import { type PropsWithChildren } from 'react'

import { AppSidebarHeader } from '@/components/app-sidebar-header'
import { AppContent } from '@/components/app-content'
import { AppSidebar } from '@/components/app-sidebar'
import { AppShell } from '@/components/app-shell'
import { type BreadcrumbItem } from '@/types'

export default function AppSidebarLayout({
  children,
  breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </AppShell>
  )
}
