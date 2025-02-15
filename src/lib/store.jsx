import { configureStore } from "@reduxjs/toolkit";
import QuanLyPhongReducer from "@/features/admin/QuanLyPhongReducer";

export const store = configureStore({
  reducer: {
    quanLyPhong: QuanLyPhongReducer, 
  },
});