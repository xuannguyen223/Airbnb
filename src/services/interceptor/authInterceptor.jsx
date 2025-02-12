import { DOMAIN, TOKEN_CYBERSOFT } from "@/utils/constant";
import axios from "axios";

export const authHttp = axios.create({
  baseURL: DOMAIN,
  timeout: 5000,
});

// request
authHttp.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers,
    tokenCybersoft: TOKEN_CYBERSOFT,
  };
  return request;
});

// response
authHttp.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);
