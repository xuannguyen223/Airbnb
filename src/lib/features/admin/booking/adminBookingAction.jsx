import { commonHttp } from "@/services/interceptor/commonInterceptor";
import {
  ACCESS_TOKEN,
  BOOKING_API,
  BOOKING_BY_USER_ID_API,
} from "@/utils/constant";
import { redirect } from "next/navigation";
import {
  handleArrBooking,
  handleBookingPagination,
  handleDeleteBooking,
  handleLoading,
} from "./adminBookingSlice";
import dayjs from "dayjs";

export const getArrayBookings = () => {
  return async (dispatch, getState) => {
    const responseBookingList = await commonHttp.get(BOOKING_API);
    if (responseBookingList.status === 200) {
      dispatch(handleArrBooking(responseBookingList.data.content));
      const pagination = {
        total: responseBookingList.data.content.length,
      };
      dispatch(handleBookingPagination(pagination));
    } else {
      alert(
        `Status: ${responseBookingList.status} - ${responseBookingList.data?.message} ${responseBookingList.data?.content}`
      );
      return;
    }
  };
};

export const getBookingListByUserID = (userID) => {
  return async (dispatch, getState) => {
    if (!userID) {
      dispatch(getArrayBookings());
      return;
    }
    const responseBookingListByUserID = await commonHttp.get(
      `${BOOKING_BY_USER_ID_API}/${userID}`
    );
    if (responseBookingListByUserID.status === 200) {
      dispatch(handleArrBooking(responseBookingListByUserID.data.content));
      const pagination = {
        total: responseBookingListByUserID.data.content.length,
      };
      dispatch(handleBookingPagination(pagination));
    } else {
      alert(
        `Status: ${responseBookingListByUserID.status} - ${responseBookingListByUserID.data?.message} ${responseBookingListByUserID.data?.content}`
      );
      return;
    }
  };
};

export const deleteBookingAction = (bookingID) => {
  return async (dispatch, getState) => {
    const responseDeleteBooking = await commonHttp.delete(
      `${BOOKING_API}/${bookingID}`
    );

    if (responseDeleteBooking.status === 200) {
      dispatch(handleDeleteBooking(bookingID));
    } else {
      alert(
        `Status: ${responseDeleteBooking.status} - ${responseDeleteBooking.statusText}. ${responseDeleteBooking.data?.message}`
      );
      return;
    }
  };
};

const preparePayloadForCreateBooking = (bookingInfo) => {
  const { roomID, checkIn, checkOut, numberOfGuests, userID } = bookingInfo;
  return {
    maPhong: roomID,
    ngayDen: dayjs(checkIn, "DD/MM/YYYY").format("YYYY-MM-DD"),
    ngayDi: dayjs(checkOut, "DD/MM/YYYY").format("YYYY-MM-DD"),
    soLuongKhach: numberOfGuests,
    maNguoiDung: userID,
  };
};

export const createBookingAction = (bookingInfo) => {
  const payload = preparePayloadForCreateBooking(bookingInfo);

  return async (dispatch, getState) => {
    const responseCreateBooking = await commonHttp.post(BOOKING_API, payload);
    dispatch(handleLoading(false));
    if (responseCreateBooking.status === 201) {
      alert("ĐẶT PHÒNG THÀNH CÔNG !");
      redirect("/admin/bookings");
    } else {
      alert(
        `Status: ${responseCreateBooking.status} - ${responseCreateBooking.statusText}`
      );
    }
  };
};

const preparePayloadForEditBooking = (bookingInfo) => {
  const { roomID, checkIn, checkOut, numberOfGuests, userID } = bookingInfo;
  return {
    maPhong: roomID,
    ngayDen: dayjs(checkIn, "DD/MM/YYYY").format("YYYY-MM-DD"),
    ngayDi: dayjs(checkOut, "DD/MM/YYYY").format("YYYY-MM-DD"),
    soLuongKhach: numberOfGuests,
    maNguoiDung: userID,
  };
};

export const editBookingAction = (bookingInfo) => {
  const payload = preparePayloadForEditBooking(bookingInfo);
  return async (dispatch, getState) => {
    const responseEditUser = await commonHttp.put(
      `${BOOKING_API}/${bookingInfo.bookingID}`,
      payload,
      {
        headers: {
          token: localStorage.getItem(ACCESS_TOKEN),
        },
      }
    );

    dispatch(handleLoading(false));
    if (responseEditUser.status === 200) {
      alert("CẬP NHẬT THÔNG TIN ĐẶT PHÒNG THÀNH CÔNG !");
      redirect("/admin/bookings");
    } else {
      alert(
        `Status: ${responseEditUser.status} - ${responseEditUser.data.message} `
      );
    }
  };
};
