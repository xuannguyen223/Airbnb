"use client";
import React, { useState } from "react";
import { Field, useFormik, ErrorMessage, FormikProvider } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createRoomAction } from "@/lib/features/admin/room/adminRoomAction";
import { handleLoading } from "@/lib/features/admin/room/adminRoomSlice";
import { Input, Button } from "antd";

const CreateRoom = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminRoomSlice.isLoading);

  // Validation Schema
  const validationSchema = Yup.object({
    tenPhong: Yup.string().required("Tên phòng không được bỏ trống !"),
    khach: Yup.number()
      .required("Số lượng khách không được bỏ trống !")
      .positive("Số lượng khách phải là số dương !"),
    phongNgu: Yup.number().required("Số lượng phòng ngủ không được bỏ trống !"),
    giuong: Yup.number().required("Số lượng giường không được bỏ trống !"),
    phongTam: Yup.number().required("Số lượng phòng tắm không được bỏ trống !"),
    moTa: Yup.string().required("Mô tả không được bỏ trống !"),
    giaTien: Yup.number().required("Giá tiền không được bỏ trống !"),
    maViTri: Yup.string().required("Mã vị trí không được bỏ trống !"),
    hinhAnh: Yup.string().required("Hình ảnh không được bỏ trống !"),
  });

  const formik = useFormik({
    initialValues: {
      tenPhong: "",
      khach: "",
      phongNgu: "",
      giuong: "",
      phongTam: "",
      moTa: "",
      giaTien: "",
      maViTri: "",
      hinhAnh: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(handleLoading(true));
      dispatch(createRoomAction(values));
    },
  });

  return (
    <div className="admin-create-room p-10">
      <h2 className="title text-2xl capitalize mb-8 font-semibold">
        Thêm Phòng Mới
      </h2>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="room-info-field grid lg:grid-cols-2 gap-y-8 gap-x-6">
            {Object.keys(formik.initialValues).map((field) => (
              <div className="form-group" key={field}>
                <label htmlFor={field} className="block">
                  {field.toUpperCase()}
                </label>
                <Field
                  type="text"
                  name={field}
                  placeholder={field}
                  className={`form-input ${
                    formik.touched[field] && formik.errors[field]
                      ? "input-error"
                      : "input-valid"
                  }`}
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="error-message"
                />
              </div>
            ))}
          </div>
          <div className="room-info-submit mt-10 flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              className="px-4 py-5 uppercase"
            >
              {isLoading ? "Đang xử lý..." : "Thêm Phòng"}
            </Button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default CreateRoom;
