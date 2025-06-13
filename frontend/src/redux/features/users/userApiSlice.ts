import { apiSlice } from "@/redux/api/apiSlice"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ["Users"],
    }),
  })
})

export const { useGetUsersQuery } = userApiSlice