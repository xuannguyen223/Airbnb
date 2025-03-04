import { commonHttp } from "@/services/interceptor/commonInterceptor";
import {
  ACCESS_TOKEN,
  MAX_INT32,
  ROOM_PAGINATION_API,
  ROOMS_API,
} from "@/utils/constant";
import {
  handleArrRoom,
  handleDeleteRoom,
  handleLoading,
  handleRoomPagination,
} from "./adminRoomSlice";
import { redirect } from "next/navigation";

export const getArrayRooms = (keyword) => {
  const paginationUrl = `?pageIndex=1&pageSize=${MAX_INT32}`;
  let keywordUrl = "";
  if (keyword) {
    keywordUrl = `&keyword=${keyword}`;
  }
  const finalUrl = ROOM_PAGINATION_API + paginationUrl + keywordUrl;
  return async (dispatch, getState) => {
    const responseRoomList = await commonHttp.get(finalUrl);
    if (responseRoomList.status === 200) {
      dispatch(handleArrRoom(responseRoomList.data.content.data));
      const pagination = {
        total: responseRoomList.data.content.data.length,
      };
      dispatch(handleRoomPagination(pagination));
    } else {
      alert(
        `Status: ${responseRoomList.status} - ${responseRoomList.data.message} ${responseRoomList.data.content}`
      );
      return;
    }
  };
};

export const deleteRoomAction = (roomID) => {
  return async (dispatch, getState) => {
    const responseDeleteRoom = await commonHttp.delete(
      `${ROOMS_API}/${roomID}`,
      {
        headers: {
          token: localStorage.getItem(ACCESS_TOKEN),
        },
      }
    );
    if (responseDeleteRoom.status === 200) {
      dispatch(handleDeleteRoom(roomID));
    } else {
      alert(
        `Status: ${responseDeleteRoom.status} - ${responseDeleteRoom.statusText}. ${responseDeleteRoom.data.message}`
      );
      return;
    }
  };
};

const preparePayloadForCreateRoom = (roomInfo) => {
  const {
    tenPhong,
    khach,
    phongNgu,
    giuong,
    phongTam,
    moTa,
    giaTien,
    maViTri,
    hinhAnh,
  } = roomInfo;
  return {
    tenPhong: tenPhong.trim(),
    khach: khach,
    phongNgu: phongNgu,
    giuong: giuong,
    phongTam: phongTam,
    moTa: moTa.trim(),
    giaTien: giaTien,
    maViTri: maViTri,
    hinhAnh: hinhAnh.trim(),
    mayGiat: Math.random() < 0.5,
    banLa: Math.random() < 0.5,
    tivi: Math.random() < 0.5,
    dieuHoa: Math.random() < 0.5,
    wifi: Math.random() < 0.5,
    bep: Math.random() < 0.5,
    doXe: Math.random() < 0.5,
    hoBoi: Math.random() < 0.5,
    banUi: Math.random() < 0.5,
  };
};

export const createRoomAction = (roomInfo) => {
  const payload = preparePayloadForCreateRoom(roomInfo);
  return async (dispatch, getState) => {
    const responseCreateRoom = await commonHttp.post(ROOMS_API, payload);
    dispatch(handleLoading(false));
    if (responseCreateRoom.status === 200) {
      alert("THÊM PHÒNG THÀNH CÔNG !");
      redirect("/admin/rooms");
    } else {
      alert(
        `Status: ${responseCreateRoom.status} - ${
          responseCreateRoom.statusText
        }. ${responseCreateRoom.data?.content.toUpperCase()}`
      );
    }
  };
};

const preparePayloadForEditRoom = (roomInfo) => {
  const {
    tenPhong,
    khach,
    phongNgu,
    giuong,
    phongTam,
    moTa,
    giaTien,
    maViTri,
    hinhAnh,
  } = roomInfo;
  return {
    tenPhong: tenPhong.trim(),
    khach: khach,
    phongNgu: phongNgu,
    giuong: giuong,
    phongTam: phongTam,
    moTa: moTa.trim(),
    giaTien: giaTien,
    maViTri: maViTri,
    hinhAnh: hinhAnh.trim(),
  };
};

export const editRoomAction = (roomInfo, roomID) => {
  const payload = preparePayloadForEditRoom(roomInfo);

  return async (dispatch, getState) => {
    const responseEditRoom = await commonHttp.put(
      `${ROOMS_API}/${roomID}`,
      payload,
      {
        headers: {
          token: localStorage.getItem(ACCESS_TOKEN),
        },
      }
    );
    dispatch(handleLoading(false));
    if (responseEditRoom.status === 200) {
      alert("CẬP NHẬT THÔNG TIN PHÒNG THÀNH CÔNG !");
      redirect("/admin/rooms");
    } else {
      alert(
        `Status: ${responseEditRoom.status} - ${
          responseEditRoom.statusText
        }. ${responseEditRoom.data?.content.toUpperCase()}`
      );
    }
  };
};
