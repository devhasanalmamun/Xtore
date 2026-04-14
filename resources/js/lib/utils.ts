import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ICategoryNode, ILandingCategory } from '@/types/landing-category'
import { ISupportTicketMessage } from '@/types/support-ticket-messages'
import { User } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cartesianProduct<T>(...arrays: T[][]): T[][] {
  if (arrays.length === 0) return []
  return arrays.reduce<T[][]>((acc, cur) => acc.flatMap((a) => cur.map((b) => [...a, b])), [[]])
}

export function buildCategoryTree(categories: ILandingCategory[]) {
  // Init map with all categories
  const map: Record<number, ICategoryNode> = {}
  categories.forEach((cat) => (map[cat.id] = { ...cat, children: [] }))

  // Build tree
  const roots: ICategoryNode[] = []
  categories.forEach((cat) => {
    if (cat.parent_id !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      map[cat.parent_id]?.children.push(map[cat.id])
    } else {
      roots.push(map[cat.id])
    }
  })

  return roots
}

function limitWords(text: string, limit: number) {
  const words = text.split(' ')

  if (words.length <= limit) {
    return text
  }

  return words.slice(0, limit).join(' ') + ' ...'
}

function statusBadgeVariant(status: string): 'default' | 'success' | 'outline' | 'destructive' {
  switch (status?.toLowerCase()) {
    case 'open':
      return 'default'
    case 'closed':
      return 'destructive'
    case 'resolved':
      return 'success'
    default:
      return 'outline'
  }
}

function isThisMessageFromCurrentUser(message: ISupportTicketMessage, auth_user: User) {
  return message.sender.id === auth_user.id
}

function formateCommaSeparatedNumber(number: number) {
  return number.toLocaleString('en-US')
}

export { limitWords, statusBadgeVariant, isThisMessageFromCurrentUser, formateCommaSeparatedNumber }
