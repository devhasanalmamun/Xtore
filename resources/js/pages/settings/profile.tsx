import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { Transition } from '@headlessui/react'
import { FormEventHandler } from 'react'

import { type BreadcrumbItem, type SharedData } from '@/types'
import SettingsLayout from '@/layouts/settings/SettingsLayout'
import HeadingSmall from '@/components/heading-small'
import InputError from '@/components/ui/input-error'
import DeleteUser from '@/components/delete-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Settings',
    routeName: 'profile.edit',
  },
  {
    title: 'Profile',
    routeName: 'profile.edit',
  },
]

interface IProps {
  mustVerifyEmail: boolean
  status?: string
}

export default function Profile(props: IProps) {
  const { auth } = usePage<SharedData>().props

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    first_name: auth.user.first_name,
    last_name: auth.user.last_name,
    email: auth.user.email,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route('profile.update'), {
      preserveScroll: true,
    })
  }

  return (
    <SettingsLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />
      <div className="space-y-6">
        <HeadingSmall title="Profile information" description="Update your name and email address" />

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              value={data.first_name}
              onChange={(e) => setData('first_name', e.target.value)}
              required
              placeholder="First Name"
            />
            <InputError message={errors.first_name} />
          </div>

          <div>
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              value={data.last_name}
              onChange={(e) => setData('last_name', e.target.value)}
              required
              placeholder="Last Name"
            />
            <InputError message={errors.last_name} />
          </div>

          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
              autoComplete="email"
              placeholder="Email address"
            />
            <InputError className="mt-2" message={errors.email} />
          </div>

          {props.mustVerifyEmail && auth.user.email_verified_at === null && (
            <div>
              <p className="-mt-4 text-sm text-muted-foreground">
                Your email address is unverified.{' '}
                <Link
                  href={route('verification.send')}
                  method="post"
                  as="button"
                  className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                >
                  Click here to resend the verification email.
                </Link>
              </p>

              {props.status === 'verification-link-sent' && (
                <div className="mt-2 text-sm font-medium text-green-600">
                  A new verification link has been sent to your email address.
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-4">
            <Button className="px-10" disabled={processing}>
              Save
            </Button>

            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-neutral-600">Saved</p>
            </Transition>
          </div>
        </form>
      </div>

      <DeleteUser />
    </SettingsLayout>
  )
}
