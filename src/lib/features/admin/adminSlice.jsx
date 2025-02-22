import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    handleVerifyAdmin(state, actions) {
      state.isAdmin = actions.payload;
    },
  },
});

export const { handleVerifyAdmin } = adminSlice.actions;

export default adminSlice.reducer;
