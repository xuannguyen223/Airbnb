import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {
    handleLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { handleLoading } = registerSlice.actions;

// export default registerSlice;
export default registerSlice.reducer;
