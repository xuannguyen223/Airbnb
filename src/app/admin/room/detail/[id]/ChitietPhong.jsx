import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinPhongAction } from "../Redux/Actions/QuanLyPhongAction";

    const ChiTietPhong = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const { thongTinPhong } = useSelector((state) => state.QuanLyPhongReducer);

    useEffect(() => {
        axios({
        url: `https://api.airbnb.com/phong/${id}`,
        method: "GET",
        })
        .then((res) => {
            dispatch(layThongTinPhongAction(res.data.content));
        })
        .catch((err) => {
            console.log(err);
        });
    }, [id, dispatch]);

    return (
        <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Hình ảnh phòng */}
            <div>
            <img
                src={thongTinPhong.hinhAnh}
                alt={thongTinPhong.tenPhong}
                className="w-full h-96 object-cover rounded-lg"
            />
            </div>

            {/* Thông tin phòng */}
            <div>
            <h1 className="text-3xl font-bold">{thongTinPhong.tenPhong}</h1>
            <p className="text-gray-500">{thongTinPhong.viTri}</p>
            <p className="mt-2">{thongTinPhong.moTa}</p>
            <p className="mt-4 text-lg font-semibold">
                Giá: {thongTinPhong.giaPhong} VND / đêm
            </p>
            <p className="text-gray-600">Số khách tối đa: {thongTinPhong.guestMax}</p>
            <button className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-md">
                Đặt phòng ngay
            </button>
            </div>
        </div>

        {/* Danh sách đánh giá */}
        <div className="mt-10">
            <h2 className="text-2xl font-bold">Đánh giá</h2>
            {thongTinPhong.danhGia?.map((danhGia, index) => (
            <div key={index} className="border-b py-3">
                <p className="font-semibold">{danhGia.nguoiDung}</p>
                <p>{danhGia.noiDung}</p>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default ChiTietPhong;