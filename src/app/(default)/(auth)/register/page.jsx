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
  handleValidationErr,
} from "@/lib/features/auth/registerSlice";
import Loading from "@/app/loading";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaRegCheckCircle } from "react-icons/fa";
import { Modal } from "flowbite-react";
import {
  handleRegisterAction,
  validationPayload,
} from "@/lib/features/auth/registerAction";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  const submitLoading = useSelector((state) => state.registerSlice.loading);
  const validationErr = useSelector(
    (state) => state.registerSlice.validationErr
  );
  const openModalAlert = useSelector(
    (state) => state.registerSlice.openModalAlert
  );
  const isRegisterSuccess = useSelector(
    (state) => state.registerSlice.isRegisterSuccess
  );

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Tên tài khoản không được bỏ trống !"),
    email: Yup.string()
      .required("Email không được bỏ trống !")
      .email("Email không hợp lệ !"),
    password: Yup.string()
      .required("Mật khẩu không được bỏ trống !")
      .min(8, "Mật khẩu ít nhất 8 ký tự !")
      .max(20, "Mật khẩu không quá 20 ký tự !")
      .matches(/[a-z]/, "Mật khẩu phải có ít nhất một ký tự viết thường !")
      .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một ký tự viết hoa !")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Mật khẩu phải có ít nhất một ký tự đặc biệt !"
      ),
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
      password: "",
      phone: "",
      birthday: "",
      gender: true, // true = male, false = female
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(handleLoading(true));
      dispatch(handleRegisterAction(values));
    },
  });

  useEffect(() => {
    setPageLoading(false);
    if (!formik.dirty) {
      dispatch(handleValidationErr(validationPayload(false, "")));
    }
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
            <h1>Đăng Ký</h1>
          </div>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-5">
                {/* username */}
                <div className="form-group">
                  <label htmlFor="username">Tên</label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Tên tài khoản *"
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
                {/* phone */}
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
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
                {/* birthday & gender */}
                <div className="flex justify-start gap-6">
                  {/* birthday */}
                  <div className="form-group w-1/2">
                    <label htmlFor="birthday">Ngày sinh</label>
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
                    <label htmlFor="gender">Giới tính</label>
                    <Field name="gender">
                      {({ form }) => (
                        <Select
                          defaultValue={true}
                          value={formik.values.gender}
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
                {submitLoading ? <div className="spinner"></div> : "ĐĂNG KÝ"}
              </button>
            </form>
          </FormikProvider>

          <div className="navigate">
            Bạn đã có tài khoản?
            <Link href="/login" className="text-blue-600 hover:underline ml-1">
              Đăng nhập
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
              console.log("formik.values", formik.values);
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

export default Register;
