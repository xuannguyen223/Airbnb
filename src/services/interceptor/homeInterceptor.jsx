import axios from "axios";
import { Domain, tokenCyberSoft } from "@/utils/constant";
export const http = axios.create({
  baseURL: Domain,
  timeout: 5000,
});

http.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers,
    tokenCybersoft: tokenCyberSoft,
  };
  return request;
}),
  (error) => {
    // Nếu có lỗi, trả về Promise.reject để tiếp tục chuỗi xử lý lỗi
    return Promise.reject(error);
  };
