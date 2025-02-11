import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listViTri: {},
};

const listViTriReducer = createSlice({
  name: "listViTriReducer",
  initialState,
  reducers: {
    layListViTri: (state, action) => {
      state.listViTri = action.payload;
    },
  },
});

export const { layListViTri } = listViTriReducer.actions;

export default listViTriReducer.reducer;
