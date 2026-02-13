import { Label } from '@radix-ui/react-label'
import { router } from '@inertiajs/react'
import { XIcon } from 'lucide-react'
import { useState } from 'react'

import { ILandingCategory } from '@/types/landing-home'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { IFilters } from '@/types/filters'

interface IProps {
  categories: ILandingCategory[]
  filters: IFilters
  onClose: (isOpen: boolean) => void
}

const MAX_PRICE = 100000
const MIN_PRICE = 0

export default function ProductFilter(props: IProps) {
  const [filters, setFilters] = useState({
    minPrice: props.filters.minPrice ?? MIN_PRICE,
    maxPrice: props.filters.maxPrice ?? MAX_PRICE,
    categories: props.filters.categories ?? [],
  })

  const handleCategoryToggle = (categoryId: number) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }))
  }

  const clearAllFilters = () => {
    const cleardFilters = {
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
      categories: [],
    }

    setFilters(cleardFilters)

    router.get(
      route('flash-sales.index'),
      {
        minPrice: cleardFilters.minPrice,
        maxPrice: cleardFilters.maxPrice,
        categories: '',
      },
      { preserveState: true, preserveScroll: true, replace: true },
    )
  }

  function handleFilterSubmit(filters: IFilters) {
    router.get(
      route('flash-sales.index'),
      {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        categories: filters.categories?.join(','),
      },
      { preserveState: true, preserveScroll: true, replace: true },
    )
  }

  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div className="space-y-3 px-4">
        <h3 className="text-sm font-semibold">Price Range</h3>
        <div className="flex items-center justify-between text-xs text-gray-700">
          <span>$ {filters.minPrice}</span>
          <span>$ {filters.maxPrice}</span>
        </div>
        <Slider
          defaultValue={[MIN_PRICE, MAX_PRICE]}
          value={[filters.minPrice, filters.maxPrice]}
          min={MIN_PRICE}
          max={MAX_PRICE}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }))}
        />
      </div>

      <Separator />

      {/* Categories Filter */}
      <div className="h-48 space-y-3 overflow-y-auto px-4">
        <h3 className="text-sm font-semibold">Categories</h3>
        <div className="space-y-2">
          {props.categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categories?.includes(Number(category.id))}
                onCheckedChange={() => handleCategoryToggle(Number(category.id))}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="flex flex-1 cursor-pointer items-center justify-between text-sm font-normal"
              >
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground">({category.products_count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div className="space-y-3 px-4">
        <p>Ratings are not available yet</p>
      </div>

      <Separator />

      <div className="space-y-2 px-4">
        <Button
          onClick={() => {
            handleFilterSubmit(filters)
            props.onClose(false)
          }}
          className="w-full"
        >
          Apply Filters
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            clearAllFilters()
            props.onClose(false)
          }}
          className="w-full"
        >
          <XIcon className="h-4 w-4" />
          Clear All Filters
        </Button>
      </div>
    </div>
  )
}
