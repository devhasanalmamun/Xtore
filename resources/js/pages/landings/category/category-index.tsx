import { ILandingCategoryIndex } from '@/types/landing-category-index'
import LandingsLayout from '@/layouts/landings/landings-layout'
import CardCategory from '@/components/card/card-category'

interface IProps {
  categories: ILandingCategoryIndex[]
}
export default function CategoryIndex(props: IProps) {
  return (
    <LandingsLayout title="Categories" description="This is the categories page">
      <section className="relative px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-6">
          <div className="col-span-1 border-r">
            <p className="mb-2.5 text-lg font-semibold">All Categories</p>
            <ul className="ml-1 space-y-2">
              {props.categories.map((category) => (
                <p>{category.name}</p>
              ))}
            </ul>
          </div>
          <div className="col-span-5">
            <h1 className="mb-8 text-center font-mono text-4xl font-semibold">Shop By All Categories</h1>

            <div className="grid grid-cols-6 gap-2.5 px-4">
              {props.categories.map((category) => (
                <CardCategory category={category} className="border" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </LandingsLayout>
  )
}
