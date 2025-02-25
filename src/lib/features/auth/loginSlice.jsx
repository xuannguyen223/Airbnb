import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rememberAccount: false,
  loading: false,
  openModalAlert: false,
  isLoginSuccess: false,
  validationErr: {
    isValidationErr: false,
    message: "",
  },
  navigateToHome: false,
  openModalGoogleAlert: false,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    handleRememberAccount(state, actions) {
      state.rememberAccount = actions.payload;
    },
    handleLoading(state, actions) {
      state.loading = actions.payload;
    },
    handleOpenModalAlert(state, actions) {
      state.openModalAlert = actions.payload;
    },
    handleLoginSuccess(state, actions) {
      state.isLoginSuccess = actions.payload;
    },
    handleValidationErr(state, actions) {
      state.validationErr = actions.payload;
    },
    handleNavigateToHome(state, actions) {
      state.navigateToHome = actions.payload;
    },
    handleOpenModalGoogleAlert(state, actions) {
      state.openModalGoogleAlert = actions.payload;
    },
  },
});

export const {
  handleRememberAccount,
  handleLoading,
  handleOpenModalAlert,
  handleLoginSuccess,
  handleValidationErr,
  handleNavigateToHome,
  handleOpenModalGoogleAlert,
} = loginSlice.actions;

export default loginSlice.reducer;
