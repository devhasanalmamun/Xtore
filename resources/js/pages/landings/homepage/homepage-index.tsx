import LandingsLayout from '@/layouts/landings/landings-layout'
import Hero from '@/pages/landings/homepage/sections/hero'
import CardCategory from '@/components/card/card-category'
import { Button } from '@/components/ui/button'

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
      <section className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl bg-gray-100 px-4 py-8">
          <div className="mb-4">
            <h2 className="font-mono text-2xl font-semibold">Top Categories</h2>
          </div>

          <div className="grid grid-cols-8 items-center gap-2">
            {props.categories.map((category) => {
              return <CardCategory key={category.slug} url="" name={category.name} />
            })}
          </div>

          <Button className="mx-auto mt-4 block justify-center px-16 font-medium" variant="outline">
            View all categories
          </Button>
        </div>
      </section>
      {/* TODO: Top sold products */}
      {/* TODO: Top Vendors */}
      {/* TODO: Recommended Product Based on Browsing History: Daraz */}
    </LandingsLayout>
  )
}
