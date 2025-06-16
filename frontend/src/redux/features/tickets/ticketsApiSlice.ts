import { apiSlice } from "@/redux/api/apiSlice"

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTickets: builder.query<TicketT[], void>({
      query: () => '/tickets',
      providesTags: ["tickets"],
    }),
    getTicket: builder.query<TicketT, string>({
      query: (id) => `/tickets/${id}`,
      providesTags: ["ticket"],
    }),
    createTicket: builder.mutation<TicketT, TicketT>({
      query: body => ({
        url: '/tickets',
        method: 'POST',
        body: { ...body }
      }),
      invalidatesTags: ["tickets"],
    }),
  })
})

export const { useGetTicketsQuery, useCreateTicketMutation, useGetTicketQuery } = ticketsApiSlice