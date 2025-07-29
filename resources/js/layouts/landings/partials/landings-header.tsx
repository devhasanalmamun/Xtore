import { ChevronDownIcon, SearchIcon, ShoppingCartIcon, SlidersHorizontalIcon, UserIcon, XIcon } from 'lucide-react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import { useState } from 'react'

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']

export default function LandingHeader() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto max-w-7xl">
      {/* Mobile menu slider*/}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
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

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Create an account
                </a>
              </div>
              <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Sign in
                </a>
              </div>
            </div>

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

      {/* Menu and Full nav lg+ */}
      <nav className="flex items-center justify-between">
        <Link href={route('home')} className="text-xl font-bold lg:text-2xl">
          Xtore
        </Link>

        {/* Mobile menu and search (lg-) */}
        <div className="flex flex-1 items-center lg:hidden">
          <a href="#" className="ml-4 p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Search</span>
            <SearchIcon aria-hidden="true" className="size-6" />
          </a>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center lg:ml-8">
            <div className="flex items-center space-x-8">
              <div className="hidden lg:flex">
                <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <SearchIcon aria-hidden="true" className="size-6" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="sr-only">Open menu</span>
                <SlidersHorizontalIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="flex">
                <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Account</span>
                  <UserIcon aria-hidden="true" className="size-6" />
                </a>
              </div>
            </div>

            <span aria-hidden="true" className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" />

            <div>
              <a href="#" className="group -m-2 flex items-center p-2">
                <ShoppingCartIcon
                  aria-hidden="true"
                  className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                <span className="sr-only">items in cart, view bag</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
