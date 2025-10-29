import { ICategory } from '@/types/landing-home'
import { cn } from '@/lib/utils'

interface IProps {
  className?: string
  category: ICategory
}

export default function CardCategory(props: IProps) {
  const name = props.category.name.length >= 16 ? props.category.name.slice(0, 14) + ' ...' : props.category.name

  return (
    <div
      className={cn(
        'cursor-pointer overflow-hidden rounded bg-gray-50 px-2.5 py-2 shadow-xs hover:shadow-sm',
        props.className,
      )}
    >
      <img className="h-20 w-full object-cover" src={props.category.image} alt={props.category.name} />
      <h3 className="mt-1.5 text-sm font-semibold">{name}</h3>
    </div>
  )
}
