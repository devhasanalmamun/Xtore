import { Link } from '@inertiajs/react'

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { type NavItem } from '@/types'

export function NavMain({ items = [] }: { items: NavItem[] }) {
  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={route().current(item.routeName)} tooltip={{ children: item.title }}>
              <Link href={route(item.routeName)} prefetch>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
