import { Link } from '@inertiajs/react'

import LandingsLayout from '@/layouts/landings/landings-layout'

export default function AboutUsIndex() {
  return (
    <LandingsLayout title="About Us" description="Learn more about Xtore and our mission.">
      {/* Page Title */}
      <div className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="font-mono text-2xl font-semibold text-gray-800 lg:text-3xl">About Us</h1>
        </div>
      </div>

      {/* Intro Section */}
      <section className="relative bg-gray-100 px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-8">
          <h2 className="font-mono text-2xl font-semibold text-gray-800">Who We Are</h2>
          <p className="text-base text-gray-700">
            Xtore is your trusted destination for quality products and a seamless shopping experience. We are committed
            to bringing you the best selection, competitive prices, and reliable service.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-8">
          <h2 className="font-mono text-2xl font-semibold text-gray-800">Our Story</h2>
          <p className="text-base text-gray-700">
            Founded with a simple goal in mind, we set out to create an online store that puts customers first. Over the
            years, we have grown our catalog and our team while staying true to our values of quality, transparency, and
            trust.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="relative bg-gray-100 px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-8">
          <h2 className="font-mono text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-base text-gray-700">
            We aim to make online shopping straightforward and enjoyable. From curated categories to flash sales and
            reliable delivery, every part of our platform is designed with you in mind.
          </p>
        </div>
      </section>

      {/* Values / Why Choose Us */}
      <section className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
          <h2 className="font-mono text-2xl font-semibold text-gray-800">Why Choose Xtore</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 font-mono text-base font-semibold text-gray-800">Quality Products</h3>
              <p className="text-sm text-gray-600">
                We partner with trusted vendors to offer a wide range of quality products at competitive prices.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 font-mono text-base font-semibold text-gray-800">Fast Delivery</h3>
              <p className="text-sm text-gray-600">
                Free delivery on orders over $350 and reliable shipping so you get your orders when you need them.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:col-span-2 lg:col-span-1">
              <h3 className="mb-2 font-mono text-base font-semibold text-gray-800">Customer First</h3>
              <p className="text-sm text-gray-600">
                Our support team is here to help. We are committed to your satisfaction from browse to delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gray-100 px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
            <p className="text-base text-gray-700">Have questions or want to get in touch?</p>
            <Link
              href={route('contact-us.index')}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </LandingsLayout>
  )
}
