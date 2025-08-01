import { useState } from 'react'

import LandingsLayout from '@/layouts/landings/landings-layout'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function ContactUsIndex() {
  const [email, setEmail] = useState('')

  return (
    <LandingsLayout title="Contact Us" description="This is the contact us page">
      <section className="">
        <form>
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="type your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </form>
      </section>
    </LandingsLayout>
  )
}
