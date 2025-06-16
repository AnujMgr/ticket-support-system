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
  status: "in_progress" | "open" | "closed",
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

interface PaginatedT<T> extends PaginationMetaT {
  data: T[],
}

interface PaginationMetaT {
  current_page: number,
  links: {
    first: string,
    last: string,
    prev: string,
    next: string
  },
  first_page_url: string,
  from: number,
  last_page: number,
  last_page_url: string,
  links: {
    url: string,
    label: string,
    active: boolean
  }[]
  next_page_url: string,
  path: string,
  per_page: number,
  prev_page_url: string,
  to: number,
  total: number
}

interface APIErrorT {
  data: { message: string },
  status: number
}