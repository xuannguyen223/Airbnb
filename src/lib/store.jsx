import { configureStore } from "@reduxjs/toolkit";
import { RoomReducer } from "./features/admin/room/QuanLyPhongReducer";

export const store = configureStore({
  reducer: {
    quanLyPhong: RoomReducer,
  },
});

// CHỖ NÀY EM ĐẶT TÊN HÀM LÀ RoomReducer NHƯNG EM IMPORT LÀ QuanLyPhongReducer NÊN NÓ BÁO LỖI ĐÓ
// CHỊ FIX R NHOA
