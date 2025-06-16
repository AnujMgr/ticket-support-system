import { apiSlice } from "@/redux/api/apiSlice"
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "@/redux/features/auth/authSlice"
import authReducer from "@/redux/features/auth/authSlice"
import siteReducer from "@/redux/features/site/siteSlice"
import { siteSlice } from "@/redux/features/site/siteSlice"

export const reducer = {
  auth: authSlice.reducer,
  site: siteSlice.reducer
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    site: siteReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      apiSlice.middleware
    ),

  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>