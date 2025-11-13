import { Link, usePage } from '@inertiajs/react'
import { ReactNode } from 'react'

import { SharedData, type NavItem, BreadcrumbItem } from '@/types'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import AdminLayout from '@/layouts/admin/admin-layout'
import { Separator } from '@/components/ui/separator'
import UserRoleEnum from '@/enums/user-role-enums'
import { Button } from '@/components/ui/button'
import Heading from '@/components/heading'
import { cn } from '@/lib/utils'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Profile',
    baseRoute: 'profile.',
    routeName: 'profile.edit',
  },
  {
    title: 'Password',
    baseRoute: 'password.',
    routeName: 'password.edit',
  },
  {
    title: 'Appearance',
    baseRoute: 'appearance.',
    routeName: 'appearance',
  },
]

interface IProps {
  breadcrumbs?: BreadcrumbItem[]
  children: ReactNode
}

export default function SettingsLayout(props: IProps) {
  const { auth } = usePage<SharedData>().props

  if (typeof window === 'undefined') {
    return null
  }
  const currentPath = window.location.pathname

  const Layout = auth.user.role === UserRoleEnum.ADMIN ? AdminLayout : VendorLayout

  return (
    <Layout breadcrumbs={props.breadcrumbs}>
      <div className="px-4 py-6">
        <Heading title="Settings" description="Manage your profile and account settings" />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="w-full max-w-xl lg:w-48">
            <nav className="flex flex-col space-y-1 space-x-0">
              {sidebarNavItems.map((item, index) => (
                <Button
                  key={`${item.routeName}-${index}`}
                  size="sm"
                  variant="ghost"
                  asChild
                  className={cn(
                    'w-full justify-start',
                    currentPath.startsWith(new URL(route(item.routeName)).pathname) && 'bg-muted',
                  )}
                >
                  <Link href={route(item.routeName)} prefetch>
                    {item.title}
                  </Link>
                </Button>
              ))}
            </nav>
          </aside>

          <Separator className="my-6 md:hidden" />

          <div className="flex-1 md:max-w-2xl">
            <section className="max-w-xl space-y-12">{props.children}</section>
          </div>
        </div>
      </div>
    </Layout>
  )
}
