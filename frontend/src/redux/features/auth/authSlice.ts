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
    setUser: (state, action) => {
      state.user = action.payload
    },
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

export const { setUser, setCredentials, logOut } = authSlice.actions

export default authSlice.reducer;

export const selectCurrentUser = (state: AuthStateT) => state.auth.user
export const selectCurrentToken = (state: AuthStateT) => state.auth.token