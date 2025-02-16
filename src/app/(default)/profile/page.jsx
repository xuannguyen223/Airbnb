"use client";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import { getUserInfoAction } from "@/lib/features/user/userAction";
import { BADGE_AWARDED, USER_ID } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import {
  handleBadgeAwarded,
  handleUserLogin,
} from "@/lib/features/user/userSlice";
import { ACCESS_TOKEN } from "@/utils/constant";
import { FaCheck } from "react-icons/fa";

const UserProfile = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const isUserLogin = useSelector((state) => state.userSlice.isUserLogin);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const isBadgeAwarded = useSelector((state) => state.userSlice.isBadgeAwarded);
  // console.log("isBadgeAwarded: ", isBadgeAwarded);
  // console.log("userInfo: ", userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const isUserLogin = localStorage.getItem(ACCESS_TOKEN);
    if (isUserLogin) {
      dispatch(handleUserLogin(true));
    }
    const userID = localStorage.getItem(USER_ID);
    dispatch(getUserInfoAction(userID));
    const isBadgeAwarded = JSON.parse(localStorage.getItem(BADGE_AWARDED));
    if (isBadgeAwarded) {
      dispatch(handleBadgeAwarded(true));
    }
    setPageLoading(false);
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  if (!isUserLogin) {
    return <NotFound />;
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="user-profile-banner">
          <h1 className="relative">THÔNG TIN NGƯỜI DÙNG {userInfo.name}</h1>
        </div>
        <div className="user-profile">
          <div className="info-left">
            <FaUserCircle className="text-9xl w-full my-3" />
            <button className="underline font-bold text-sm mt-2">
              Cập nhật ảnh
            </button>
            <div className="verify flex flex-start items-center gap-2 text-xl font-bold mt-3">
              {isBadgeAwarded && (
                <img src="/img/icon-verify.png" alt="" className="w-8" />
              )}
              <h1>Xác minh danh tính</h1>
            </div>
            <p className="text-sm my-7">
              Xác minh danh tính của bạn với huy hiệu xác minh danh tính.
            </p>
            <button
              className={`text-left mb-6 border border-gray-300 rounded-md w-fit py-1 px-3 text-sm ${
                isBadgeAwarded
                  ? "bg-gray-100"
                  : "hover:text-blue-500 hover:border-blue-400 duration-300 hover:shadow-custom-blue"
              } `}
              disabled={isBadgeAwarded}
              onClick={() => {
                localStorage.setItem(BADGE_AWARDED, JSON.stringify(true));
                dispatch(handleBadgeAwarded(true));
              }}
            >
              {isBadgeAwarded ? "Đã nhận huy hiệu" : "Nhận huy hiệu"}
            </button>
            <hr />
            <h1 className="my-6 uppercase text-xl font-bold">
              {userInfo.name} đã xác nhận
            </h1>
            <div className="flex gap-2 items-center">
              <FaCheck className="text-gray-400" />
              Địa chỉ email
            </div>
          </div>
          <div className="info-right">
            <h2 className="text-xl">
              Xin chào, tôi là{" "}
              <span className="capitalize">{userInfo.name}</span>
            </h2>
            <p className="my-4 text-gray-500 text-sm">
              Bắt đầu tham gia vào {userInfo.id > 4500 ? "2025" : "2024"}
            </p>
            <button className="underline text-gray-700">Chỉnh sửa hồ sơ</button>
            <h1 className="my-3 text-2xl">Phòng đã thuê</h1>
            <p className="">Bạn chưa đặt phòng nào.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
