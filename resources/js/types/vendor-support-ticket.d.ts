interface IVendorSupportTicket {
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

export { IVendorSupportTicket }
