import { LucideIcon } from 'lucide-react'
import type { Config } from 'ziggy-js'

export interface Auth {
  user: User
}

export interface BreadcrumbItem {
  title: string
  routeName: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface NavItem {
  title: string
  baseRoute: string
  routeName: string
  icon?: LucideIcon | null
  isActive?: boolean
}

export interface SharedData {
  name: string
  quote: { message: string; author: string }
  auth: Auth
  ziggy: Config & { location: string }
  sidebarOpen: boolean

  [key: string]: unknown
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  total: number
  per_page: number
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
}

export interface PaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  image: string
  role: UserRoleEnum
  avatar?: string
  email_verified_at: string | null
  created_at: string
  updated_at: string

  [key: string]: unknown // This allows for additional properties...
}
