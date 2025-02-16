import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/auth/registerSlice";
import loginSlice from "./features/auth/loginSlice";
import userSlice from "./features/user/userSlice";

export const store = () => {
  return configureStore({
    reducer: {
      registerSlice: registerSlice,
      loginSlice: loginSlice,
      userSlice: userSlice,
    },
  });
};
