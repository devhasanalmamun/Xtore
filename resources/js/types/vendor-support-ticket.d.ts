interface IVendorSupportTicketIndex {
  id: number
  category: {
    name: string
  }
  subject: string
  description: string
  images?: string[]
  status: string
  created_at: string
  updated_at: string
}

interface IVendorSupportTicketCreate {
  subject: string
  category: string
  description: string
  images?: string[]
}

export { IVendorSupportTicketIndex, IVendorSupportTicketCreate }
