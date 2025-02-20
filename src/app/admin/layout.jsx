"use client";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { verifyAdminAction } from "../../Redux/Actions/adminAction";
import { ACCESS_TOKEN, USER_ID } from "@/utils/constant";
import NotFound from "../not-found";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { FaUsersCog } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineLocationCity } from "react-icons/md";
import Loading from "../loading";
import { handleUserLogin } from "@/lib/features/user/userSlice";
import { getUserInfoAction } from "@/lib/features/user/userAction";

export default function AdminLayout({ children }) {
  const [pageLoading, setPageLoading] = useState(true);
  const [openAlertLogout, setOpenAlertLogout] = useState(false);
  const isUserLogin = useSelector((state) => state.userSlice.isUserLogin);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  console.log("userInfo: ", userInfo);
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_ID);
  };

  useEffect(() => {
    const isUserLogin = localStorage.getItem(ACCESS_TOKEN);
    if (isUserLogin) {
      dispatch(handleUserLogin(true));
    }
    const userID = localStorage.getItem(USER_ID);
    if (userID) {
      dispatch(getUserInfoAction(userID));
    }
    setPageLoading(false);
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  if (!isUserLogin || userInfo.role !== "USER") {
    return <NotFound />;
  }

  return (
    <>
      {/* BLOCK MAIN */}
      <div className="admin">
        {/* BLOCK DASHBOARD */}
        <div className="dashboard">
          <div className="admin-logo">
            <img src="https://i.imgur.com/lC22izJ.png" alt="" width={50} />
            <h1 className="group-name">BC77 NHÓM 2</h1>
          </div>
          <div className="admin-menu">
            {/* users */}
            <Link
              href={"/admin"}
              className={
                pathName === "/admin" ? "link-active" : "link-noActive"
              }
            >
              <FaUsersCog className="inline text-2xl" />
              <span className="ml-2"> NGƯỜI DÙNG</span>
            </Link>
            {/* rooms */}
            <Link
              href={"/admin/rooms"}
              className={
                pathName === "/admin/rooms" ? "link-active" : "link-noActive"
              }
            >
              <MdOutlineLocationCity className="inline text-2xl" />
              <span className="ml-2">THÔNG TIN PHÒNG</span>
            </Link>
            {/* bookings */}
            <Link
              href={"/admin/bookings"}
              className={
                pathName === "/admin/bookings" ? "link-active" : "link-noActive"
              }
            >
              <FaBookmark className="inline lg:text-xl text-sm" />
              <span className="ml-2"> ĐẶT PHÒNG</span>
            </Link>
            {/* locations */}
            <Link
              href={"/admin/locations"}
              className={
                pathName === "/admin/locations"
                  ? "link-active"
                  : "link-noActive"
              }
            >
              <FaMapLocationDot className="inline text-xl" />
              <span className="ml-2">THÔNG TIN VỊ TRÍ</span>
            </Link>
          </div>
          <div className="admin-back-home">
            <Link href="/">
              <FaArrowLeft className="FaArrowLeft" />
              <span className="ml-2">BACK TO HOME</span>
            </Link>
          </div>
        </div>
        {/*  BLOCK OUTLET */}
        <div className="outlet">
          <div className="top-outlet">
            <div className="admin-info">
              Quản trị viên
              <span className="adminName">{userInfo.name}</span>
              <div className="content">
                <p>
                  Tên:
                  <span>{userInfo.name}</span>
                </p>
                <p>
                  SDT:
                  <span>{userInfo.phone ? userInfo.phone : "..."}</span>
                </p>
                <p>
                  Email:
                  <span>{userInfo.email}</span>
                </p>
              </div>
            </div>
            <button
              className="btn-logOut"
              onClick={() => {
                handleLogout();
                setOpenAlertLogout(true);
                setTimeout(() => {
                  setOpenAlertLogout(false);
                  router.push("/");
                }, 1000);
              }}
            >
              Đăng xuất
            </button>
          </div>
          <div className="main-outlet">{children}</div>
        </div>
      </div>
      {/* BLOCK MODAL */}
      <div className="alert-logout">
        <Modal
          show={openAlertLogout}
          size="lg"
          popup
          onClose={() => {
            setOpenAlertLogout(false);
          }}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="alert-logout-info">
              <FaRegCheckCircle className="alert-icon text-green-300" />
              <h3 className="title">
                Đăng xuất thành công ! Bạn sẽ được chuyển hướng về trang chủ.
              </h3>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
