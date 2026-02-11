import { StarIcon } from 'lucide-react'

import { ILandingProductIndex } from '@/types/landing-product'
import { cn } from '@/lib/utils'

interface IProps {
  product: ILandingProductIndex
}

export default function CardProductSale(props: IProps) {
  const applied_discount_price = props.product.price - props.product.price * (props.product.discount_percentage / 100)

  return (
    <div className="relative overflow-hidden rounded border">
      <img className="h-40 w-full object-cover" src={props.product.thumbnail_image} alt={props.product.title} />
      <div className="space-y-1.5 px-1 py-2 text-sm font-medium">
        <p className="line-clamp-2 h-10 text-gray-800">{props.product.title}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-primary">৳ {applied_discount_price}</p>
            {props.product.discount_percentage > 0 && (
              <>
                <p className="mt-0.5 text-[11px] text-gray-400 line-through">৳ {props.product.price}</p>
                <p className="mt-0.5 text-[11px]">({props.product.discount_percentage}%)</p>
              </>
            )}
          </div>
          <p
            className={cn('flex items-center gap-1 text-xs text-primary/60', !props.product.quantity && 'text-red-400')}
          >
            <span className="font-medium text-gray-800">stock</span>
            <span className="mt-0.5">{props.product.quantity ? ` ${props.product.quantity}` : 'out'}</span>
          </p>
        </div>
        <div>
          <p className="ml-0.5 flex items-center">
            {Array.from({ length: 5 })
              .fill('star')
              .map((star, i) => {
                return <StarIcon key={i} className="w-3 text-primary" fill="currentColor" />
              })}
            <span className="mt-0.5 ml-0.5 text-[11px]">(19)</span>
          </p>
        </div>
      </div>

      <div className="absolute -top-[4px] -right-10 flex rotate-33 items-end">
        <span className="scale-105 animate-pulse bg-primary px-10 py-1.5 text-sm font-medium text-white">Sale</span>
      </div>
    </div>
  )
}
