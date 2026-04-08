import { Avatar } from '@radix-ui/react-avatar'
import { router } from '@inertiajs/react'

import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { INotification } from '@/types'
import { cn } from '@/lib/utils'
import useNotifications from '@/stores/useNotifications'

interface IProps {
  notification: INotification
}

export default function NotificationItem(props: IProps) {
  const markAsRead = useNotifications((state) => state.markAsRead)

  function handleOpenUrl() {
    if (!props.notification.url) return

    markAsRead(props.notification)
    router.get(props.notification.url)
  }

  return (
    <div
      onClick={() => handleOpenUrl()}
      className={cn(
        'flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60',
        !props.notification.is_read && 'bg-primary/10 hover:bg-primary/20',
      )}
    >
      <div className="relative mt-0.5 shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={props.notification.avatar} />
          <AvatarFallback className="h-10 w-10 overflow-hidden bg-muted text-xs font-semibold">
            {props.notification.created_by}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className={cn('text-sm leading-snug text-foreground', !props.notification.is_read && 'font-medium')}>
          {props.notification.title}
        </p>
        <span
          className={cn(
            'text-xs',
            props.notification.is_read ? 'text-muted-foreground' : 'font-semibold text-primary/80',
          )}
        >
          {props.notification.created_at}
        </span>
      </div>

      {!props.notification.is_read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary/80" />}
    </div>
  )
}
