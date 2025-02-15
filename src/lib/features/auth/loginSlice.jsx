import { REMEMBER_ACCOUNT } from "@/utils/constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rememberAccount: JSON.parse(localStorage.getItem(REMEMBER_ACCOUNT)) || false,
  loading: false,
  openModalAlert: false,
  isLoginSuccess: false,
  validationErr: {
    isValidationErr: false,
    message: "",
  },
  navigateToHome: false,
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
  },
});

export const {
  handleRememberAccount,
  handleLoading,
  handleOpenModalAlert,
  handleLoginSuccess,
  handleValidationErr,
  handleNavigateToHome,
} = loginSlice.actions;

export default loginSlice.reducer;
