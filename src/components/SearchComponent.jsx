"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { tokenCyberSoft } from "@/utils/constant";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { layViTriTongAction } from "@/lib/features/viTri/viTriTongReducer";

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const viTriTong = useSelector((state) => state.viTriTongReducer.viTriTong);
  const DropdownSearch = useRef(null);
  const [viTri, setViTri] = useState("");
  const [tinhThanh, setTinhThanh] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const layViTri = async () => {
    try {
      const res = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/vi-tri",
        method: "GET",
        headers: {
          tokenCybersoft: tokenCyberSoft,
        },
      });
      console.log(res.data.content);
      const action = layViTriTongAction(res.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnFocus = async () => {
    try {
      const res = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/vi-tri",
        method: "GET",
        headers: {
          tokenCybersoft: tokenCyberSoft,
        },
      });
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const handleClickOutside = (event) => {
    if (
      DropdownSearch.current &&
      !DropdownSearch.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    router.push(
      `/list-city/${
        viTri == "quan-1" && tinhThanh == "Hồ Chí Minh" ? "quan-1-hcm" : viTri
      }`
    );
  };
  const convertToSlug = (text) => {
    // Đổi tất cả về chữ thường và loại bỏ dấu
    const normalized = text
      .toLowerCase()
      .normalize("NFD") // Biến đổi ký tự có dấu thành ký tự không dấu
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu (kết quả của NFD)
      .replace(/\s+/g, "-") // Thay khoảng trắng thành dấu gạch nối
      .replace(/[^a-z0-9\-]/g, "") // Loại bỏ các ký tự không phải là chữ hoặc số
      .replace(/-+/g, "-"); // Loại bỏ nhiều dấu gạch nối liên tiếp
    return normalized;
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    layViTri();
  }, []);
  return (
    <form
      onSubmit={handleSubmitSearch}
      ref={DropdownSearch}
      className="bg-white max-w-[900px] mx-auto flex justify-between items-center rounded-full overflow-hidden border border-solid border-black border-opacity-20 shadow-md"
    >
      <label className="relative group  hover:bg-[#EBEBEB] p-3 w-1/3 rounded-full pl-8 cursor-pointer">
        <div className="text-xs font-semibold">Địa điểm</div>
        <input
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleOnFocus}
          type="text"
          placeholder="Tìm kiếm điểm đến"
          className="group-hover:bg-[#EBEBEB] border-none focus:ring-transparent outline-none p-0 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
        />
      </label>
      {isOpen && (
        <div className="absolute top-[180px] z-50  p-4 rounded-lg border bg-white border-black border-opacity-25">
          <div className="mb-4">Tìm kiếm theo vị trí</div>
          <div className="h-64 overflow-y-scroll">
            {viTriTong?.map((suggestion, index) => {
              return (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue(
                      suggestion.tenViTri + ` ${suggestion.tinhThanh}`
                    );
                    setViTri(convertToSlug(suggestion.tenViTri));
                    setTinhThanh(suggestion.tinhThanh);
                    setIsOpen(false);
                  }}
                  key={index}
                  className="flex justify-start items-center"
                >
                  <div className="flex justify-center items-center h-8 w-8 mb-2 bg-black bg-opacity-10 rounded-md">
                    <i className="fa fa-map-marker-alt"></i>
                  </div>
                  <div className="p-2 -translate-y-1">
                    {suggestion.tenViTri}, {suggestion.tinhThanh}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <label className="w-1/6  hover:bg-[#EBEBEB] p-3 rounded-full cursor-pointer text-center hidden lg:block">
        <div className="text-xs font-semibold">Nhận phòng</div>
        <button className="text-sm text-black text-opacity-50">
          Thêm ngày
        </button>
      </label>
      <label className="w-1/6  hover:bg-[#EBEBEB] p-3 rounded-full cursor-pointer text-center hidden lg:block">
        <div className="text-xs font-semibold">Trả phòng</div>
        <button className="text-sm text-black text-opacity-50">
          Thêm ngày
        </button>
      </label>
      <label className="w-1/3 p-2 flex justify-between items-center cursor-pointer rounded-full hover:bg-[#EBEBEB] text-center">
        <div className="flex flex-col ">
          <div className="text-xs font-semibold">Khách</div>
          <button className="text-sm text-black text-opacity-50">
            Thêm khách
          </button>
        </div>
        <button type="submit" className="w-12 h-12 bg-[#E41B54] rounded-full">
          <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 32 32"
              className="block h-4 w-4  stroke-4 overflow-visible fill-[#E41B54] stroke-white"
            >
              <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
            </svg>
          </div>
        </button>
      </label>
    </form>
  );
};

export default SearchComponent;
