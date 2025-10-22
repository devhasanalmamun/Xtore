import { ColumnDef } from '@tanstack/react-table'
import { ImagePlusIcon } from 'lucide-react'
import React, { useMemo } from 'react'

import { IProductVariation } from '@/types/vendor-product'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'

interface IProps {
  product_variations: IProductVariation[]
  onChange: (key: string, data: IProductVariation[]) => void
}

export default function VendorProductVariationsTable(props: IProps) {
  function handleUpdateProductVariationValues(index: number, key: keyof IProductVariation, value: number) {
    const updated_variations = props.product_variations.map((pv, i) => (i === index ? { ...pv, [key]: value } : pv))
    props.onChange('product_variations', updated_variations)
  }

  const columns = useMemo<ColumnDef<IProductVariation>[]>(
    () => [
      {
        header: 'Combination',
        accessorKey: 'name',
      },
      {
        header: 'Price',
        accessorKey: 'price',
        cell: ({ row }) => (
          <Input
            type="number"
            name="price"
            defaultValue={row.original.price || 0}
            onBlur={(e) => handleUpdateProductVariationValues(row.index, 'price', parseFloat(e.target.value))}
          />
        ),
      },
      {
        header: 'Discount (%)',
        accessorKey: 'discount_percent',
        cell: ({ row }) => (
          <Input
            type="number"
            name="discount_percent"
            defaultValue={row.original.discount_percent || 0}
            onBlur={(e) =>
              handleUpdateProductVariationValues(row.index, 'discount_percent', parseFloat(e.target.value))
            }
          />
        ),
      },
      {
        header: 'Stock',
        accessorKey: 'stock',
        cell: ({ row }) => (
          <Input
            type="number"
            name="stock"
            defaultValue={row.original.stock || 0}
            onBlur={(e) => handleUpdateProductVariationValues(row.index, 'stock', parseFloat(e.target.value))}
          />
        ),
      },
      {
        header: 'Images',
        accessorKey: 'images',
        cell: () => <ImagePlusIcon className="text-primary" />,
      },
    ],
    // eslint-disable-next-line
    [props.product_variations],
  )

  return (
    <>
      <p className="text-sm font-medium text-slate-800">
        <b>Note</b>: If you <b>don't have any need for a specific combination leave the stock field to 0</b>. You can
        edit price, discount <b>(remember discount is in percent %)</b>, stock, images for any specific combination you
        want.
      </p>

      <DataTable columns={columns} data={props.product_variations} />
    </>
  )
}
