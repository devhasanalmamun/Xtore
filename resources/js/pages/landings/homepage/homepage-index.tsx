import LandingsLayout from '@/layouts/landings/landings-layout'
import Hero from '@/pages/landings/homepage/sections/hero'

interface IHeroImage {
  image: string
  title: string
}

interface ICategory {
  name: string
  slug: string
}

interface IProps {
  banner_hero_images: IHeroImage[]
  categories: ICategory[]
}

export default function HomepageIndex(props: IProps) {
  return (
    <LandingsLayout title="Welcome to Our Site" description="This is the welcome page.">
      <section className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <Hero hero_images={props.banner_hero_images} />
      </section>

      {/* TODO: Flash Sale Ref: Daraz*/}
      {/* TODO: Categories: Daraz*/}
      {/* TODO: Top sold products */}
      {/* TODO: Top Vendors */}
      {/* TODO: Recommended Product Based on Browsing History: Daraz */}
    </LandingsLayout>
  )
}
