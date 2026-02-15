interface IAdminSupportTicketCategory {
  id: number
  name: string
  slug: string
  visibility: string
  active: boolean
  sort_order: number
  created_at?: string
}

export { IAdminSupportTicketCategory }
