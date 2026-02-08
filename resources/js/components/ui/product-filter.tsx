import { StarIcon, XIcon } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ProductFilter() {
  const [filters, setFilters] = useState({
    minPrice: '0',
    maxPrice: '1000',
    selectedCategories: [] as string[],
    selectedRatings: [] as number[],
  })

  // Price options
  const priceOptions = [
    { value: '0', label: '$0' },
    { value: '50', label: '$50' },
    { value: '100', label: '$100' },
    { value: '200', label: '$200' },
    { value: '300', label: '$300' },
    { value: '500', label: '$500' },
    { value: '1000', label: '$1000+' },
  ]

  // Mock data - replace with actual data from props
  const categories = [
    { id: '1', name: 'Electronics', count: 45 },
    { id: '2', name: 'Fashion', count: 32 },
    { id: '3', name: 'Home & Garden', count: 28 },
    { id: '4', name: 'Sports', count: 19 },
    { id: '5', name: 'Books', count: 15 },
  ]

  const handleCategoryToggle = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter((id) => id !== categoryId)
        : [...prev.selectedCategories, categoryId],
    }))
  }

  const handleRatingToggle = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      selectedRatings: prev.selectedRatings.includes(rating)
        ? prev.selectedRatings.filter((r) => r !== rating)
        : [...prev.selectedRatings, rating],
    }))
  }

  const clearAllFilters = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: '0',
      maxPrice: '1000',
      selectedCategories: [],
      selectedRatings: [],
    }))
  }

  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div className="space-y-3 px-4">
        <h3 className="text-sm font-semibold">Price Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="min-price" className="text-xs text-muted-foreground">
              Min Price
            </Label>
            <Select
              value={filters.minPrice}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, minPrice: value }))}
            >
              <SelectTrigger id="min-price">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-price" className="text-xs text-muted-foreground">
              Max Price
            </Label>
            <Select
              value={filters.maxPrice}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, maxPrice: value }))}
            >
              <SelectTrigger id="max-price">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Categories Filter */}
      <div className="space-y-3 px-4">
        <h3 className="text-sm font-semibold">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="flex flex-1 cursor-pointer items-center justify-between text-sm font-normal"
              >
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div className="space-y-3 px-4">
        <h3 className="text-sm font-semibold">Customer Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingToggle(rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex cursor-pointer items-center gap-1 text-sm font-normal"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className={cn('h-3.5 w-3.5', index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')}
                  />
                ))}
                <span className="ml-1 text-xs text-muted-foreground">& up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2 px-4">
        <Button onClick={clearAllFilters} className="w-full">
          Apply Filters
        </Button>
        <Button variant="secondary" onClick={clearAllFilters} className="w-full">
          <XIcon className="h-4 w-4" />
          Clear All Filters
        </Button>
      </div>
    </div>
  )
}
