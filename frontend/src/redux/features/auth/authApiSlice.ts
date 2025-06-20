import { apiSlice } from "@/redux/api/apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),

    getMe: builder.query({
      query: () => '/me',
      keepUnusedDataFor: 3600, // 1 hour
      providesTags: ["users"]
    })
  })
})

export const { useLoginMutation, useGetMeQuery } = authApiSlice