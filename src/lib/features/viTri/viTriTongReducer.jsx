import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viTriTong: {},
};

const viTriTongReducer = createSlice({
  name: "phongThueReducer",
  initialState,
  reducers: {
    layViTriTongAction: (state, action) => {
      state.viTriTong = action.payload;
    },
  },
});

export const { layViTriTongAction } = viTriTongReducer.actions;

export default viTriTongReducer.reducer;
