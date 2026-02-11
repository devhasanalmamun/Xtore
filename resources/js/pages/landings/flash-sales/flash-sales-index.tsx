import { SlidersHorizontalIcon } from 'lucide-react'
import { useState } from 'react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ILandingCategory, ILandingProductOverview } from '@/types/landing-home'
import CardProductSale from '@/components/card/card-product-sale'
import LandingsLayout from '@/layouts/landings/landings-layout'
import ProductFilter from '@/components/ui/product-filter'
import { Button } from '@/components/ui/button'

const sortByOptions = [
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'discount', label: 'Highest Discount' },
]

interface IProps {
  products: ILandingProductOverview[]
  categories: ILandingCategory[]
}

export default function FlashSalesIndex(props: IProps) {
  const [sortBy, setSortBy] = useState('')

  return (
    <LandingsLayout title="Flash Sales" description="This is the flash sales page">
      {/* Page Title & Active Filters */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-8">
        <h1 className="font-mono text-2xl font-semibold lg:text-3xl">Flash Sales</h1>

        {/* Sort & Filter Controls */}
        <div className="flex items-center gap-2.5">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-30 shadow-none sm:w-45">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortByOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" className="gap-2">
                <SlidersHorizontalIcon className="h-4 w-4" />
                <span className="hidden lg:block">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search with filters below</SheetDescription>
              </SheetHeader>
              <ProductFilter categories={props.categories} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Products */}
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-4 px-4 py-8">
        {props.products.map((product) => (
          <CardProductSale key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-8">Pagination</div>
    </LandingsLayout>
  )
}
