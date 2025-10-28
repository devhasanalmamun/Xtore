import CardVendor from '@/components/card/card-vendor'
import { ICategory } from '@/types/landing-home'
import { Button } from '@/components/ui/button'

interface IProps {
  categories: ICategory[]
}

export default function HomepageVendorsSection(props: IProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-4 bg-gray-100 px-4 py-8">
      <h2 className="font-mono text-2xl font-semibold">Top Vendors</h2>

      <div className="grid grid-cols-8 items-center gap-2">
        {props.categories.map((category) => {
          return <CardVendor key={category.slug} category={category} />
        })}
      </div>

      <Button className="mx-auto block justify-center px-16 font-medium" variant="outline">
        View all vendors
      </Button>
    </div>
  )
}
