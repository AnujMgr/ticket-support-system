import type { RootState } from '@/redux/store'
import { logOut, setCredentials } from '@/redux/features/auth/authSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // headers.set("Accept", "application/json");
    const contentType = headers.get("Content-Type");
    if (!contentType || contentType === "application/json") {
      headers.set("Accept", "application/json")
    }
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401) {
    // send refresh token to get new access token 
    const refreshResult = await baseQuery('/refresh-token', api, extraOptions)

    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth?.user
      // store the new token 
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with new access token 
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: _builder => ({}),
  tagTypes: ["users", "tickets", "ticket"],
})