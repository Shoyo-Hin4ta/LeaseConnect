import { setAuthToken , removeAuthToken } from "@/lib/authUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  currentUser: object | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object | null>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = action.payload !== null;
      if (action.payload && 'accessToken' in action.payload) {
        setAuthToken(action.payload.accessToken);
      }
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      removeAuthToken();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const getUser = (state: { user: UserState }) => state.user.currentUser;
export const getIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;

export default userSlice.reducer;