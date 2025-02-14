import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/auth/registerSlice";
import loginSlice from "./features/auth/loginSlice";

export const store = () => {
  return configureStore({
    reducer: {
      registerSlice: registerSlice,
      loginSlice: loginSlice,
    },
  });
};
