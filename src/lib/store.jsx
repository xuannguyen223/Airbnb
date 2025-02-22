import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/auth/registerSlice";
import loginSlice from "./features/auth/loginSlice";
import userSlice from "./features/user/userSlice";
import adminSlice from "./features/admin/adminSlice";
import adminUserSlice from "./features/admin/user/adminUserSlice";
import viTriTongReducer from "./features/viTri/viTriTongReducer";

export const store = () => {
  return configureStore({
    reducer: {
      registerSlice: registerSlice,
      loginSlice: loginSlice,
      userSlice: userSlice,
      adminSlice: adminSlice,
      adminUserSlice: adminUserSlice,
      viTriTongReducer,
    },
  });
};
