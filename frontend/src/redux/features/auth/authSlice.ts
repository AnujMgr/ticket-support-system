import { createSlice } from "@reduxjs/toolkit"

interface AuthStateT {
  auth: {
    user: UserT | null
    token: string | null
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken
    },
    logOut: (state) => {
      state.user = null
      state.token = null
    }
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer;

export const selectCurrentUser = (state: AuthStateT) => state.auth.user
export const selectCurrentToken = (state: AuthStateT) => state.auth.token