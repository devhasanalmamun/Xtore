import { StarIcon } from 'lucide-react'

import { ILandingProductIndex } from '@/types/landing-product'
import { cn } from '@/lib/utils'

interface IProps {
  product: ILandingProductIndex
}

export default function CardProduct(props: IProps) {
  const applied_discount_price = props.product.price - props.product.price * (props.product.discount_percentage / 100)

  return (
    <div className="rounded border">
      <img className="h-60 w-200 object-cover" src={props.product.thumbnail_image} alt={props.product.title} />
      <div className="space-y-1.5 px-1 py-2 text-sm font-medium">
        <p className="line-clamp-2 h-10 text-gray-700">{props.product.title}</p>
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
          <p className={cn('text-primary/60', !props.product.quantity && 'text-red-400')}>
            {props.product.quantity ? `stock ${props.product.quantity}` : 'stock out'}
          </p>
        </div>
        <div>
          <p className="ml-0.5 flex items-center">
            {Array.from({ length: 5 })
              .fill('star')
              .map((star, i) => {
                return <StarIcon key={i} className="w-3 text-primary" fill="currentColor" />
              })}
            <span className="ml-1 text-xs">(19)</span>
          </p>
        </div>
      </div>
    </div>
  )
}
