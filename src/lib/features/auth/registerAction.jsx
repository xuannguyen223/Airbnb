import { authHttp } from "@/services/interceptor/authInterceptor";
import {
  MOCK_API_USER_ACCOUNT,
  REGISTER_API,
  ROLE_USER,
} from "@/utils/constant";
import {
  handleLoading,
  handleOpenModalAlert,
  handleRegisterSuccess,
  handleValidationErr,
} from "./registerSlice";
import { loginGoogleHttp } from "@/services/interceptor/loginGoogleInterceptor";

export const validationPayload = (isValidationErr, message) => {
  return {
    isValidationErr: isValidationErr,
    message: message,
  };
};

const preparePayloadForRegister = (data) => {
  const { username, email, password, phone, birthday, gender } = data;
  return {
    // id: new Date().getTime() % 1_000_000,
    name: username.trim(),
    email: email.trim(),
    password: password.trim(),
    phone: phone,
    birthday: birthday,
    gender: gender,
    // role: ROLE_USER,
  };
};

export const handleRegisterAction = (data) => {
  return async (dispatch, getState) => {
    const payload = preparePayloadForRegister(data);
    const response = await authHttp.post(REGISTER_API, payload);
    if (response.status === 200) {
      dispatch(handleLoading(false));
      dispatch(handleValidationErr(validationPayload(false, "")));
      dispatch(handleOpenModalAlert(true));
      dispatch(handleRegisterSuccess(true));
    } else if (response.status === 400) {
      const googleAccountList = (
        await loginGoogleHttp.get(MOCK_API_USER_ACCOUNT)
      ).data;
      const googleAccountIndex = googleAccountList.findIndex(
        (account) => account.email === payload.email
      );
      if (googleAccountIndex !== -1) {
        dispatch(
          handleValidationErr(
            validationPayload(
              true,
              "Email đã được đăng ký bằng tài khoản Google !"
            )
          )
        );
      } else {
        dispatch(
          handleValidationErr(validationPayload(true, response.data.content))
        );
      }
      dispatch(handleLoading(false));
    } else {
      dispatch(handleLoading(false));
      dispatch(handleOpenModalAlert(true));
      dispatch(handleRegisterSuccess(false));
    }
  };
};
