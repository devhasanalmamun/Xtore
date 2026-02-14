import { useForm, router } from '@inertiajs/react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ISupportTicketCategory } from '@/types/landing-support-ticket'
import LandingsLayout from '@/layouts/landings/landings-layout'
import UserRoleEnum from '@/enums/user-role-enums'
import Textarea from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Auth } from '@/types'

interface IProps {
  support_ticket_categories: ISupportTicketCategory[]
  auth: Auth
}

export default function ContactUsIndex(props: IProps) {
  const { data, setData } = useForm({
    full_name: '',
    email: '',
    ticket_category: undefined as number | undefined,
    message: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!props.auth.user) {
      router.visit('/login')
      return
    }
    console.log(data)
    // TODO: wire to contact form submission endpoint
  }

  return (
    <LandingsLayout title="Contact Us" description="Get in touch with the Xtore team.">
      {/* Page Title */}
      <div className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="font-mono text-2xl font-semibold text-gray-800 lg:text-3xl">Contact Us</h1>
        </div>
      </div>

      {/* Intro Section */}
      <section className="relative bg-gray-100 px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-8">
          <h2 className="font-mono text-2xl font-semibold text-gray-800">Get in Touch</h2>
          <p className="text-base text-gray-700">
            Have a question, feedback, or need help? Send us a message and we will get back to you as soon as we can.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      {props.auth.user?.role !== UserRoleEnum.ADMIN && (
        <section className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-6 font-mono text-2xl font-semibold text-gray-800">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-800">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={data.full_name}
                    onChange={(e) => setData('full_name', e.target.value)}
                    className="border-gray-300 text-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-800">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="border-gray-300 text-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-800">
                    Subject
                  </Label>
                  <Select onValueChange={(value) => setData('ticket_category', Number(value))}>
                    <SelectTrigger className="border-gray-300 text-gray-800">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {props.support_ticket_categories.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-800">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    rows={5}
                    className="border-gray-300 text-gray-800"
                  />
                </div>
                <Button type="submit" className="mt-4 font-medium">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Contact Info */}
      <section className="relative bg-gray-100 px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
          <h2 className="font-mono text-2xl font-semibold text-gray-800">Other Ways to Reach Us</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 font-mono text-base font-semibold text-gray-800">Support</h3>
              <p className="text-sm text-gray-600">
                For order and product support, use the form above or check the help section in your account.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 font-mono text-base font-semibold text-gray-800">Response Time</h3>
              <p className="text-sm text-gray-600">
                We aim to respond within 24–48 hours on business days. For urgent orders, please refer to your order
                confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LandingsLayout>
  )
}
