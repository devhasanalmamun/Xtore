import { Link } from '@inertiajs/react'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { type NavItem } from '@/types'

export function NavMain({ items = [] }: { items: NavItem[] }) {
  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarMenu>
        {items.map((item) => {
          const hasSubMenu = item.items && item.items.length > 0
          const isActive = hasSubMenu
            ? item.items?.some((sub) => route().current(`${sub.baseRoute}*`))
            : route().current(`${item.baseRoute}*`)

          if (!hasSubMenu) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: item.title }}>
                  <Link href={route(item.routeName ?? '')} prefetch>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          if (hasSubMenu) {
            return (
              <Collapsible key={item.title} defaultOpen={isActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={isActive} tooltip={{ children: item.title }}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((sub) => (
                        <SidebarMenuItem key={sub.title}>
                          <SidebarMenuSubButton asChild isActive={route().current(`${sub.baseRoute}*`)}>
                            <Link href={route(sub.routeName ?? '')} prefetch>
                              {sub.icon && <sub.icon />}
                              <span>{sub.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
