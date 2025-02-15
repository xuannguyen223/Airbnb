import { quanLyPhongService } from "../../room/quanLyPhongService";

import {
  SET_DANH_SACH_PHONG,
  SET_THONG_TIN_PHONG,
} from "../room/QuanLyPhongType";

export const layDanhSachPhongAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhongService.layDanhSachPhongThue();
      // Sau khi lấy dữ liệu từ api về => redux (reducer)
      dispatch({
        type: SET_DANH_SACH_PHONG,
        arrRoom: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const layThongTinPhongAction = (id) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhongService.layThongTinPhong(id);

      console.log("result: ", result);

      dispatch({
        type: SET_THONG_TIN_PHONG,
        thongTinPhong: result.data.content,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};

export const layDanhSachPhongTheoViTriAction = (maViTri) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhongService.layDanhSachPhongTheoViTri(
        maViTri
      );
      dispatch({
        type: SET_DANH_SACH_PHONG,
        arrRoom: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error.response?.data);
    }
  };
};
