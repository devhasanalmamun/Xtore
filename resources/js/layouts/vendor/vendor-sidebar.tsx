import { LayoutGridIcon, PackageIcon } from 'lucide-react'
import { Link } from '@inertiajs/react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import AppLogo from '@/components/app-logo'
import { NavItem } from '@/types'

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    baseRoute: 'vendor.dashboard.',
    routeName: 'vendor.dashboard.index',
    icon: LayoutGridIcon,
  },
  {
    title: 'Products',
    baseRoute: 'vendor.products.',
    routeName: 'vendor.products.index',
    icon: PackageIcon,
  },
]

export default function VendorSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="mb-6 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={route('vendor.dashboard.index')} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
