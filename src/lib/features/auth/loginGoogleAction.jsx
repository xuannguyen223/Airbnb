import { authHttp } from "@/services/interceptor/authInterceptor";
import {
  MOCK_API_USER_ACCOUNT,
  REGISTER_API,
  USER_API,
} from "@/utils/constant";
import { jwtDecode } from "jwt-decode";
import { handleLoginAction } from "./loginAction";
import { loginGoogleHttp } from "@/services/interceptor/loginGoogleInterceptor";
import { commonHttp } from "@/services/interceptor/commonInterceptor";
import {
  handleLoginSuccess,
  handleOpenModalAlert,
  handleOpenModalGoogleAlert,
} from "./loginSlice";

export const handleLoginGoogleAction = (token) => {
  return async (dispatch, getState) => {
    const { name, email } = jwtDecode(token);
    const pass = Math.random().toString(36).slice(-8);
    const payload = { name: name, email: email, password: pass, gender: true };
    const responseRegister = await authHttp.post(REGISTER_API, payload);
    const userCredential = {
      email: email,
      password: pass,
    };
    if (responseRegister.status === 200) {
      //  post userAccount to Mock Api
      const responseMockApi = await loginGoogleHttp.post(
        MOCK_API_USER_ACCOUNT,
        userCredential
      );
      dispatch(handleLoginAction(userCredential, false));
    } else if (responseRegister.status === 400) {
      // check email exists in mock API
      const googleAccountList = (
        await loginGoogleHttp.get(MOCK_API_USER_ACCOUNT)
      ).data;
      const googleAccountIndex = googleAccountList.findIndex(
        (account) => account.email === email
      );
      if (googleAccountIndex !== -1) {
        userCredential.password =
          googleAccountList[googleAccountIndex].password;
        dispatch(handleLoginAction(userCredential, false));
      } else {
        // check email exists in Cyber API
        const accountList = (await commonHttp.get(USER_API)).data.content;
        const accountIndex = accountList.findIndex(
          (account) => account.email === email
        );
        if (accountIndex !== -1) {
          dispatch(handleOpenModalGoogleAlert(true));
        } else {
          dispatch(handleOpenModalAlert(true));
          dispatch(handleLoginSuccess(false));
        }
      }
    } else {
      dispatch(handleOpenModalAlert(true));
      dispatch(handleLoginSuccess(false));
    }
  };
};
