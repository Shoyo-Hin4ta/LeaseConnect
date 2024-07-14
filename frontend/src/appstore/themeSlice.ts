import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeType = "light" | "dark";

interface ThemeState {
  value: ThemeType;
}

const getInitialTheme = (): ThemeType => {
  const savedTheme = localStorage.getItem('theme') as ThemeType;
  return savedTheme || "light";
};

const initialState: ThemeState = {
  value: getInitialTheme()
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
      localStorage.setItem('theme', state.value);
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.value = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;