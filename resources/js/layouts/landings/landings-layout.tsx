import { type PropsWithChildren } from 'react'
import { Head } from '@inertiajs/react'

import LandingHeader from '@/layouts/landings/partials/landings-header'

interface ILandingLayoutProps {
  title?: string
  description?: string
}

export default function LandingsLayout({ children, ...props }: PropsWithChildren<ILandingLayoutProps>) {
  return (
    <>
      <Head title={props.title}>
        <meta name="description" content={props.description} />
      </Head>

      <section className="border-b border-gray-200 text-gray-800">
        {/* Offers */}
        <p className="border-b border-gray-300 bg-primary p-0.5 text-center text-sm font-medium">
          Get <b>free delivery</b> on orders over $350
        </p>

        <div className="px-4 py-2 sm:px-6 lg:px-8 lg:py-4">
          <LandingHeader />
        </div>
      </section>

      <main>{children}</main>

      <footer>This is the footer content.</footer>
    </>
  )
}
