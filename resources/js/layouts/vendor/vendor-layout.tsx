import React from 'react'

import { AppSidebarHeader } from '@/components/app-sidebar-header'
import VendorSidebar from '@/layouts/vendor/vendor-sidebar'
import { AppContent } from '@/components/app-content'
import { AppShell } from '@/components/app-shell'
import { BreadcrumbItem } from '@/types'

interface AppLayoutProps {
  children?: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export default function VendorLayout(props: AppLayoutProps) {
  return (
    <AppShell variant="sidebar">
      <VendorSidebar />

      <AppContent variant="sidebar">
        <AppSidebarHeader breadcrumbs={props.breadcrumbs} />
        {props.children}
      </AppContent>
    </AppShell>
  )
}
