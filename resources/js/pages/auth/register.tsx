import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import React, { FormEventHandler } from 'react'

import LandingsLayout from '@/layouts/landings/landings-layout'
import InputError from '@/components/ui/input-error'
import { Button } from '@/components/ui/button'
import TextLink from '@/components/text-link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type RegisterForm = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  return (
    <>
      <Head title="Register" />
      <section className="mx-4 my-16 max-w-7xl xl:mx-auto">
        <div className="rounded-lg md:grid md:grid-cols-2 md:items-center md:bg-gray-50">
          <img className="hidden h-180 w-full object-cover md:block" srcSet="/assets/images/auth.png" alt="auth" />
          <form className="flex flex-col gap-6 bg-gray-50 p-6 md:bg-transparent" onSubmit={submit}>
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-2xl font-semibold text-primary capitalize sm:text-3xl lg:text-4xl xl:text-5xl">
                Join us!!
              </h2>
              <img className="h-12 object-cover md:h-20" srcSet="/assets/gifs/icon-lord-wow.gif" alt="smile" />
            </div>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  type="text"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="first_name"
                  value={data.first_name}
                  onChange={(e) => setData('first_name', e.target.value)}
                  disabled={processing}
                  placeholder="First name"
                />
                <InputError message={errors.first_name} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  type="text"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="last_name"
                  value={data.last_name}
                  onChange={(e) => setData('last_name', e.target.value)}
                  disabled={processing}
                  placeholder="Last name"
                />
                <InputError message={errors.last_name} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  disabled={processing}
                  placeholder="email@example.com"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  tabIndex={3}
                  autoComplete="new-password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  disabled={processing}
                  placeholder="Password"
                />
                <InputError message={errors.password} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  required
                  tabIndex={4}
                  autoComplete="new-password"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  disabled={processing}
                  placeholder="Confirm password"
                />
                <InputError message={errors.password_confirmation} />
              </div>

              <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Create account
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?
              <TextLink href={route('login')} tabIndex={6}>
                Log in
              </TextLink>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

Register.layout = (page: React.ReactNode) => (
  <LandingsLayout title="Create an account" description="Enter your details below to create your account">
    {page}
  </LandingsLayout>
)
