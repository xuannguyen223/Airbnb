import { commonHttp } from "@/services/interceptor/commonInterceptor";
import { MAX_INT32, USER_API, USER_PAGINATION_API } from "@/utils/constant";
import {
  handleArrUser,
  handleDeleteUser,
  handleLoading,
  handleShowTotal,
  handleUserPagination,
} from "./adminUserSlice";
import { redirect } from "next/navigation";

export const getArrayUsers = (keyword) => {
  const paginationUrl = `?pageIndex=1&pageSize=${MAX_INT32}`;
  let keywordUrl = "";
  if (keyword) {
    keywordUrl = `&keyword=${keyword}`;
  }
  const finalUrl = USER_PAGINATION_API + paginationUrl + keywordUrl;
  return async (dispatch, getState) => {
    const responseUserList = await commonHttp.get(finalUrl);
    if (responseUserList.status === 200) {
      dispatch(handleArrUser(responseUserList.data.content.data));
      const pagination = {
        total: responseUserList.data.content.data.length,
        showTotal: (total) => handleShowTotal(total),
      };
      dispatch(handleUserPagination(pagination));
    } else {
      alert(
        `Status: ${responseUserList.status} - ${responseUserList.data.message} ${responseUserList.data.content}`
      );
      return;
    }
  };
};

export const deleteUserAction = (userID) => {
  return async (dispatch, getState) => {
    const responseDeleteUser = await commonHttp.delete(
      `${USER_API}?id=${userID}`
    );

    if (responseDeleteUser.status === 200) {
      dispatch(handleDeleteUser(userID));
    } else {
      alert(
        `Status: ${responseDeleteUser.status} - ${responseDeleteUser.statusText}. ${responseDeleteUser.data.message}`
      );
      return;
    }
  };
};

const preparePayloadForCreateUser = (userInfo) => {
  const { username, email, password, phone, birthday, gender, role } = userInfo;
  return {
    name: username.trim(),
    email: email.trim(),
    password: password.trim(),
    phone: phone,
    birthday: birthday,
    gender: gender,
    role: role,
  };
};

export const createUserAction = (userInfo) => {
  const payload = preparePayloadForCreateUser(userInfo);
  return async (dispatch, getState) => {
    const responseCreateUser = await commonHttp.post(USER_API, payload);
    dispatch(handleLoading(false));
    if (responseCreateUser.status === 200) {
      alert("THÊM NGƯỜI DÙNG THÀNH CÔNG !");
      redirect("/admin");
    } else {
      alert(responseCreateUser.data.content.toUpperCase());
    }
  };
};

const preparePayloadForEditUser = (userInfo) => {
  const { username, email, phone, birthday, gender, role } = userInfo;
  return {
    name: username.trim(),
    email: email.trim(),
    phone: phone,
    birthday: birthday,
    gender: gender,
    role: role,
  };
};

export const editUserAction = (userInfo, userID) => {
  const payload = preparePayloadForEditUser(userInfo);
  return async (dispatch, getState) => {
    const responseEditUser = await commonHttp.put(
      `${USER_API}/${userID}`,
      payload
    );
    dispatch(handleLoading(false));
    if (responseEditUser.status === 200) {
      alert("CẬP NHẬT THÔNG TIN NGƯỜI DÙNG THÀNH CÔNG !");
      redirect("/admin");
    } else {
      alert(responseEditUser.data.content.toUpperCase());
    }
  };
};
