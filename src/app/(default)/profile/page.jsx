"use client";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import {
  getRentedRoomsByUserIDAction,
  getUserInfoAction,
  handleUpdateUserInfoAction,
  handleUploadUserAvatarAction,
} from "@/lib/features/user/userAction";
import { BADGE_AWARDED, idToTinhThanhMap, USER_ID } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import {
  handleBadgeAwarded,
  handleLoadingUpdateAvatar,
  handleLoadingUpdateProfile,
  handleOpenModalAlert,
  handleOpenModalUpdateAvatar,
  handleOpenModalUserInfo,
  handleUserLogin,
  handleValidationAvatar,
} from "@/lib/features/user/userSlice";
import { ACCESS_TOKEN } from "@/utils/constant";
import { FaCheck } from "react-icons/fa";
import { Modal } from "flowbite-react";
import { Field, useFormik, ErrorMessage, FormikProvider } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DatePicker, Select, Button } from "antd";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FileInput } from "flowbite-react";
import { validationPayLoad } from "@/lib/features/auth/loginAction";
import { useRouter } from "next/navigation";
import { FACILITY_NAME } from "@/utils/facilityDictionary";

const UserProfile = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const isUserLogin = useSelector((state) => state.userSlice.isUserLogin);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  console.log("userInfo: ", userInfo);
  const isBadgeAwarded = useSelector((state) => state.userSlice.isBadgeAwarded);
  const openModalUserInfo = useSelector(
    (state) => state.userSlice.openModalUserInfo
  );
  const isLoadingUpdateProfile = useSelector(
    (state) => state.userSlice.loadingUpdateProfile
  );
  const openModalAlert = useSelector((state) => state.userSlice.openModalAlert);
  const isUpdateInfoSuccess = useSelector(
    (state) => state.userSlice.isUpdateInfoSuccess
  );
  const openModalUpdateAvatar = useSelector(
    (state) => state.userSlice.openModalUpdateAvatar
  );
  const isLoadingUpdateAvatar = useSelector(
    (state) => state.userSlice.loadingUpdateAvatar
  );
  const validationAvatar = useSelector(
    (state) => state.userSlice.validationAvatar
  );
  const isRentedRoom = useSelector((state) => state.userSlice.isRentedRoom);

  const arrayRoomDetail = useSelector(
    (state) => state.userSlice.arrayRoomDetail
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const isUserLogin = localStorage.getItem(ACCESS_TOKEN);
    if (isUserLogin) {
      dispatch(handleUserLogin(true));
    }
    const userID = localStorage.getItem(USER_ID);
    if (userID) {
      dispatch(getUserInfoAction(userID));
      dispatch(getRentedRoomsByUserIDAction(userID));
    }
    const isBadgeAwarded = JSON.parse(localStorage.getItem(BADGE_AWARDED));
    if (isBadgeAwarded) {
      dispatch(handleBadgeAwarded(true));
    }
    setPageLoading(false);
  }, []);

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Tên tài khoản không được bỏ trống !"),
    phone: Yup.string().matches(
      /^(0|84|84\s)[0-9]{9}$/,
      "Số điện thoại không hợp lệ !"
    ),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      birthday: "",
      gender: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(handleLoadingUpdateProfile(true));
      dispatch(handleUpdateUserInfoAction(values, userInfo.id));
    },
  });

  // User Avatar
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    dispatch(handleValidationAvatar(validationPayLoad(false, "")));
    if (file) {
      setAvatar(file);
    } else {
      setAvatar(null);
    }
  };

  // render plus info room
  const renderPlusInfo = (facilities) => {
    const resultArray = [];
    Object.keys(facilities).forEach((key) => {
      if (facilities[key] === true) {
        let finalKey = key;
        if (key in FACILITY_NAME) finalKey = FACILITY_NAME[key];
        resultArray.push(finalKey);
      }
    });
    return resultArray.join(" . ");
  };

  const navigateToRoomDetails = (locationID, roomID) => {
    let finalLocationID = locationID;
    if (locationID in idToTinhThanhMap)
      finalLocationID = idToTinhThanhMap[locationID];
    router.push(`list-city/${finalLocationID}/${roomID}`);
  };

  // render Rented Room
  const handleRenderRentedRoom = () => {
    return arrayRoomDetail.map((room) => {
      return (
        <div
          key={room.bookingID}
          className="room"
          onClick={() => {
            navigateToRoomDetails(room.maViTri, room.id);
          }}
        >
          <div className="img">
            <img
              src={room.hinhAnh || "/img/bg-login-register.avif"}
              alt=""
              className="image"
            />
          </div>
          <div className="info">
            <p className="booking-id">Mã Đặt Phòng: {room.bookingID}</p>
            <h2 className="room-name">{room.tenPhong}</h2>
            <hr />
            <div className="basic-info">
              {room.khach} khách . {room.phongNgu} phòng ngủ . {room.giuong}{" "}
              giường . {room.phongTam} phòng tắm
            </div>
            <div className="plus-info">{renderPlusInfo(room)}</div>
            <div className="price">
              ${room.giaTien} / <span className="font-normal ml-1"> đêm</span>
            </div>
          </div>
        </div>
      );
    });
  };

  if (pageLoading) {
    return <Loading />;
  }

  if (!isUserLogin) {
    return <NotFound />;
  }

  return (
    <>
      <div className="user-profile-banner">
        <h1 className="relative">THÔNG TIN NGƯỜI DÙNG {userInfo.name}</h1>
      </div>
      <div className="user-profile">
        {/* BLOCK LEFT */}
        <div className="info-left">
          <div className="user-avatar">
            {userInfo.avatar ? (
              <img src={userInfo.avatar} alt="" className="avatar-upload " />
            ) : (
              <FaUserCircle className="avatar-default" />
            )}
            <button
              className="update-avatar"
              onClick={() => {
                dispatch(handleOpenModalUpdateAvatar(true));
              }}
            >
              Cập nhật ảnh
            </button>
          </div>
          <div className="verify-id">
            <div className="badge">
              {isBadgeAwarded && (
                <img src="/img/icon-verify.png" alt="" className="w-8" />
              )}
              <h1>Xác minh danh tính</h1>
            </div>
            <p>Xác minh danh tính của bạn với huy hiệu xác minh danh tính.</p>
            <button
              className={`btn-award-badge ${
                isBadgeAwarded ? "bg-gray-100" : "false"
              } `}
              disabled={isBadgeAwarded}
              onClick={() => {
                localStorage.setItem(BADGE_AWARDED, JSON.stringify(true));
                dispatch(handleBadgeAwarded(true));
              }}
            >
              {isBadgeAwarded ? "Đã nhận huy hiệu" : "Nhận huy hiệu"}
            </button>
          </div>
          <hr />
          <div className="verify-email">
            <h1 className="title">{userInfo.name} đã xác nhận</h1>
            <div className="info ">
              <FaCheck className="text-gray-400" />
              Địa chỉ email
            </div>
          </div>
        </div>
        {/* BLOCK RIGHT */}
        <div className="info-right">
          <h2 className="title">
            Xin chào <span className="capitalize">{userInfo.name}</span> !
          </h2>
          <p className="basic-user-info">
            Email: {userInfo.email} . Ngày sinh: {userInfo.birthday || "....."}{" "}
            . Giới tính: {userInfo.gender ? "Nam" : "Nữ"} . Số điện thoại:{" "}
            {userInfo.phone || "....."} . Bắt đầu tham gia vào{" "}
            {userInfo.id > 4500 ? "2025" : "2024"} .
          </p>
          <p></p>
          {/* btn Edit Profile */}
          <button
            className="edit-profile"
            onClick={() => {
              dispatch(handleOpenModalUserInfo(true));
              formik.setFieldValue("email", userInfo.email);
              formik.setFieldValue("username", userInfo.name);
              formik.setFieldValue("phone", userInfo.phone);
              formik.setFieldValue("gender", userInfo.gender);
              formik.setFieldValue("birthday", userInfo.birthday);
            }}
          >
            Chỉnh sửa hồ sơ
          </button>
          {/* Rented Rooms Information */}
          <div className="rented-rooms-information">
            <h1 className="title">Phòng đã thuê</h1>
            <div className="room-group">
              {isRentedRoom ? (
                handleRenderRentedRoom() || (
                  <p>
                    {" "}
                    Đã có lỗi xảy ra trong quá trình lấy thông tin phòng thuê{" "}
                  </p>
                )
              ) : (
                <p>Bạn chưa đặt phòng nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* BLOCK MODAL */}
      {/* user info modal */}
      <div className="user-info-modal">
        <Modal
          show={openModalUserInfo}
          size="4xl"
          popup
          className="backdrop-blur-sm"
          onClose={() => {
            dispatch(handleOpenModalUserInfo(false));
          }}
        >
          <Modal.Header />
          <Modal.Body>
            <h1 className="user-info-title">Chỉnh sửa hồ sơ</h1>
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <div className="user-info-field">
                  {/* username */}
                  <div className="form-group">
                    <label htmlFor="username" className="block">
                      <span className="text-customPink">*</span> Tên
                    </label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Tên tài khoản"
                      className={`form-input ${
                        formik.touched.username && formik.errors.username
                          ? "input-error"
                          : "input-valid"
                      }`}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  {/* email */}
                  <div className="form-group">
                    <label htmlFor="email" className="block">
                      <span className="text-customPink">*</span> Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      disabled={true}
                      className="form-input input-disabled"
                    />
                  </div>
                  {/* phone */}
                  <div className="form-group">
                    <label htmlFor="phone" className="block">
                      Số điện thoại
                    </label>
                    <Field
                      type="text"
                      name="phone"
                      placeholder="Số điện thoại"
                      className={`form-input ${
                        formik.touched.phone && formik.errors.phone
                          ? "input-error"
                          : "input-valid"
                      }`}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  {/* birthday */}
                  <div className="form-group">
                    <label htmlFor="birthday" className="block">
                      Ngày sinh
                    </label>
                    <Field name="birthday">
                      {({ form }) => (
                        <DatePicker
                          id="birthday"
                          name="birthday"
                          size="large"
                          format={"DD/MM/YYYY"}
                          maxDate={dayjs()}
                          placeholder="Chọn ngày sinh"
                          value={
                            formik.values.birthday
                              ? dayjs(formik.values.birthday, "DD/MM/YYYY")
                              : null
                          }
                          className={"form-input"}
                          onChange={(date) => {
                            if (date === null) {
                              form.setFieldValue("birthday", "");
                              return;
                            }
                            const formatDate = dayjs(date.$d).format(
                              "DD/MM/YYYY"
                            );
                            form.setFieldValue("birthday", formatDate);
                          }}
                        />
                      )}
                    </Field>
                  </div>
                  {/* gender */}
                  <div className="form-group">
                    <label htmlFor="gender" className="block">
                      Giới tính
                    </label>
                    <Field name="gender">
                      {({ form }) => (
                        <Select
                          defaultValue={true}
                          value={formik.values.gender}
                          className="w-32"
                          options={[
                            {
                              value: true,
                              label: "Nam",
                            },
                            {
                              value: false,
                              label: "Nữ",
                            },
                          ]}
                          onChange={(value) =>
                            form.setFieldValue("gender", value)
                          }
                        />
                      )}
                    </Field>
                  </div>
                </div>
                {/* Submit */}
                <div className="user-info-submit ">
                  <button
                    type="submit"
                    className={`btn-submit ${
                      isLoadingUpdateProfile ? "" : "hover:bg-indigo-600"
                    }`}
                    disabled={isLoadingUpdateProfile}
                  >
                    {isLoadingUpdateProfile ? (
                      <div className="spinner"></div>
                    ) : (
                      "CẬP NHẬT"
                    )}
                  </button>
                </div>
              </form>
            </FormikProvider>
          </Modal.Body>
        </Modal>
      </div>
      {/* user avatar modal */}
      <div className="update-user-avatar-modal">
        <Modal
          show={openModalUpdateAvatar}
          size="4xl"
          popup
          className="backdrop-blur-sm"
          onClose={() => {
            dispatch(handleOpenModalUpdateAvatar(false));
          }}
        >
          <Modal.Header />
          <Modal.Body>
            <h1 className="user-info-title">Cập nhật ảnh đại diện</h1>
            <div id="fileUpload" className="modal-user-avatar">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Selected-Avatar"
                  className="avatar"
                />
              ) : (
                <FaUserCircle className="avatar-default" />
              )}
              <FileInput
                id="file"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-10"
              />
              <div className="validation">
                {avatar
                  ? ""
                  : "Vui lòng chọn hình trước khi cập nhật ảnh đại diện !"}
                <h2>
                  {validationAvatar.isValidationErr &&
                    validationAvatar.message.concat(" !")}{" "}
                </h2>
              </div>
            </div>
            {/* Submit */}
            <div className="user-info-submit">
              <button
                type="submit"
                className={`btn-submit ${
                  isLoadingUpdateAvatar || !avatar ? "" : "hover:bg-indigo-600"
                }`}
                // disabled={isLoadingUpdateAvatar}
                disabled={isLoadingUpdateAvatar || !avatar}
                onClick={() => {
                  if (avatar) {
                    dispatch(handleUploadUserAvatarAction(avatar));
                    dispatch(handleLoadingUpdateAvatar(true));
                  }
                }}
              >
                {isLoadingUpdateAvatar ? (
                  <div className="spinner"></div>
                ) : (
                  "CẬP NHẬT"
                )}
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {/* BLOCK ALERT */}
      <div className="user-profile-alert">
        <Modal
          show={openModalAlert}
          size="lg"
          onClose={() => {
            dispatch(handleOpenModalAlert(false));
          }}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="user-profile-alert-info">
              {isUpdateInfoSuccess ? (
                <FaRegCheckCircle className="alert-icon text-teal-300 " />
              ) : (
                <HiOutlineExclamationCircle className="alert-icon text-gray-400" />
              )}
              <h2 className="title">
                {isUpdateInfoSuccess
                  ? "Cập nhật thông tin thành công !"
                  : "Đã có lỗi xảy ra trong quá trình thực hiện. Vui lòng thử lại sau !"}{" "}
              </h2>
              <div className="group-btn">
                {isUpdateInfoSuccess ? (
                  <></>
                ) : (
                  <Button
                    color="default"
                    variant="solid"
                    className="btn"
                    onClick={() => {
                      dispatch(handleOpenModalAlert(false));
                      dispatch(handleOpenModalUserInfo(false));
                      dispatch(handleOpenModalUpdateAvatar(false));
                    }}
                  >
                    Đóng
                  </Button>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default UserProfile;
