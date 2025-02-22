"use client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { http } from "@/services/interceptor/homeInterceptor";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { idToTinhThanhMap, tinhThanhToIdMap, USER_ID } from "@/utils/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ChiTietPhongThue = ({ idPhongThue, phongThue }) => {
  const viTriTong = useSelector((state) => state.viTriTongReducer.viTriTong);
  const tinhThanhTheoMaViTri = idToTinhThanhMap[phongThue.maViTri];
  const idTinhThanh = tinhThanhToIdMap[tinhThanhTheoMaViTri];
  const [luongKhach, setLuongKhach] = useState(2);

  const startButtonRef = useRef(null);
  const endButtonRef = useRef(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const date = new Date(startDate);
  const StartIsoDate = date.toISOString();

  const endDateconvert = new Date(endDate);
  const EndIsoDate = endDateconvert.toISOString();

  const bodyDatPhong = {
    maPhong: phongThue.id,
    ngayDen: StartIsoDate,
    ngayDi: EndIsoDate,
    soLuongKhach: luongKhach ? luongKhach : 2,
    maNguoiDung: localStorage.getItem(USER_ID) || 0,
  };

  const handleStartButtonClick = () => {
    setShowStartCalendar(!showStartCalendar);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setShowStartCalendar(false);
  };

  const handleEndButtonClick = () => {
    setShowEndCalendar(!showEndCalendar);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setShowEndCalendar(false);
  };

  const calculateDaysBetween = (start, end) => {
    if (start && end) {
      const timeDiff = end.getTime() - start.getTime();
      return timeDiff / (1000 * 3600 * 24);
    }
    return 0;
  };

  const daysBetween = calculateDaysBetween(startDate, endDate);
  const handleDatPhong = async () => {
    if (bodyDatPhong.soLuongKhach > phongThue.khach) {
      toast.error(`Số lượng khách tối đa bạn có thể đặt là ${phongThue.khach}`);
      return;
    }
    if (startDate === null || endDate === null) {
      toast.error("Bạn vẫn chưa chọn ngày bắt đầu và kết thúc");
      return;
    }
    const res = await http.post("/api/dat-phong", bodyDatPhong);
    if (res.data.message === "Thêm mới thành công!") {
      toast.success("Đặt phòng thành công!");
      setStartDate(null);
      setEndDate(null);
      setLuongKhach(2);
    }
  };
  return (
    <div>
      <div>
        <div className="font-bold text-3xl mt-4">{phongThue.tenPhong}</div>
        <div className="flex items-center my-4">
          <svg className="h-4 w-4 fill-[#FF5A5F]" viewBox="0 0 384 512">
            <path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"></path>
          </svg>
          <div className="mx-2">Chủ nhà siêu cấp</div>
          <div className="mx-2">
            <Link
              className="underline"
              href={`/list-city/${tinhThanhTheoMaViTri}`}
            >
              {viTriTong[idTinhThanh - 1]?.tinhThanh
                ? viTriTong[idTinhThanh - 1]?.tinhThanh
                : ""}
              ,
              {viTriTong[idTinhThanh - 1]?.quocGia
                ? viTriTong[idTinhThanh - 1]?.quocGia
                : "Việt Nam"}
            </Link>
          </div>
        </div>
        <div>
          <Image
            src={phongThue.hinhAnh}
            alt=""
            width={500}
            height={500}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-8 p-4">
        <div className="w-full lg:w-[60%]">
          <h2>Toàn bộ căn hộ</h2>
          <div>
            {phongThue.khach} Khách • {phongThue.phongNgu} Phòng ngủ •{" "}
            {phongThue.giuong} Giường • {phongThue.phongTam} Phòng tắm
          </div>
          <hr className="my-4" />
          <div>
            <div className="flex mb-4">
              <div className="mr-4">
                <svg className="h-6 w-6" viewBox="0 0 512 512">
                  <path d="M408 406.545V248H288v158.545ZM320 280h56v94.545h-56Z"></path>
                  <path d="M271.078 33.749a34 34 0 0 0-47.066.984L32 226.745V496h112V336h64v160h272V225.958ZM448 464H240V304H112v160H64V240L249.412 57.356V57.3L448 240Z"></path>
                </svg>
              </div>
              <div>
                <div className="font-bold text-sm mb-2">Toàn bộ nhà</div>
                <div className="text-sm text-black text-opacity-75">
                  Bạn sẽ có chung cư cao cấp cho riêng mình.
                </div>
              </div>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <svg className="h-6 w-6" viewBox="0 0 30 30">
                  <path d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"></path>
                  <path d="M17.003 20a4.895 4.895 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.699 5.699 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.617 16.617 0 0 1 10 24H8a17.342 17.342 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13.025 13.025 0 0 0 17.596 28Z"></path>
                </svg>
              </div>
              <div>
                <div className="font-bold text-sm mb-2">Vệ sinh tăng cường</div>
                <div>
                  <div className="text-sm text-black text-opacity-75 mb-1">
                    Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng
                    cường 5 bước của Airbnb.
                  </div>
                  <div className="underline font-semibold cursor-pointer">
                    Hiển thị thêm
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <svg className="w-5 h-5" viewBox="0 0 880 880">
                  <path d="M480 896V702.08A256.256 256.256 0 0 1 264.064 512h-32.64a96 96 0 0 1-91.968-68.416L93.632 290.88a76.8 76.8 0 0 1 73.6-98.88H256V96a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v96h88.768a76.8 76.8 0 0 1 73.6 98.88L884.48 443.52A96 96 0 0 1 792.576 512h-32.64A256.256 256.256 0 0 1 544 702.08V896h128a32 32 0 1 1 0 64H352a32 32 0 1 1 0-64zm224-448V128H320v320a192 192 0 1 0 384 0m64 0h24.576a32 32 0 0 0 30.656-22.784l45.824-152.768A12.8 12.8 0 0 0 856.768 256H768zm-512 0V256h-88.768a12.8 12.8 0 0 0-12.288 16.448l45.824 152.768A32 32 0 0 0 231.424 448z"></path>
                </svg>
              </div>
              <div>
                <div className="font-bold text-sm mb-2">Chủ nhà siêu cấp</div>
                <div className="text-sm text-black text-opacity-75">
                  Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh
                  giá cao và là những người cam kết mang lại quãng thời gian ở
                  tuyệt vời cho khách.
                </div>
              </div>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <svg className="w-5 h-5" viewBox="0 0 880 880">
                  <path d="M480 896V702.08A256.256 256.256 0 0 1 264.064 512h-32.64a96 96 0 0 1-91.968-68.416L93.632 290.88a76.8 76.8 0 0 1 73.6-98.88H256V96a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v96h88.768a76.8 76.8 0 0 1 73.6 98.88L884.48 443.52A96 96 0 0 1 792.576 512h-32.64A256.256 256.256 0 0 1 544 702.08V896h128a32 32 0 1 1 0 64H352a32 32 0 1 1 0-64zm224-448V128H320v320a192 192 0 1 0 384 0m64 0h24.576a32 32 0 0 0 30.656-22.784l45.824-152.768A12.8 12.8 0 0 0 856.768 256H768zm-512 0V256h-88.768a12.8 12.8 0 0 0-12.288 16.448l45.824 152.768A32 32 0 0 0 231.424 448z"></path>
                </svg>
              </div>
              <div className="font-bold text-sm mb-2">
                Miễn phí hủy trong 48 giờ
              </div>
            </div>
          </div>
          <div>
            <hr className="my-4" />
            <div className="mt-2">
              <button className="flex justify-between p-3 w-full border-2 border-black hover:bg-[#E4E7EB] rounded-lg">
                <div>Dịch sang tiếng Anh</div>
                <div>
                  <svg className="w-6 h-6" viewBox="0 0 20 20">
                    <path d="M20 18h-1.44a.6.6 0 0 1-.4-.12a.8.8 0 0 1-.23-.31L17 15h-5l-1 2.54a.8.8 0 0 1-.22.3a.6.6 0 0 1-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a12 12 0 0 1-.39-1.24q-.09.37-.19.69l-.19.56l-1.58 4.19zm-6.3-1.58a13.4 13.4 0 0 1-2.91-1.41a11.46 11.46 0 0 0 2.81-5.37H12V4H7.31a4 4 0 0 0-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 0 0 5 10.7a17.2 17.2 0 0 1-5 2.1q.56.82.87 1.38a23.3 23.3 0 0 0 5.22-2.51a15.6 15.6 0 0 0 3.56 1.77zM3.63 5.33h4.91a8.1 8.1 0 0 1-2.45 4.45a9.1 9.1 0 0 1-2.46-4.45"></path>
                  </svg>
                </div>
              </button>
              <div className="my-4">
                Emmy là Chủ nhà siêu cấp Chủ nhà siêu cấp là những chủ nhà có
                kinh nghiệm, được đánh giá cao và là những người cam kết mang
                lại quãng thời gian ở tuyệt vời cho khách. Trải nghiệm nhận
                phòng tuyệt vời 100% khách gần đây đã xếp hạng 5 sao cho quy
                trình nhận phòng. Hủy miễn phí trước 28 thg 9.
              </div>
              <div className="font-bold underline mb-4">Hiển thị thêm</div>
              <hr className="my-4" />
            </div>
            <div>
              <div className="font-bold text-xl mb-4">Các tiện ích đi kèm </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                {phongThue.tivi ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 640 512">
                      <path d="M64 64V352H576V64H64zM0 64C0 28.7 28.7 0 64 0H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM128 448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                    </svg>
                    <div>Tivi</div>
                  </div>
                ) : (
                  ""
                )}
                {phongThue.doXe ? (
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 640 512">
                      <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM192 256h48c17.7 0 32-14.3 32-32s-14.3-32-32-32H192v64zm48 64H192v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V288 168c0-22.1 17.9-40 40-40h72c53 0 96 43 96 96s-43 96-96 96z"></path>
                    </svg>
                    <div>Bãi đỗ xe</div>
                  </div>
                ) : (
                  ""
                )}
                {phongThue.banUi ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 640 512">
                      <path d="M439.2 1.2c11.2-3.2 23.2-.1 31.4 8.1L518 56.7l-26.5 7.9c-58 16.6-98.1 39.6-129.6 67.4c-31.2 27.5-53.2 59.1-75.1 90.9l-2.3 3.3C241.6 288.7 195 356.6 72.8 417.7L37.9 435.2 9.4 406.6c-7.3-7.3-10.6-17.6-9-27.8s8.1-18.9 17.3-23.5C136.1 296.2 180.9 231 223.3 169.3l2.3-3.4c21.8-31.8 44.9-64.9 77.7-93.9c33.4-29.5 75.8-53.6 135.9-70.8zM61.8 459l25.4-12.7c129.5-64.7 179.9-138.1 223.8-202l2.2-3.3c22.1-32.1 42.1-60.5 69.9-85.1c27.5-24.3 63.4-45.2 117.3-60.6l0 0 .2-.1 43.1-12.9 23 23c8 8 11.2 19.7 8.3 30.7s-11.3 19.6-22.2 22.7c-51.9 14.8-85.6 34.7-111.1 57.2c-26.1 23-45.1 49.9-67.3 82.1l-2.2 3.2C327.8 365.9 275.5 442 142.3 508.6c-12.3 6.2-27.2 3.7-36.9-6L61.8 459z"></path>
                    </svg>
                    <div>Bàn ủi</div>
                  </div>
                ) : (
                  ""
                )}
                {phongThue.hoBoi ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 640 512">
                      <path d="M128 127.7C128 74.9 170.9 32 223.7 32c48.3 0 89 36 95 83.9l1 8.2c2.2 17.5-10.2 33.5-27.8 35.7s-33.5-10.2-35.7-27.8l-1-8.2c-2-15.9-15.5-27.8-31.5-27.8c-17.5 0-31.7 14.2-31.7 31.7V224H384V127.7C384 74.9 426.9 32 479.7 32c48.3 0 89 36 95 83.9l1 8.2c2.2 17.5-10.2 33.5-27.8 35.7s-33.5-10.2-35.7-27.8l-1-8.2c-2-15.9-15.5-27.8-31.5-27.8c-17.5 0-31.7 14.2-31.7 31.7V361c-1.6 1-3.3 2-4.8 3.1c-18 12.4-40.1 20.3-59.2 20.3h0V288H192v96.5c-19 0-41.2-7.9-59.1-20.3c-1.6-1.1-3.2-2.2-4.9-3.1V127.7zM306.5 389.9C329 405.4 356.5 416 384 416c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 469.7 417 480 384 480c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 405.2 165.1 416 192 416c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z"></path>
                    </svg>
                    <div>Hồ bơi</div>
                  </div>
                ) : (
                  ""
                )}
                {phongThue.mayGiat ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 640 512">
                      <path d="M416 64a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm96 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM160 464a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM32 160l.1 72.6c.1 52.2 24 101 64 133.1c-.1-1.9-.1-3.8-.1-5.7v-8c0-71.8 37-138.6 97.9-176.7l60.2-37.6c8.6-5.4 17.9-8.4 27.3-9.4l45.9-79.5c6.6-11.5 2.7-26.2-8.8-32.8s-26.2-2.7-32.8 8.8l-78 135.1c-3.3 5.7-10.7 7.7-16.4 4.4s-7.7-10.7-4.4-16.4l62-107.4c6.6-11.5 2.7-26.2-8.8-32.8S214 5 207.4 16.5l-68 117.8 0 0 0 0-43.3 75L96 160c0-17.7-14.4-32-32-32s-32 14.4-32 32zM332.1 88.5L307.5 131c13.9 4.5 26.4 13.7 34.7 27c.9 1.5 1.8 2.9 2.5 4.4l28.9-50c6.6-11.5 2.7-26.2-8.8-32.8s-26.2-2.7-32.8 8.8zm46.4 63.7l-26.8 46.4c-.6 6-2.1 11.8-4.3 17.4H352h13.3l0 0H397l23-39.8c6.6-11.5 2.7-26.2-8.8-32.8s-26.2-2.7-32.8 8.8zM315.1 175c-9.4-15-29.1-19.5-44.1-10.2l-60.2 37.6C159.3 234.7 128 291.2 128 352v8c0 8.9 .8 17.6 2.2 26.1c35.4 8.2 61.8 40 61.8 77.9c0 6.3-.7 12.5-2.1 18.4C215.1 501 246.3 512 280 512H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H364c-6.6 0-12-5.4-12-12s5.4-12 12-12H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H364c-6.6 0-12-5.4-12-12s5.4-12 12-12H520c13.3 0 24-10.7 24-24s-10.7-24-24-24H364c-6.6 0-12-5.4-12-12s5.4-12 12-12H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H352l0 0 0 0H258.8L305 219.1c15-9.4 19.5-29.1 10.2-44.1z"></path>
                    </svg>
                    <div>Máy giặt</div>
                  </div>
                ) : (
                  ""
                )}
                {phongThue.bep ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 640 512">
                      <path d="M240 144A96 96 0 1 0 48 144a96 96 0 1 0 192 0zm44.4 32C269.9 240.1 212.5 288 144 288C64.5 288 0 223.5 0 144S64.5 0 144 0c68.5 0 125.9 47.9 140.4 112h71.8c8.8-9.8 21.6-16 35.8-16H496c26.5 0 48 21.5 48 48s-21.5 48-48 48H392c-14.2 0-27-6.2-35.8-16H284.4zM144 80a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM400 240c13.3 0 24 10.7 24 24v8h96c13.3 0 24 10.7 24 24s-10.7 24-24 24H280c-13.3 0-24-10.7-24-24s10.7-24 24-24h96v-8c0-13.3 10.7-24 24-24zM288 464V352H512V464c0 26.5-21.5 48-48 48H336c-26.5 0-48-21.5-48-48zM48 320h80 16 32c26.5 0 48 21.5 48 48s-21.5 48-48 48H160c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V336c0-8.8 7.2-16 16-16zm128 64c8.8 0 16-7.2 16-16s-7.2-16-16-16H160v32h16zM24 464H200c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
                    </svg>
                    <div>Bếp</div>
                  </div>
                ) : (
                  ""
                )}
                {phongThue.wifi ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 640 512">
                      <path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"></path>
                    </svg>
                    <div>Wifi</div>
                  </div>
                ) : (
                  ""
                )}
                {phongThue.dieuHoa ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 640 512">
                      <path d="M96 32v96H224V32c0-17.7-14.3-32-32-32H128C110.3 0 96 14.3 96 32zm0 128c-53 0-96 43-96 96V464c0 26.5 21.5 48 48 48H272c26.5 0 48-21.5 48-48V256c0-53-43-96-96-96H96zm64 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM384 48c0-1.4-1-3-2.2-3.6L352 32 339.6 2.2C339 1 337.4 0 336 0s-3 1-3.6 2.2L320 32 290.2 44.4C289 45 288 46.6 288 48c0 1.4 1 3 2.2 3.6L320 64l12.4 29.8C333 95 334.6 96 336 96s3-1 3.6-2.2L352 64l29.8-12.4C383 51 384 49.4 384 48zm76.4 45.8C461 95 462.6 96 464 96s3-1 3.6-2.2L480 64l29.8-12.4C511 51 512 49.4 512 48c0-1.4-1-3-2.2-3.6L480 32 467.6 2.2C467 1 465.4 0 464 0s-3 1-3.6 2.2L448 32 418.2 44.4C417 45 416 46.6 416 48c0 1.4 1 3 2.2 3.6L448 64l12.4 29.8zm7.2 100.4c-.6-1.2-2.2-2.2-3.6-2.2s-3 1-3.6 2.2L448 224l-29.8 12.4c-1.2 .6-2.2 2.2-2.2 3.6c0 1.4 1 3 2.2 3.6L448 256l12.4 29.8c.6 1.2 2.2 2.2 3.6 2.2s3-1 3.6-2.2L480 256l29.8-12.4c1.2-.6 2.2-2.2 2.2-3.6c0-1.4-1-3-2.2-3.6L480 224l-12.4-29.8zM448 144c0-1.4-1-3-2.2-3.6L416 128 403.6 98.2C403 97 401.4 96 400 96s-3 1-3.6 2.2L384 128l-29.8 12.4c-1.2 .6-2.2 2.2-2.2 3.6c0 1.4 1 3 2.2 3.6L384 160l12.4 29.8c.6 1.2 2.2 2.2 3.6 2.2s3-1 3.6-2.2L416 160l29.8-12.4c1.2-.6 2.2-2.2 2.2-3.6z"></path>
                    </svg>
                    <div>Điều hoà</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button className="mt-4 border-2 border-black p-3 w-[200px] hover:bg-[#E4E7EB] rounded-lg">
                Ẩn bớt tiện nghi
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[40%] border-2 border-black border-opacity-30 rounded-lg p-3 ml-3 mt-5 h-full">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold">${phongThue.giaTien}</span>/night
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 stroke-[#E31C54] fill-[#E31C54]"
                  viewBox="64 64 896 896"
                >
                  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                </svg>
                <div className="ml-1">
                  4,83 <span className="underline">(18)đánh giá</span>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-lg border-2 border-black ">
              <div className="flex border-b-2 justify-between border-black">
                <div className="relative w-full z-10">
                  <button
                    ref={startButtonRef}
                    className="p-4 w-full border-r-2 border-black"
                    onClick={handleStartButtonClick}
                  >
                    {startDate?.toLocaleDateString()
                      ? startDate.toLocaleDateString()
                      : "Ngày bắt đầu"}
                  </button>
                  {showStartCalendar && (
                    <div
                      className="absolute z-50"
                      style={{
                        top: startButtonRef.current
                          ? startButtonRef.current.offsetTop +
                            startButtonRef.current.offsetHeight
                          : 0,
                        left: startButtonRef.current
                          ? startButtonRef.current.offsetLeft
                          : 0,
                      }}
                    >
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        minDate={new Date()}
                        inline
                      />
                    </div>
                  )}
                </div>

                <div className="relative w-full">
                  <button
                    ref={endButtonRef}
                    className="p-4 w-full"
                    onClick={handleEndButtonClick}
                  >
                    {endDate?.toLocaleDateString()
                      ? endDate.toLocaleDateString()
                      : "Ngày kết thúc"}
                  </button>
                  {showEndCalendar && (
                    <div
                      className="absolute z-50"
                      style={{
                        top: endButtonRef.current
                          ? endButtonRef.current.offsetTop +
                            endButtonRef.current.offsetHeight
                          : 0,
                        left: endButtonRef.current
                          ? endButtonRef.current.offsetLeft
                          : 0,
                      }}
                    >
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        minDate={startDate ? startDate : new Date()}
                        inline
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="p-3 pb-2">Khách</div>
                <div className="w-full flex items-center justify-between p-3">
                  <button
                    className="text-white w-10 h-10 rounded-full bg-[#E31C54]"
                    onClick={() => {
                      if (luongKhach !== 1) {
                        setLuongKhach(luongKhach - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <div>{luongKhach} khách</div>
                  <button
                    className="text-white w-10 h-10 rounded-full bg-[#E31C54]"
                    onClick={() => {
                      setLuongKhach(luongKhach + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-5">
              <button
                onClick={() => {
                  handleDatPhong();
                }}
                className="p-3 w-full text-white text-md font-bold rounded-md bg-[#E31C54]"
              >
                Đặt phòng
              </button>
              <ToastContainer />
            </div>
            <div className="opacity-40 text-center w-full my-5">
              Bạn vẫn chưa bị trừ tiền
            </div>
            <div className="flex items-center justify-between">
              <div className="underline">
                {phongThue.giaTien} X{daysBetween} night
              </div>
              <div className="font-bold text-lg">
                $ {phongThue.giaTien * daysBetween}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="underline">Cleaning fee</div>
              <div className="font-bold text-lg my-3">8$</div>
            </div>
            <hr className="my-4" />
            <div className="flex items-center justify-between font-bold text-lg">
              <div>Total before tax</div>
              <div>{phongThue.giaTien * daysBetween + 8}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiTietPhongThue;
