import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogin: false,
  userInfo: {},
  isBadgeAwarded: false,
  openModalUserInfo: false,
  loadingUpdateProfile: false,
  loadingUpdateAvatar: false,
  openModalAlert: false,
  isUpdateInfoSuccess: false,
  openModalUpdateAvatar: false,
  validationAvatar: {
    isValidationErr: false,
    message: "",
  },
  isRentedRoom: false,
  arrayRentedRoom: [],
  arrayRoomDetail: [],
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
    handleOpenModalUserInfo(state, actions) {
      state.openModalUserInfo = actions.payload;
    },
    handleLoadingUpdateProfile(state, actions) {
      state.loadingUpdateProfile = actions.payload;
    },
    handleLoadingUpdateAvatar(state, actions) {
      state.loadingUpdateAvatar = actions.payload;
    },
    handleOpenModalAlert(state, actions) {
      state.openModalAlert = actions.payload;
    },
    handleUpdateInfoSuccess(state, actions) {
      state.isUpdateInfoSuccess = actions.payload;
    },
    handleOpenModalUpdateAvatar(state, actions) {
      state.openModalUpdateAvatar = actions.payload;
    },
    handleValidationAvatar(state, actions) {
      state.validationAvatar = actions.payload;
    },
    handleIsRentedRoom(state, actions) {
      state.isRentedRoom = actions.payload;
    },
    handleArrayRentedRoom(state, actions) {
      state.arrayRentedRoom = actions.payload;
    },
    handleArrayRoomDetail(state, actions) {
      state.arrayRoomDetail = [...state.arrayRoomDetail, actions.payload];
    },
  },
});

export const {
  handleUserLogin,
  handleUserInfo,
  handleBadgeAwarded,
  handleOpenModalUserInfo,
  handleLoadingUpdateProfile,
  handleLoadingUpdateAvatar,
  handleOpenModalAlert,
  handleUpdateInfoSuccess,
  handleOpenModalUpdateAvatar,
  handleValidationAvatar,
  handleIsRentedRoom,
  handleArrayRentedRoom,
  handleArrayRoomDetail,
} = userSlice.actions;

export default userSlice.reducer;
