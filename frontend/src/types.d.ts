interface UserT {
  id: number,
  name: string,
  email: string
}

interface TicketT {
  id: number,
  user_id: number,
  subject: string,
  description: string,
  attachment: string | null,
  status: string,
  messages: MessageT[],
  created_at: Date,
  updated_at: Date
}

interface MessageT {
  id: number,
  ticket_id: number,
  user_id: number,
  message: string,
  created_at: Date,
  updated_at: Date
}