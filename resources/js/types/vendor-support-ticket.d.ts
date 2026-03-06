interface IVendorSupportTicketIndex {
  id: number
  category: {
    name: string
  }
  subject: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

interface IVendorSupportTicketCreate {
  subject: string
  category: string
  description: string
  attachment: null
}

export { IVendorSupportTicketIndex, IVendorSupportTicketCreate }
