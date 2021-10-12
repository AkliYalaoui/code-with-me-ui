import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {},
  token: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.profile = action?.payload?.profile;
      state.token = action?.payload?.token;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action?.payload));
    },
    logout: (state) => {
      state.profile = {};
      state.token = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
