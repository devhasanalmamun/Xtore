import HomepageCategoriesSection from '@/pages/landings/homepage/sections/homepage-categories-section'
import HomepageVendorsSection from '@/pages/landings/homepage/sections/homepage-vendors-section'
import HomepageHeroSection from '@/pages/landings/homepage/sections/homepage-hero-section'
import LandingsLayout from '@/layouts/landings/landings-layout'
import { ICategory, IHeroImage } from '@/types/landing-home'

interface IProps {
  banner_hero_images: IHeroImage[]
  categories: ICategory[]
}

export default function HomepageIndex(props: IProps) {
  return (
    <LandingsLayout title="Welcome to Our Site" description="This is the welcome page.">
      {/* Hero Section */}
      <section className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <HomepageHeroSection hero_images={props.banner_hero_images} />
      </section>

      {/* TODO: Flash Sale Ref: Daraz*/}

      {/* Top Categories Section */}
      <section className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <HomepageCategoriesSection categories={props.categories} />
      </section>

      {/* TODO: Top sold products */}

      {/* TODO: Top Vendors */}
      <section className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <HomepageVendorsSection categories={props.categories} />
      </section>

      {/* TODO: Recommended Product Based on Browsing History: Daraz */}
    </LandingsLayout>
  )
}
