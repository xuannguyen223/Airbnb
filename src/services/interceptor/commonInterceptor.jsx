import { DOMAIN, TOKEN_CYBERSOFT } from "@/utils/constant";
import axios from "axios";

export const commonHttp = axios.create({
  baseURL: DOMAIN,
  timeout: 5000,
});

// request
commonHttp.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers,
    tokenCybersoft: TOKEN_CYBERSOFT,
  };
  return request;
});

// response
commonHttp.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);
