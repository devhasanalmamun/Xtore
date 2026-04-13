import { BellIcon, LucideIcon, TicketIcon } from 'lucide-react'

interface INotificationConfig {
  icon: LucideIcon
  color: string
}

const notificationConfig: Record<string, INotificationConfig> = {
  support_ticket_created: {
    icon: TicketIcon,
    color: '#F87171',
  },
  default: {
    icon: BellIcon,
    color: '#FBBF24',
  },
}

export default notificationConfig
