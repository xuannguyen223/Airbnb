import { commonHttp } from "@/services/interceptor/commonInterceptor";
import { MAX_INT32, ROOM_API, ROOM_PAGINATION_API } from "@/utils/constant";
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
        `${ROOM_API}?id=${roomID}`
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
    const { tenPhong, khach, phongNgu, giuong, phongTam, moTa, giaTien, maViTri, hinhAnh } = roomInfo;
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

export const createRoomAction = (roomInfo) => {
    const payload = preparePayloadForCreateRoom(roomInfo);
    return async (dispatch, getState) => {
        const responseCreateRoom = await commonHttp.post(ROOM_API, payload);
        dispatch(handleLoading(false));
        if (responseCreateRoom.status === 200) {
        alert("THÊM PHÒNG THÀNH CÔNG !");
        redirect("/admin");
        } else {
        alert(responseCreateRoom.data.content.toUpperCase());
        }
    };
};

const preparePayloadForEditRoom = (roomInfo) => {
    const { tenPhong, khach, phongNgu, giuong, phongTam, moTa, giaTien, maViTri, hinhAnh } = roomInfo;
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
        `${ROOM_API}/${roomID}`,
        payload
        );
    dispatch(handleLoading(false));
    if (responseEditRoom.status === 200) {
        alert("CẬP NHẬT THÔNG TIN PHÒNG THÀNH CÔNG !");
        redirect("/admin");
        } else {
        alert(responseEditRoom.data.content.toUpperCase());
        }
    };
};