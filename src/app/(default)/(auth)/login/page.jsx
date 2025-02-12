"use client";
import { Field, useFormik, ErrorMessage, FormikProvider } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { VscLockSmall } from "react-icons/vsc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLoading,
  handleOpenModalAlert,
} from "@/lib/features/auth/registerSlice";
import Loading from "@/app/loading";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaRegCheckCircle } from "react-icons/fa";
import { Modal, ModalHeader } from "flowbite-react";
import { handleRegisterAction } from "@/lib/features/auth/registerAction";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email không được bỏ trống !")
      .email("Email không hợp lệ !"),
    password: Yup.string().required("Mật khẩu không được bỏ trống !"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // dispatch(handleLoading(true));
      // dispatch(handleRegisterAction(values));
    },
  });

  useEffect(() => {
    setPageLoading(false);
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* BLOCK MAIN */}
      <div className="register">
        <div className="register-form">
          <div className="register-form-title">
            <div className="icon">
              <VscLockSmall />
            </div>
            <h1>Đăng Nhập</h1>
          </div>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-5">
                {/* email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email *"
                    className={`form-input ${
                      formik.touched.email && formik.errors.email
                        ? "input-error"
                        : "input-valid"
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
                {/* password */}
                <div className="form-group">
                  <label htmlFor="password">Mật Khẩu</label>
                  <div className="flex ">
                    <Field
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Mật Khẩu *"
                      title="Mật khẩu 8 - 20 ký tự. Có ít nhất 1 ký tự viết thường, 1 ký tự viết hoa và 1 ký tự đặc biệt."
                      className={`form-input ${
                        formik.touched.password && formik.errors.password
                          ? "input-error"
                          : "input-valid"
                      }`}
                    />
                    <button
                      type="button"
                      className="btn-show-password"
                      onClick={() => {
                        setPasswordVisible(!passwordVisible);
                      }}
                    >
                      {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                {/* remember account */}
              </div>

              {/* Error validation from BE */}
              {/* {validationErr.isValidationErr ? (
                <div className="err-mess-validation mt-7 flex text-red-500 text-sm bg-red-100/60 p-2 rounded-sm gap-1 items-center">
                  <HiOutlineExclamationCircle className="text-xl" />
                  {validationErr.message}
                </div>
              ) : (
                <></>
              )} */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitLoading}
                className={`btn-submit ${
                  submitLoading ? "" : "hover:bg-red-500"
                }`}
              >
                {submitLoading ? <div className="spinner"></div> : "ĐĂNG KÝ"}
              </button>
            </form>
          </FormikProvider>

          <div className="navigate">
            Bạn chưa có tài khoản?
            <Link
              href="/register"
              className="text-blue-600 hover:underline ml-1"
            >
              Đăng Ký
            </Link>
          </div>
        </div>
      </div>
      {/* BLOCK ALERT */}
      <div className="register-alert">
        <Modal
          show={openModalAlert}
          size="lg"
          className="-ml-3"
          onClose={() => {
            if (isRegisterSuccess) {
              formik.resetForm();
            }
            dispatch(handleOpenModalAlert(false));
          }}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="register-alert-info ">
              {isRegisterSuccess ? (
                <FaRegCheckCircle className="alert-icon text-teal-300 " />
              ) : (
                <HiOutlineExclamationCircle className="alert-icon text-gray-400" />
              )}
              <h2 className="title">
                {isRegisterSuccess
                  ? "Đăng ký tài khoản thành công !"
                  : "Đã có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau !"}{" "}
              </h2>
              <div className="group-btn">
                {isRegisterSuccess ? (
                  <>
                    <Link href={"/"}>
                      <Button
                        color="cyan"
                        variant="outlined"
                        className="btn"
                        onClick={() => {
                          dispatch(handleOpenModalAlert(false));
                        }}
                      >
                        Trang Chủ
                      </Button>
                    </Link>
                    <Link href={"/login"}>
                      <Button
                        color="cyan"
                        variant="solid"
                        className="btn"
                        onClick={() => {
                          dispatch(handleOpenModalAlert(false));
                        }}
                      >
                        Đăng Nhập
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    color="default"
                    variant="solid"
                    className="btn"
                    onClick={() => {
                      dispatch(handleOpenModalAlert(false));
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

export default Login;
