import { commonHttp } from "@/services/interceptor/commonInterceptor";
import {
  ACCESS_TOKEN,
  RENTED_ROOMS_BY_USER_ID_API,
  ROOMS_API,
  UPLOAD_AVATAR_API,
  USER_API,
} from "@/utils/constant";
import {
  handleArrayRentedRoom,
  handleArrayRoomDetail,
  handleIsRentedRoom,
  handleLoadingUpdateAvatar,
  handleLoadingUpdateProfile,
  handleOpenModalAlert,
  handleOpenModalUpdateAvatar,
  handleOpenModalUserInfo,
  handleUpdateInfoSuccess,
  handleUserInfo,
  handleValidationAvatar,
} from "./userSlice";
import { redirect } from "next/navigation";
import { validationPayLoad } from "../auth/loginAction";

export const getUserInfoAction = (id) => {
  return async (dispatch, getState) => {
    const response = await commonHttp.get(`${USER_API}/${id}`);

    if (response.status === 200) {
      dispatch(handleUserInfo(response.data.content));
    } else {
      alert(
        "Đã có lỗi xảy ra trong quá trình thực hiện. Vui lòng đăng nhập và thử lại !"
      );
      redirect("/login");
    }
  };
};

const preparePayLoadForUpdateUserInfo = (values, id) => {
  const { username, email, phone, gender, birthday } = values;
  return {
    id: id,
    name: username.trim(),
    email: email,
    phone: phone,
    gender: gender,
    birthday: birthday,
  };
};

export const handleUpdateUserInfoAction = (values, id) => {
  return async (dispatch, getState) => {
    const payload = preparePayLoadForUpdateUserInfo(values, id);
    const responseUpdateUserInfo = await commonHttp.put(
      `${USER_API}/${id}`,
      payload
    );
    dispatch(handleLoadingUpdateProfile(false));
    dispatch(handleOpenModalUserInfo(false));
    dispatch(handleOpenModalAlert(true));
    if (responseUpdateUserInfo.status === 200) {
      dispatch(handleUserInfo(responseUpdateUserInfo.data.content));
      dispatch(handleUpdateInfoSuccess(true));
      setTimeout(() => {
        dispatch(handleOpenModalAlert(false));
      }, 1000);
    } else {
      dispatch(handleUpdateInfoSuccess(false));
    }
  };
};

export const handleUploadUserAvatarAction = (image) => {
  return async (dispatch, getState) => {
    const userToken = localStorage.getItem(ACCESS_TOKEN);
    const responseUpdateAvatar = await commonHttp.post(
      UPLOAD_AVATAR_API,
      { formFile: image },
      {
        headers: {
          token: userToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(handleLoadingUpdateAvatar(false));

    if (responseUpdateAvatar.status === 200) {
      dispatch(handleValidationAvatar(validationPayLoad(false, "")));
      dispatch(handleUserInfo(responseUpdateAvatar.data.content));
      dispatch(handleUpdateInfoSuccess(true));
      dispatch(handleOpenModalAlert(true));
      dispatch(handleOpenModalUpdateAvatar(false));
      setTimeout(() => {
        dispatch(handleOpenModalAlert(false));
      }, 1000);
    } else if (responseUpdateAvatar.status === 400) {
      dispatch(
        handleValidationAvatar(
          validationPayLoad(true, responseUpdateAvatar.data.content)
        )
      );
    } else {
      dispatch(handleUpdateInfoSuccess(false));
      dispatch(handleOpenModalAlert(true));
    }
  };
};

export const getRentedRoomsByUserIDAction = (id) => {
  return async (dispatch, getState) => {
    const responseRentedRooms = await commonHttp.get(
      `${RENTED_ROOMS_BY_USER_ID_API}/${id}`
    );
    const dataRentedRoom = responseRentedRooms.data.content;
    if (responseRentedRooms.status === 200 && dataRentedRoom.length !== 0) {
      dispatch(handleIsRentedRoom(true));
      dispatch(handleArrayRentedRoom(dataRentedRoom));
      dataRentedRoom.forEach(async (room) => {
        const responseRoomDetails = await commonHttp.get(
          `${ROOMS_API}/${room.maPhong}`
        );
        if (responseRoomDetails.status === 200) {
          dispatch(
            handleArrayRoomDetail({
              ...responseRoomDetails.data.content,
              bookingID: room.id,
            })
          );
        }
      });
    } else {
      dispatch(handleIsRentedRoom(false));
    }
  };
};
