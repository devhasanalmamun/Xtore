import { router } from '@inertiajs/react'

import CardProductSale from '@/components/card/card-product-sale'
import { ILandingProductIndex } from '@/types/landing-product'
import { Button } from '@/components/ui/button'

interface IProps {
  products: ILandingProductIndex[]
}

export default function HomepageFlashSale(props: IProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-4 bg-gray-100 px-4 py-8">
      <h2 className="font-mono text-2xl font-semibold">Flash Sales</h2>
      <div className="mx-auto max-w-xs space-y-4 overflow-hidden sm:grid sm:max-w-7xl sm:grid-cols-3 sm:gap-2.5 sm:space-y-0 md:grid-cols-4 xl:grid-cols-4">
        {props.products.map((product, index) => (
          <CardProductSale key={index} product={product} />
        ))}
      </div>

      <Button
        className="mx-auto block justify-center px-16 font-medium"
        variant="outline"
        onClick={() => router.get(route('categories.index'))}
      >
        View all flash sales
      </Button>
    </div>
  )
}
