import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "664dc03cb27c8db1da21d597",
  user: null,
  role: "admin",
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjQ2NjI3NywiZXhwIjoxNzE3MDcxMDc3fQ.uSrjiPyWxucL7VZqxqguReusp11abM7TG6fz_Lh7_mc",
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
