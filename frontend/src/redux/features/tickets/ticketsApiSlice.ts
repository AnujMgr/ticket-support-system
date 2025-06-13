import { apiSlice } from "@/redux/api/apiSlice"

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTickets: builder.query({
      query: () => '/tickets',
      providesTags: ["tickets"],
    }),
  })
})

export const { useGetTicketsQuery } = ticketsApiSlice