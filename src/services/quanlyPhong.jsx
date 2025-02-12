import { adminHttp } from "./Interceptor/adminInterceptor";

export class QuanLyPhong {
    constructor() {}

    // Lấy danh sách tất cả phòng cho thuê
    layDanhSachPhongThue = () => {
        return adminHttp.get(`https://airbnbnew.cybersoft.edu.vn/api/phong-thue`);
    }

    // Lấy thông tin chi tiết của một phòng dựa vào ID
    layThongTinPhong = (id) => {
        return adminHttp.get(`https://airbnbnew.cybersoft.edu.vn/api/phong-thue/id/${id}`);
    }

    // Lấy danh sách phòng theo vị trí
    layDanhSachPhongTheoViTri = (maViTri) => {
        return adminHttp.get(`https://airbnbnew.cybersoft.edu.vn/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`);
    }

}

export const quanLyPhongService = new QuanLyPhong();