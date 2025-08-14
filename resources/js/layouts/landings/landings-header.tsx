import { ChevronDownIcon, SearchIcon, ShoppingCartIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { Link, router, usePage } from '@inertiajs/react'
import { useState } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AppearanceToggleDropdown from '@/components/appearance-dropdown'
import { UserMenuContent } from '@/components/user-menu-content'
import { useInitials } from '@/hooks/use-initials'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { SharedData } from '@/types'

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']

export default function LandingHeader() {
  const page = usePage<SharedData>()
  const { auth } = page.props
  const getInitials = useInitials()
  const [open, setOpen] = useState(false)

  console.log('LandingHeader', { auth })

  return (
    <>
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="mr-2 flex items-center gap-4">
          <Link href={route('home')} className="shrink-0 text-xl font-bold lg:text-2xl">
            <img src="/assets/images/logo.png" loading="lazy" className="h-8 w-auto lg:h-9" alt="Logo" />
          </Link>

          <SearchIcon className="mt-1 size-5 shrink-0 md:hidden" />
        </div>

        <div className="relative hidden w-full md:block md:max-w-sm lg:max-w-md xl:max-w-lg">
          <Input type="text" placeholder="Search products" className="p-2 pr-9" />
          <SearchIcon className="absolute top-2.5 right-3 size-4 cursor-pointer font-bold text-primary/80 hover:text-primary" />
        </div>

        <div className="flex items-center lg:ml-8">
          <div className="flex items-center">
            <AppearanceToggleDropdown />

            <Button variant="ghost" onClick={() => setOpen(true)} className="mr-2 sm:mr-6">
              <SlidersHorizontalIcon aria-hidden="true" className="size-5" />
            </Button>

            {!auth.user && (
              <div className="hidden items-center space-x-2 lg:flex">
                <Button onClick={() => router.get(route('register'))}>Register</Button>
                <Button onClick={() => router.get(route('login'))} variant="secondary">
                  Login
                </Button>
              </div>
            )}
          </div>

          {auth.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-10 rounded-full p-1">
                  <Avatar>
                    <AvatarImage src={auth.user?.avatar} alt={auth.user?.first_name} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {getInitials(auth.user?.first_name, auth.user?.last_name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <UserMenuContent user={auth.user} />
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <span aria-hidden="true" className="mx-2 h-6 w-px bg-gray-400 lg:mx-3" />

          <a href="#" className="relative flex items-center p-2">
            <ShoppingCartIcon aria-hidden="true" className="size-6 shrink-0 text-gray-700 hover:text-gray-800" />
            <Badge className="absolute top-0 right-0 rounded-full px-1 py-0 text-[10px] font-bold">0</Badge>
          </a>
        </div>
      </nav>

      {/* Mobile menu slider*/}
      <Dialog open={open} onClose={setOpen} className="relative z-40">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <a href="#page1" className="-m-2 block p-2 font-medium text-gray-900">
                Page 2
              </a>
              <a href="#page1" className="-m-2 block p-2 font-medium text-gray-900">
                Page 2
              </a>
            </div>

            {!auth.user && (
              <div className="flex flex-col space-y-2 border-t border-gray-200 px-4 py-6 lg:hidden">
                <Button onClick={() => router.get(route('register'))}>Create an account</Button>
                <Button onClick={() => router.get(route('login'))} variant="secondary">
                  Sign in
                </Button>
              </div>
            )}

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {/* Currency selector */}
              <form>
                <div className="-ml-2 inline-grid grid-cols-1">
                  <select
                    id="mobile-currency"
                    name="currency"
                    aria-label="Currency"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-0.5 pr-7 pl-2 text-base font-medium text-gray-700 group-hover:text-gray-800 focus:outline-2 sm:text-sm/6"
                  >
                    {currencies.map((currency) => (
                      <option key={currency}>{currency}</option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end fill-gray-500"
                  />
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
