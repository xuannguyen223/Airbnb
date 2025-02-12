import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  loading: false,
  openModalAlert: false,
  isRegisterSuccess: false,
  validationErr: {
    isValidationErr: false,
    message: "",
  },
};

const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {
    handleLoading(state, action) {
      state.loading = action.payload;
    },
    handleValidationErr(state, action) {
      state.validationErr = action.payload;
    },
    handleOpenModalAlert(state, action) {
      state.openModalAlert = action.payload;
    },
    handleRegisterSuccess(state, action) {
      state.isRegisterSuccess = action.payload;
    },
  },
});

export const {
  handleLoading,
  handleValidationErr,
  handleOpenModalAlert,
  handleRegisterSuccess,
} = registerSlice.actions;

export default registerSlice.reducer;
