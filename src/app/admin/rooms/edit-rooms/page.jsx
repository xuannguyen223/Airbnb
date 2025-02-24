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
    const roomInfo = useSelector((state) => state.adminRoomSlice.selectedRoomInfo);
    const dispatch = useDispatch();

  
  const validationSchema = Yup.object({
    tenPhong: Yup.string().required("Tên phòng không được bỏ trống !"),
    giaTien: Yup.number().required("Giá tiền không được bỏ trống !").min(1, "Giá tiền phải lớn hơn 0"),
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
        <div className="admin-edit-room">
        <h2 className="title">Cập nhật thông tin phòng</h2>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
            <div className="room-info-field">
                {/* Tên phòng */}
                <div className="form-group">
                <label htmlFor="tenPhong" className="block">Tên phòng</label>
                <Field type="text" name="tenPhong" className="form-input" />
                <ErrorMessage name="tenPhong" component="div" className="error-message" />
                </div>
                {/* Giá tiền */}
                <div className="form-group">
                <label htmlFor="giaTien" className="block">Giá tiền</label>
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
                <ErrorMessage name="giaTien" component="div" className="error-message" />
                </div>
                {/* Số khách */}
                <div className="form-group">
                <label htmlFor="khach" className="block">Số khách</label>
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
                <ErrorMessage name="khach" component="div" className="error-message" />
                </div>
                {/* Ngày cập nhật */}
                <div className="form-group">
                <label htmlFor="updatedAt" className="block">Ngày cập nhật</label>
                <Field name="updatedAt">
                    {({ form }) => (
                    <DatePicker
                    id="updatedAt"
                    name="updatedAt"
                    size="large"
                    format={"DD/MM/YYYY"}
                    maxDate={dayjs()}
                    placeholder="Chọn ngày cập nhật"
                    value={roomInfo.updatedAt ? dayjs(roomInfo.updatedAt, "DD/MM/YYYY") : null}
                    className="form-input"
                    disabled
                    />
                    )}
                </Field>
                </div>
            </div>
            {/* Submit */}
            <div className="room-info-submit">
                <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? <div className="spinner"></div> : "CẬP NHẬT"}
                </button>
            </div>
            </form>
        </FormikProvider>
        </div>
    );
};

export default EditRoom;
