import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { type User } from '@/types'

interface UserInfoProps {
  user: User
  showEmail?: boolean
}

export function UserInfo({ showEmail = false, ...props }: UserInfoProps) {
  const getInitials = useInitials()

  return (
    <>
      <Avatar className="h-8 w-8 overflow-hidden rounded-full">
        <AvatarImage src={props.user.avatar} alt={props.user.first_name} />
        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
          {getInitials(props.user.first_name, props.user.last_name)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{`${props.user.first_name} ${props.user.last_name}`}</span>
        {showEmail && <span className="truncate text-xs text-muted-foreground">{props.user.email}</span>}
      </div>
    </>
  )
}
