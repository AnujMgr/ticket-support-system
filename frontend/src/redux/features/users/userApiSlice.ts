import { apiSlice } from "@/redux/api/apiSlice"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<UserT[], void>({
      query: () => '/users',
      providesTags: ["users"],
    }),
  })
})

export const { useGetUsersQuery } = userApiSlice