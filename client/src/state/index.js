import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "664dc03cb27c8db1da21d597",
  user: null,
  role: "admin",
  accessToken: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.user._id;
      state.role = action.payload.user.role;
    },
    setLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.userId = null;
    },
  },
});

export const { setMode, setLogin, setLogout } = globalSlice.actions;

export default globalSlice.reducer;
