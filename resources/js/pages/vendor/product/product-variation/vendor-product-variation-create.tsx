import { Head, useForm } from '@inertiajs/react'
import { BreadcrumbItem } from '@/types'

import VendorProductVariationsTable from '@/pages/vendor/product/product-variation/vendor-product-variations-table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IProductVariation } from '@/types/vendor-product'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { cartesianProduct } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    routeName: 'vendor.products.index',
  },
  {
    title: 'Create Product',
    routeName: 'vendor.products.create',
  },
  {
    title: 'Create Product Variation',
    routeName: 'vendor.products.create',
  },
]

interface IProps {
  variation_types: {
    id: number
    name: string
  }[]
  variation_display_types: {
    label: string
    value: string
  }[]
}

interface IVariation {
  id: number
  name: string
  options: string[]
  display_type: string
}

interface IFormData {
  variations: IVariation[]
  product_variations: IProductVariation[]
}

export default function VendorProductVariationCreate(props: IProps) {
  const { data, setData } = useForm<IFormData>({
    variations: [],
    product_variations: [],
  })

  function handleCheckedChange(checkedState: string | boolean, variation_type: { name: string; id: number }) {
    const has_existing_variation = data.variations.some((v) => v.id === variation_type.id)

    if (!has_existing_variation && checkedState) {
      setData('variations', [
        ...data.variations,
        {
          id: variation_type.id,
          name: variation_type.name,
          options: [],
          display_type: '',
        },
      ])
    }

    if (!checkedState) {
      setData(
        'variations',
        data.variations.filter((v) => v.id !== variation_type.id),
      )
    }
  }

  function handleVariationOptionsInputChange(e: string, variation_type_id: number) {
    const options = e
      .split(',')
      .map((option) => option.trim())
      .filter(Boolean)

    const updated_variations = data.variations.map((v) => (v.id === variation_type_id ? { ...v, options } : v))

    setData('variations', updated_variations)
  }

  function handleVariationDisplayTypeChange(value: string, variation_type_id: number) {
    const updated_variations = data.variations.map((v) =>
      v.id === variation_type_id ? { ...v, display_type: value } : v,
    )
    setData('variations', updated_variations)
  }

  function createCombinations() {
    const variation_option_groups = data.variations.map((v) => v.options).filter((options) => options.length > 0)

    if (variation_option_groups.length < 1) {
      console.log('Please add at least 1 variation option')
      return
    }

    const combinations = cartesianProduct(...variation_option_groups)

    const product_variations = combinations.map((combination) => ({
      name: combination.join('-'),
      price: 0,
      discount_percent: 0,
      stock: 0,
      images: [],
    }))

    setData('product_variations', product_variations)
  }

  function handleSubmit() {
    console.log(data)
  }

  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <Head title="Adding product variations" />
      <section className="mr-auto max-w-7xl space-y-6 px-4 py-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Select all the variation type that your product might have :</h3>
          <div className="flex items-center gap-4">
            {props.variation_types.map((variation_type) => {
              const is_checked = data.variations.some((v) => v.id === variation_type.id)
              return (
                <div className="flex items-center gap-1" key={variation_type.id}>
                  <Checkbox
                    checked={is_checked}
                    className="cursor-pointer"
                    onCheckedChange={(checked) => handleCheckedChange(Boolean(checked), variation_type)}
                  />
                  <Label className="mb-0 font-normal">{variation_type.name}</Label>
                </div>
              )
            })}
          </div>
          <p className="text-sm font-medium text-slate-800">
            <b>Note</b>: If a variation type is not available or suitable for your product please send a report to admin
            panel with the suggesting name of that variation type. If it sounds good to us we will consider adding it.
          </p>
        </div>

        {data.variations.length > 0 && (
          <>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Enter all the variation type options for each variation type :</h3>
              {data.variations.map((variation) => {
                return (
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center" key={variation.id}>
                    <div className="xl:min-w-lg">
                      <Label htmlFor={variation.name.toLowerCase()}>{variation.name}</Label>
                      <Input
                        id={variation.name.toLowerCase()}
                        name={variation.name.toLowerCase()}
                        defaultValue={variation.options.join(', ')}
                        onBlur={(e) => handleVariationOptionsInputChange(e.target.value, variation.id)}
                        placeholder="Enter (For Color) ex: Red, Blue, Green (For Size): XL,XXL"
                      />
                    </div>

                    <div>
                      <Label htmlFor="display_type">Display type</Label>
                      <Select
                        name="status"
                        value={variation.display_type}
                        onValueChange={(e) => handleVariationDisplayTypeChange(e, variation.id)}
                      >
                        <SelectTrigger id="display_type" className="sm:min-w-[220px]">
                          <SelectValue placeholder="Select a display type" />
                        </SelectTrigger>
                        <SelectContent>
                          {props.variation_display_types.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )
              })}
            </div>
            <Button onClick={createCombinations}>Create Combinations</Button>
          </>
        )}

        {/* Product Variations Table */}
        {data.product_variations.length > 0 && (
          <div className="mt-8 space-y-2">
            <VendorProductVariationsTable onChange={setData} product_variations={data.product_variations} />
            <Button onClick={handleSubmit} className="mt-6">
              Add Product Variations
            </Button>
          </div>
        )}
      </section>
    </VendorLayout>
  )
}
