import { configureStore } from "@reduxjs/toolkit";
import viTriTongReducer from "./features/viTri/viTriTongReducer";

export const store = () => {
  return configureStore({
    reducer: {
      viTriTongReducer,
    },
  });
};
