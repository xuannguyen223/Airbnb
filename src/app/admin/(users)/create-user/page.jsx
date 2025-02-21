"use client";
import React, { useEffect, useState } from "react";
import { Field, useFormik, ErrorMessage, FormikProvider } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DatePicker, Select, Button } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ROLE_ADMIN, ROLE_USER } from "@/utils/constant";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { handleLoading } from "@/lib/features/admin/user/adminUserSlice";
import { createUserAction } from "@/lib/features/admin/user/adminUserAction";

const CreateUser = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isLoading = useSelector((state) => state.adminUserSlice.isLoading);

  const dispatch = useDispatch();
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
      gender: true,
      role: ROLE_USER,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(handleLoading(true));
      dispatch(createUserAction(values));
    },
  });

  return (
    <>
      {/* BLOCK MAIN */}
      <div className="admin-edit-user">
        <h2 className="title">Thêm người dùng</h2>
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
                <label htmlFor="password">
                  {" "}
                  <span className="text-customPink">*</span> Mật Khẩu
                </label>
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
                        const formatDate = dayjs(date.$d).format("DD/MM/YYYY");
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
                      onChange={(value) => form.setFieldValue("gender", value)}
                    />
                  )}
                </Field>
              </div>
              {/* role */}
              <div className="form-group">
                <label htmlFor="role" className="block">
                  Vai trò
                </label>
                <Field name="role">
                  {({ form }) => (
                    <Select
                      defaultValue={ROLE_USER}
                      value={formik.values.role}
                      className="w-32"
                      options={[
                        {
                          value: ROLE_USER,
                          label: "Khách Hàng",
                        },
                        {
                          value: ROLE_ADMIN,
                          label: "Quản Trị",
                        },
                      ]}
                      onChange={(value) => form.setFieldValue("role", value)}
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
                  isLoading ? "" : "hover:bg-indigo-600"
                }`}
                disabled={isLoading}
              >
                {isLoading ? <div className="spinner"></div> : "THÊM"}
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </>
  );
};

export default CreateUser;
