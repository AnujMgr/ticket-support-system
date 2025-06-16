import { createSlice } from "@reduxjs/toolkit"

interface SiteStateT {
  theme: "light" | "dark"
}

export const siteSlice = createSlice({
  name: 'theme',
  initialState: { theme: "dark" } as SiteStateT,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
      const root = window.document.documentElement;
      root.classList.remove(state.theme === "light" ? "dark" : "light");
      root.classList.add(action.payload);
    },
  },
})

export const { setTheme } = siteSlice.actions

export default siteSlice.reducer;

export const selectCurrentTheme = (state: SiteStateT) => state.theme