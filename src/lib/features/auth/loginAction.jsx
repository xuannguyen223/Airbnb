import { authHttp } from "@/services/interceptor/authInterceptor";
import {
  ACCESS_TOKEN,
  EMAIL,
  LOGIN_API,
  PASSWORD,
  REMEMBER_ACCOUNT,
  ROLE_USER,
  SRK,
  USER_ID,
} from "@/utils/constant";
import {
  handleLoading,
  handleLoginSuccess,
  handleNavigateToHome,
  handleOpenModalAlert,
  handleValidationErr,
} from "./loginSlice";
import CryptoJS from "crypto-js";
import { handleVerifyAdmin } from "../admin/adminSlice";

export const validationPayLoad = (isValidationErr, message) => {
  return {
    isValidationErr: isValidationErr,
    message: message,
  };
};

export const encryptData = (data) => {
  const generateData = CryptoJS.AES.encrypt(data, SRK).toString();
  return generateData;
};

export const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SRK);
  const originalData = bytes.toString(CryptoJS.enc.Utf8);
  return originalData;
};

export const handleLoginAction = (values, rememberAccount) => {
  return async (dispatch, getState) => {
    const response = await authHttp.post(LOGIN_API, values);
    dispatch(handleLoading(false));
    if (response.status === 200) {
      dispatch(handleOpenModalAlert(true));
      dispatch(handleLoginSuccess(true));
      setTimeout(() => {
        dispatch(handleOpenModalAlert(false));
        dispatch(handleNavigateToHome(true));
      }, 1000);
      dispatch(handleValidationErr(validationPayLoad(false, "")));
      // Local Storage
      localStorage.setItem(ACCESS_TOKEN, response.data.content.token);
      localStorage.setItem(REMEMBER_ACCOUNT, JSON.stringify(rememberAccount));
      localStorage.setItem(USER_ID, response.data.content.user.id);
      if (rememberAccount) {
        localStorage.setItem(EMAIL, values.email);
        localStorage.setItem(PASSWORD, encryptData(values.password));
      } else {
        localStorage.removeItem(EMAIL);
        localStorage.removeItem(PASSWORD);
      }
    } else if ((response.status = 400)) {
      dispatch(
        handleValidationErr(validationPayLoad(true, response.data.content))
      );
    } else {
      dispatch(handleOpenModalAlert(true));
      dispatch(handleLoginSuccess(false));
    }
  };
};
