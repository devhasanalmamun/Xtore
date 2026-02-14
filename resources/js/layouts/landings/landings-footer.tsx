import { Link } from '@inertiajs/react'
import React from 'react'

import InstagramIcon from '@/components/icons/instagram-icon'
import FacebookIcon from '@/components/icons/facebook-icon'
import LinkedinIcon from '@/components/icons/linkedin-icon'

const socials = [
  {
    id: 1,
    icon: FacebookIcon,
    href: 'https://www.facebook.com/optionalchaining/',
  },
  {
    id: 2,
    icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/nullishcoalesce/',
  },
  {
    id: 3,
    icon: InstagramIcon,
    href: 'https://www.instagram.com/yourhasan1/',
  },
]

export default function LandingsFooter() {
  return (
    <footer className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:flex lg:items-center">
          <Link href={route('home')}>
            <img src="/assets/images/logo.png" alt="logo" className="w-48" />
          </Link>
        </div>

        <div className="lg:flex lg:items-center">
          <ul className="flex space-x-4">
            {socials.map((social) => (
              <li key={social.id}>
                <Link href={social.href} target="_blank">
                  {React.createElement(social.icon)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-base text-white">Useful links</h4>
          <ul className="space-y-4">
            <li>
              <a href="javascript:void(0)" className="text-sm text-slate-400 hover:text-white">
                Featured
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-sm text-slate-400 hover:text-white">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-sm text-slate-400 hover:text-white">
                New Arrivals
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-base text-white">Information</h4>
          <ul className="space-y-4">
            <li>
              <Link href={route('about-us.index')} className="text-sm text-slate-400 hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-sm text-slate-400 hover:text-white">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-sm text-slate-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-sm text-slate-400 hover:text-white">
                Sale
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-sm text-slate-400 hover:text-white">
                Documentation
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-10 text-sm text-slate-400">© Xtore. All rights reserved.</p>
    </footer>
  )
}
