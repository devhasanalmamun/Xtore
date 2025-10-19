import { Head, useForm } from '@inertiajs/react'
import { BreadcrumbItem } from '@/types'
import React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
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

interface IFormData {
  variation_type_ids: number[]
  variation_type_options: Record<number, string>
  variations_display_type: {
    variation_id: number
    variation_type: string
  }[]
}

export default function VendorProductVariationCreate(props: IProps) {
  const { data, setData } = useForm<IFormData>({
    variation_type_ids: [],
    variation_type_options: {},
    variations_display_type: [],
  })

  console.log(data)

  function handleCheckedChange(checkedState: string | boolean, variation_id: number) {
    if (checkedState) {
      setData('variation_type_ids', [...data.variation_type_ids, variation_id])
    }

    if (!checkedState) {
      setData(
        'variation_type_ids',
        data.variation_type_ids.filter((id) => id !== variation_id),
      )

      setData(
        'variations_display_type',
        data.variations_display_type.filter((vdt) => vdt.variation_id !== variation_id),
      )
    }
  }

  function handleDisplayTypeChange(value: string, variation_type_id: number) {
    const has_existing_variation_display_type = data.variations_display_type.find(
      (vdt) => vdt.variation_id === variation_type_id,
    )

    const new_variation_display_type = has_existing_variation_display_type
      ? data.variations_display_type.map((vdt) =>
          vdt.variation_id === variation_type_id ? { ...vdt, variation_type: value } : vdt,
        )
      : [...data.variations_display_type, { variation_id: variation_type_id, variation_type: value }]

    setData('variations_display_type', new_variation_display_type)
  }

  return (
    <VendorLayout breadcrumbs={breadcrumbs}>
      <Head title="Adding product variations" />
      <section className="space-y-6 px-4 py-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Select all the variation type that your product might have :</h3>
          <div className="flex items-center gap-4">
            {props.variation_types.map((variation_type) => {
              return (
                <div className="flex items-center gap-1" key={variation_type.id}>
                  <Checkbox
                    value={variation_type.id}
                    className="cursor-pointer"
                    onCheckedChange={(checked) => handleCheckedChange(checked, variation_type.id)}
                  />
                  <Label className="mb-0 font-normal">{variation_type.name}</Label>
                </div>
              )
            })}
          </div>
          <p className="text-sm text-red-400">
            <b>Note</b>: If a variation type is not available or suitable for your product please send a report to admin
            panel with the suggesting name of that variation type. If it sounds good to us we will consider adding it.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Enter all the variation type options for each variation type :</h3>
          {data.variation_type_ids.map((id) => {
            const variation_type = props.variation_types.find((v_type) => v_type.id === id)
            const name_lwCase = variation_type?.name.toLocaleLowerCase()

            return (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center" key={id}>
                <div className="xl:min-w-lg">
                  <Label htmlFor={name_lwCase}>{variation_type?.name}</Label>
                  <Input
                    id={name_lwCase}
                    name={name_lwCase}
                    placeholder="Enter (For Color) ex: Red, Blue, Green (For Size): XL,XXL"
                  />
                </div>

                <div>
                  <Label htmlFor="display_type">Display type</Label>
                  <Select name="status" value="" onValueChange={(e) => handleDisplayTypeChange(e, id)}>
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

        <Button>Create Combinations</Button>
      </section>
    </VendorLayout>
  )
}
