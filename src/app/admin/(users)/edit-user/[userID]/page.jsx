"use client";
import React from "react";
import { Field, useFormik, ErrorMessage, FormikProvider } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DatePicker, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ROLE_ADMIN, ROLE_USER } from "@/utils/constant";
import { handleLoading } from "@/lib/features/admin/user/adminUserSlice";
import { editUserAction } from "@/lib/features/admin/user/adminUserAction";

const EditUser = () => {
  const isLoading = useSelector((state) => state.adminUserSlice.isLoading);
  const userInfo = useSelector(
    (state) => state.adminUserSlice.selectedUserInfo
  );

  const dispatch = useDispatch();
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
      username: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone || "",
      birthday: userInfo.birthday,
      gender: userInfo.gender,
      role: userInfo.role || ROLE_USER,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(handleLoading(true));
      dispatch(editUserAction(values, userInfo.id));
    },
  });

  return (
    <>
      {/* BLOCK MAIN */}
      <div className="admin-edit-user">
        <h2 className="title">Cập nhật thông tin người dùng</h2>
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
                {isLoading ? <div className="spinner"></div> : "CẬP NHẬT"}
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </>
  );
};

export default EditUser;
