import { router } from '@inertiajs/react'

import CardCategory from '@/components/card/card-category'
import { ICategory } from '@/types/landing-home'
import { Button } from '@/components/ui/button'

interface IProps {
  categories: ICategory[]
}

export default function HomepageCategoriesSection(props: IProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-4 bg-gray-100 px-4 py-8">
      <h2 className="font-mono text-2xl font-semibold">Top Categories</h2>

      <div className="grid grid-cols-8 items-center gap-2">
        {props.categories.map((category) => {
          return <CardCategory key={category.slug} category={category} />
        })}
      </div>

      <Button
        className="mx-auto block justify-center px-16 font-medium"
        variant="outline"
        onClick={() => router.get(route('categories.index'))}
      >
        View all categories
      </Button>
    </div>
  )
}
