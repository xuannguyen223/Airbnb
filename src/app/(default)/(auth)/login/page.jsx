"use client";
import { Field, useFormik, ErrorMessage, FormikProvider } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "flowbite-react";
import { FaEye, FaEyeSlash, FaRegCheckCircle } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { MdCheckBox } from "react-icons/md";
import { RiCheckboxBlankLine } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Loading from "@/app/loading";
import { EMAIL, PASSWORD } from "@/utils/constant";
import {
  handleLoading,
  handleOpenModalAlert,
  handleRememberAccount,
  handleValidationErr,
} from "@/lib/features/auth/loginSlice";
import {
  decryptData,
  handleLoginAction,
  validationPayLoad,
} from "@/lib/features/auth/loginAction";

const Login = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  const rememberAccount = useSelector(
    (state) => state.loginSlice.rememberAccount
  );
  const submitLoading = useSelector((state) => state.loginSlice.loading);
  const openModalAlert = useSelector(
    (state) => state.loginSlice.openModalAlert
  );
  const isLoginSuccess = useSelector(
    (state) => state.loginSlice.isLoginSuccess
  );
  const validationErr = useSelector((state) => state.loginSlice.validationErr);
  const navigateToHome = useSelector(
    (state) => state.loginSlice.navigateToHome
  );

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email không được bỏ trống !")
      .email("Email không hợp lệ !"),
    password: Yup.string().required("Mật khẩu không được bỏ trống !"),
  });

  const email = localStorage.getItem(EMAIL) || "";
  const encryptedPass = localStorage.getItem(PASSWORD);
  const password = encryptedPass ? decryptData(encryptedPass) : "";

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: rememberAccount ? email : "",
      password: rememberAccount ? password : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(handleLoading(true));
      dispatch(handleLoginAction(values, rememberAccount));
    },
  });

  useEffect(() => {
    setPageLoading(false);
    if (!formik.dirty) {
      dispatch(handleValidationErr(validationPayLoad(false, "")));
    }
  }, []);

  useEffect(() => {
    if (navigateToHome) {
      router.push("/");
    }
  }, [navigateToHome]);

  if (pageLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* BLOCK MAIN */}
      <div className="login">
        <div className="login-form">
          <div className="login-form-title">
            <div className="icon">
              <FaUserLarge />
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
                <div className="rememberAccount">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(handleRememberAccount(!rememberAccount));
                    }}
                  >
                    {rememberAccount ? (
                      <MdCheckBox className="MdCheckBox" />
                    ) : (
                      <RiCheckboxBlankLine className="custom_icon" />
                    )}
                  </button>
                  <p>Nhớ tài khoản</p>
                </div>
              </div>

              {/* Error validation from BE */}
              {validationErr.isValidationErr ? (
                <div className="err-mess-validation">
                  <HiOutlineExclamationCircle className="text-xl" />
                  {validationErr.message}
                </div>
              ) : (
                <></>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitLoading}
                className={`btn-submit ${
                  submitLoading ? "" : "hover:bg-red-500"
                }`}
              >
                {submitLoading ? <div className="spinner"></div> : "ĐĂNG NHẬP"}
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
      <div className="login-alert">
        <Modal
          show={openModalAlert}
          size="lg"
          className="-ml-3"
          popup
          onClose={() => {
            !isLoginSuccess && dispatch(handleOpenModalAlert(false));
          }}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="login-alert-info ">
              {isLoginSuccess ? (
                <FaRegCheckCircle className="alert-icon text-teal-300 " />
              ) : (
                <HiOutlineExclamationCircle className="alert-icon text-gray-400" />
              )}
              <h2 className="title">
                {isLoginSuccess
                  ? "Đăng nhập thành công ! Bạn sẽ được chuyển đến trang chủ"
                  : "Đã có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau !"}{" "}
              </h2>
              <div className="group-btn">
                {isLoginSuccess ? (
                  <></>
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
