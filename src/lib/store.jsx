import { configureStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { RoomReducer } from "./features/admin/QuanLyPhongReducer";
import viTriTongReducer from "./features/viTri/viTriTongReducer";

export const store = configureStore({
  reducer: {
    quanLyPhong: RoomReducer,
    viTriTong: viTriTongReducer,
  },
});
