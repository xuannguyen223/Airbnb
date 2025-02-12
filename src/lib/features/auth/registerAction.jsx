import { authHttp } from "@/services/interceptor/authInterceptor";
import { REGISTER_API, ROLE_USER } from "@/utils/constant";
import {
  handleLoading,
  handleOpenModalAlert,
  handleRegisterSuccess,
  handleValidationErr,
} from "./registerSlice";

const validationPayload = (isValidationErr, message) => {
  return {
    isValidationErr: isValidationErr,
    message: message,
  };
};

const preparePayloadForRegister = (data) => {
  const { username, email, password, phone, birthday, gender } = data;
  return {
    // id: new Date().getTime() % 1_000_000,
    name: username,
    email: email,
    password: password,
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
    dispatch(handleLoading(false));
    if (response.status === 200) {
      dispatch(handleValidationErr(validationPayload(false, "")));
      dispatch(handleOpenModalAlert(true));
      dispatch(handleRegisterSuccess(true));
    } else if (response.status === 400) {
      dispatch(
        handleValidationErr(validationPayload(true, response.data.content))
      );
    } else {
      dispatch(handleOpenModalAlert(true));
      dispatch(handleRegisterSuccess(false));
    }
  };
};
