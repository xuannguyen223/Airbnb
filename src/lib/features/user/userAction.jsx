import { commonHttp } from "@/services/interceptor/commonInterceptor";
import { USER_API } from "@/utils/constant";
import { handleUserInfo } from "./userSlice";
import { redirect } from "next/navigation";

export const getUserInfoAction = (id) => {
  return async (dispatch, getState) => {
    const response = await commonHttp.get(`${USER_API}/${id}`);
    console.log("response: ", response);
    if (response.status === 200) {
      dispatch(handleUserInfo(response.data.content));
    } else {
      //   xu ly case fail trong nay sau
    }
  };
};
