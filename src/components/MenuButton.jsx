"use client";
import { handleVerifyAdmin } from "@/lib/features/admin/adminSlice";
import { handleNavigateToHome } from "@/lib/features/auth/loginSlice";
import { getUserInfoAction } from "@/lib/features/user/userAction";
import { handleUserLogin } from "@/lib/features/user/userSlice";
import { ACCESS_TOKEN, USER_ID } from "@/utils/constant";
import Link from "next/link";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const DropdownRef = useRef(null);
  const isUserLogin = useSelector((state) => state.userSlice.isUserLogin);
  const userInfo = useSelector((state) => state.userSlice.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickEvent = (event) => {
      if (DropdownRef.current && !DropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickEvent);
    const isUserLogin = localStorage.getItem(ACCESS_TOKEN);
    if (isUserLogin) {
      dispatch(handleUserLogin(true));
    }
    const userID = localStorage.getItem(USER_ID);
    if (userID) {
      dispatch(getUserInfoAction(userID));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_ID);
    dispatch(handleVerifyAdmin(false));
    dispatch(handleUserLogin(false));
    dispatch(handleNavigateToHome(false));
    toast.success("Đăng xuất thành công !");
  };

  return (
    <div ref={DropdownRef}>
      <ToastContainer className={"absolute"} />
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="relative p-2 pl-4 rounded-3xl border border-1  hover:bg-[#F7F7F7] transition-all duration-300 flex items-center justify-between"
      >
        <div>
          <svg
            viewBox="0 0 32 32"
            width={16}
            height={16}
            className="block mr-3"
            stroke="black"
            strokeWidth={3}
            fill="black"
          >
            <g fill="none">
              <path d="M2 16h28M2 24h28M2 8h28"></path>
            </g>
          </svg>
        </div>
        <div>
          {isUserLogin && userInfo.avatar ? (
            <img src={userInfo.avatar} alt="" className="avatar-user-upload" />
          ) : (
            <svg width={32} height={32} viewBox="0 0 32 32">
              <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"></path>
            </svg>
          )}
        </div>
      </button>
      {isOpen &&
        (isUserLogin ? (
          <div className="absolute top-[85px] bg-[#F7F7F7] shadow-custom w-[200px] rounded-lg">
            <div className="flex flex-col">
              <Link
                href="/profile"
                className="px-4 py-2 pr-8 mt-2 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Tài khoản
              </Link>
              <Link
                href=""
                className="px-4 py-2 mb-2 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              >
                Đăng xuất
              </Link>
            </div>
          </div>
        ) : (
          <div className="absolute top-[85px] bg-[#F7F7F7] shadow-custom w-[200px] rounded-lg">
            <div className="flex flex-col">
              <Link
                href="/register"
                className="px-4 py-2 pr-8 mt-2 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Đăng ký
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 mb-2 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MenuButton;
