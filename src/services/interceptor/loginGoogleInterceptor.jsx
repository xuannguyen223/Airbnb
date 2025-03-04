import { DOMAIN, MOCK_API_DOMAIN, TOKEN_CYBERSOFT } from "@/utils/constant";
import axios from "axios";

export const loginGoogleHttp = axios.create({
  baseURL: MOCK_API_DOMAIN,
  timeout: 5000,
});

// request
loginGoogleHttp.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers,
  };
  return request;
});

// response
loginGoogleHttp.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);
