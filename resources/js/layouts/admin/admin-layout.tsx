import React from 'react'

import { AppSidebarHeader } from '@/components/app-sidebar-header'
import AdminSidebar from '@/layouts/admin/partials/admin-sidebar'
import { AppContent } from '@/components/app-content'
import { AppShell } from '@/components/app-shell'
import { BreadcrumbItem } from '@/types'

interface AppLayoutProps {
  children?: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export default function AdminLayout(props: AppLayoutProps) {
  return (
    <AppShell variant="sidebar">
      <AdminSidebar />

      <AppContent variant="sidebar">
        <AppSidebarHeader breadcrumbs={props.breadcrumbs} />
        {props.children}
      </AppContent>
    </AppShell>
  )
}
