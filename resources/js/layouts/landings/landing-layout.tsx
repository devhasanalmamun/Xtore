import { Head } from '@inertiajs/react'
import { type PropsWithChildren } from 'react'

import { AppHeader } from '@/components/app-header'
import LandingHeader from '@/layouts/landings/partials/landing-header'

interface ILandingLayoutProps {
  title?: string
  description?: string
}

export default function LandingLayout({ children, ...props }: PropsWithChildren<ILandingLayoutProps>) {
  return (
    <>
      <Head title={props.title}>
        <meta name="description" content={props.description} />
      </Head>

      <AppHeader />
      <LandingHeader />
      <main>{children}</main>
      <footer>This is the footer content.</footer>
    </>
  )
}
