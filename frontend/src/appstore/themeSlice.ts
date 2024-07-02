import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeType = "light" | "dark";

interface ThemeState {
  value: ThemeType;
}

const initialState: ThemeState = {
  value: "light"
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Toggle the theme between light and dark
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;