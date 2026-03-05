interface IAdminSupportTicketCategory {
  id?: number
  slug?: string
  name: string
  visibility: string
  active: boolean
  sort_order: number
  created_at?: string
}

interface IAdminSupportTicket {
  id?: number
  created_by: {
    name: string
    role: string
  }
  asssigned_to?: string
  category: {
    name: string
  }
  attachment?: string
  status: string
  created_at?: string
  updated_at?: string
}

export { IAdminSupportTicketCategory, IAdminSupportTicket }
