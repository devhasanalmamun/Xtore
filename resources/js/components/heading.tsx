import { cn } from '@/lib/utils'

interface IProps {
  wrapperClassName?: string
  title: string
  description?: string
}

export default function Heading({ title, description, wrapperClassName }: IProps) {
  return (
    <div className={cn('mb-8 space-y-0.5', wrapperClassName)}>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
