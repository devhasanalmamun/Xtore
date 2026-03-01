interface IAdminSupportTicketCategory {
  id?: number
  slug?: string
  name: string
  visibility: string
  active: boolean
  sort_order: number
  created_at?: string
}

export { IAdminSupportTicketCategory }
