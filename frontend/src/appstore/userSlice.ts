import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: object | null;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  token: localStorage.getItem('token'), // Initialize from localStorage
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object | null>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = action.payload !== null;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;

export const getUser = (state: { user: UserState }) => state.user.currentUser;
export const getIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const getToken = (state: { user: UserState }) => state.user.token;

export default userSlice.reducer;