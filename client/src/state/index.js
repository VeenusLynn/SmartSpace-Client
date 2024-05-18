import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: null,
  user: null,
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
      state.accessToken = action.payload.accessTokenoken;
      state.userId = action.payload.user._id;
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
