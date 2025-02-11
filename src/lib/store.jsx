import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/auth/registerSlice";

export const store = () => {
  return configureStore({
    reducer: {
      registerSlice: registerSlice,
    },
  });
};
