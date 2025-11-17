import { Head } from '@inertiajs/react'

import SettingsLayout from '@/layouts/settings/SettingsLayout'
import AppearanceTabs from '@/components/appearance-tabs'
import HeadingSmall from '@/components/heading-small'
import { type BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Settings',
    routeName: 'profile.edit',
  },
  {
    title: 'Appearance',
    routeName: 'appearance',
  },
]

export default function Appearance() {
  return (
    <SettingsLayout breadcrumbs={breadcrumbs}>
      <Head title="Appearance settings" />
      <div className="space-y-6">
        <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
        <AppearanceTabs />
      </div>
    </SettingsLayout>
  )
}
