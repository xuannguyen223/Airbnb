import { configureStore } from "@reduxjs/toolkit";
import { RoomReducer } from "./features/admin/QuanLyPhongReducer";

export const store = configureStore({
  reducer: {
    quanLyPhong: RoomReducer,
  },
});