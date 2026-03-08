interface ISupportTicketMessage {
  id: number
  sender: {
    id: number
    name: string
    role: string
    isAdmin: boolean
    image: string
  }
  message: string
  attachments: string[]
  created_at: string
}

export { ISupportTicketMessage }
