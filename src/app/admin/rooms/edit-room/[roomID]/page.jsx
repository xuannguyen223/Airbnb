"use client";

import React from "react";
import { Field, useFormik, ErrorMessage, FormikProvider } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import { handleLoading } from "@/lib/features/admin/room/adminRoomSlice";
import { editRoomAction } from "@/lib/features/admin/room/adminRoomAction";

const EditRoom = () => {
  const isLoading = useSelector((state) => state.adminRoomSlice.isLoading);
  const roomInfo = useSelector(
    (state) => state.adminRoomSlice.selectedRoomInfo
  );
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    tenPhong: Yup.string().required("Tên phòng không được bỏ trống !"),
    giaTien: Yup.number()
      .required("Giá tiền không được bỏ trống !")
      .min(1, "Giá tiền phải lớn hơn 0"),
    khach: Yup.number().min(1, "Số khách phải lớn hơn 0"),
  });

  const formik = useFormik({
    initialValues: {
      tenPhong: roomInfo.tenPhong || "",
      khach: roomInfo.khach || 1,
      phongNgu: roomInfo.phongNgu || 1,
      giuong: roomInfo.giuong || 1,
      phongTam: roomInfo.phongTam || 1,
      moTa: roomInfo.moTa || "",
      giaTien: roomInfo.giaTien || 100000,
      maViTri: roomInfo.maViTri || "",
      hinhAnh: roomInfo.hinhAnh || "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(handleLoading(true));
      dispatch(editRoomAction(values, roomInfo.id));
    },
  });

  return (
    <div className="admin-edit-room p-10">
      <h2 className="title capitalize text-2xl font-semibold mb-10">
        Cập nhật thông tin phòng
      </h2>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="room-info-field grid lg:grid-cols-2 gap-y-8 gap-x-6">
            {/* Tên phòng */}
            <div className="form-group">
              <label htmlFor="tenPhong" className="block">
                Tên phòng
              </label>
              <Field
                type="text"
                name="tenPhong"
                className="form-input border-gray-300"
              />
              <ErrorMessage
                name="tenPhong"
                component="div"
                className="error-message"
              />
            </div>
            {/* Giá tiền */}
            <div className="form-group">
              <label htmlFor="giaTien" className="block">
                Giá tiền
              </label>
              <Field name="giaTien">
                {({ form }) => (
                  <InputNumber
                    min={1}
                    value={formik.values.giaTien}
                    onChange={(value) => form.setFieldValue("giaTien", value)}
                    className="form-input"
                  />
                )}
              </Field>
              <ErrorMessage
                name="giaTien"
                component="div"
                className="error-message"
              />
            </div>
            {/* Số khách */}
            <div className="form-group">
              <label htmlFor="khach" className="block">
                Số khách
              </label>
              <Field name="khach">
                {({ form }) => (
                  <InputNumber
                    min={1}
                    value={formik.values.khach}
                    onChange={(value) => form.setFieldValue("khach", value)}
                    className="form-input"
                  />
                )}
              </Field>
              <ErrorMessage
                name="khach"
                component="div"
                className="error-message"
              />
            </div>
            {/* Phòng ngủ */}
            <div className="form-group">
              <label htmlFor="phongNgu" className="block">
                Số phòng ngủ
              </label>
              <Field name="phongNgu">
                {({ form }) => (
                  <InputNumber
                    min={1}
                    value={formik.values.phongNgu}
                    onChange={(value) => form.setFieldValue("phongNgu", value)}
                    className="form-input"
                  />
                )}
              </Field>
              <ErrorMessage
                name="phongNgu"
                component="div"
                className="error-message"
              />
            </div>
            {/* Giường */}
            <div className="form-group">
              <label htmlFor="giuong" className="block">
                Số giường
              </label>
              <Field name="giuong">
                {({ form }) => (
                  <InputNumber
                    min={1}
                    value={formik.values.giuong}
                    onChange={(value) => form.setFieldValue("giuong", value)}
                    className="form-input"
                  />
                )}
              </Field>
              <ErrorMessage
                name="giuong"
                component="div"
                className="error-message"
              />
            </div>
            {/* Phòng Tắm */}
            <div className="form-group">
              <label htmlFor="phongTam" className="block">
                Số phòng tắm
              </label>
              <Field name="phongTam">
                {({ form }) => (
                  <InputNumber
                    min={1}
                    value={formik.values.phongTam}
                    onChange={(value) => form.setFieldValue("phongTam", value)}
                    className="form-input"
                  />
                )}
              </Field>
              <ErrorMessage
                name="phongTam"
                component="div"
                className="error-message"
              />
            </div>
            {/* Mã vị trí */}
            <div className="form-group">
              <label htmlFor="maViTri" className="block">
                Mã Vị Trí
              </label>
              <Field name="maViTri">
                {({ form }) => (
                  <InputNumber
                    min={1}
                    value={formik.values.maViTri}
                    onChange={(value) => form.setFieldValue("maViTri", value)}
                    className="form-input"
                  />
                )}
              </Field>
              <ErrorMessage
                name="maViTri"
                component="div"
                className="error-message"
              />
            </div>
            {/* Hình ảnh */}
            <div className="form-group">
              <label htmlFor="hinhAnh" className="block">
                Hình ảnh
              </label>
              <Field
                name="hinhAnh"
                type="text"
                className="form-input border-gray-300"
              />

              <ErrorMessage
                name="hinhAnh"
                component="div"
                className="error-message"
              />
            </div>
            {/* Mô tả */}
            <div className="form-group">
              <label htmlFor="moTa" className="block">
                Mô tả
              </label>
              <Field
                type="text"
                name="moTa"
                className="form-input border-gray-300"
              />
              <ErrorMessage
                name="moTa"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          {/* Submit */}
          <div className="room-info-submit flex justify-end mt-10">
            <button
              type="submit"
              className="btn-submit bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-700 "
              disabled={isLoading}
            >
              {isLoading ? <div className="spinner"></div> : "CẬP NHẬT"}
            </button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default EditRoom;
