import { BookOpenIcon, LayoutGridIcon, StoreIcon } from 'lucide-react'
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
    baseRoute: 'admin.dashboard.',
    routeName: 'admin.dashboard.index',
    icon: LayoutGridIcon,
  },
  {
    title: 'Departments',
    baseRoute: 'admin.departments.',
    routeName: 'admin.departments.index',
    icon: StoreIcon,
  },
  {
    title: 'Categories',
    baseRoute: 'admin.categories.',
    routeName: 'admin.categories.index',
    icon: BookOpenIcon,
  },
]

export default function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="mb-6 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={route('admin.dashboard.index')} prefetch>
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
