import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogin: false,
  userInfo: {},
  isBadgeAwarded: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    handleUserLogin(state, actions) {
      state.isUserLogin = actions.payload;
    },
    handleUserInfo(state, actions) {
      state.userInfo = actions.payload;
    },
    handleBadgeAwarded(state, actions) {
      state.isBadgeAwarded = actions.payload;
    },
  },
});

export const { handleUserLogin, handleUserInfo, handleBadgeAwarded } =
  userSlice.actions;

// export default userSlice;
export default userSlice.reducer;
