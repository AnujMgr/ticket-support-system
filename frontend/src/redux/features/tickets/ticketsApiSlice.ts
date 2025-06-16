import qs from "qs" // or use URLSearchParams if you prefer
import { apiSlice } from "@/redux/api/apiSlice"

type TicketQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTickets: builder.query<PaginatedT<TicketT>, TicketQueryParams>({
      query: (params: TicketQueryParams) => {
        const queryString = qs.stringify(params, { skipNulls: true });
        return `/tickets${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ["tickets"],
    }),
    getTicket: builder.query<TicketT, string>({
      query: (id) => `/tickets/${id}`,
      providesTags: ["ticket"],
    }),
    createTicket: builder.mutation<TicketT, FormData>({
      query: (formData) => ({
        url: '/tickets',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ["tickets"],
    }),
  })
})

export const { useGetTicketsQuery, useCreateTicketMutation, useGetTicketQuery } = ticketsApiSlice