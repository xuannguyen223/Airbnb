import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrayUsers: [],
  selectedUserInfo: {},
  isLoading: false,
  userPagination: {
    total: 0,
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"],
  },
};

const adminUserSlice = createSlice({
  name: "adminUserSlice",
  initialState,
  reducers: {
    handleArrUser(state, action) {
      state.arrayUsers = action.payload;
    },
    handleDeleteUser(state, action) {
      state.arrayUsers = state.arrayUsers.filter(
        (user) => user.id !== action.payload
      );
      state.userPagination.total--;
    },
    handleSelectedUserInfo(state, action) {
      state.selectedUserInfo = action.payload;
    },
    handleLoading(state, action) {
      state.isLoading = action.payload;
    },
    handleUserPagination(state, action) {
      state.userPagination = {
        ...state.userPagination,
        ...action.payload,
      };
    },
  },
});

export const {
  handleArrUser,
  handleDeleteUser,
  handleSelectedUserInfo,
  handleLoading,
  handleUserPagination,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
