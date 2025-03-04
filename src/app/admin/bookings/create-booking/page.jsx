"use client";
import React, { useEffect, useState } from "react";
import { Field, useFormik, ErrorMessage, FormikProvider } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DatePicker, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getArrayRooms } from "@/lib/features/admin/room/adminRoomAction";
import { handleLoading } from "@/lib/features/admin/booking/adminBookingSlice";
import { createBookingAction } from "@/lib/features/admin/booking/adminBookingAction";

const CreateBooking = () => {
  const isLoading = useSelector((state) => state.adminUserSlice.isLoading);
  const arrayRooms = useSelector((state) => state.adminRoomSlice.arrayRooms);
  const [maxGuests, setMaxGuests] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArrayRooms());
  }, []);

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    roomID: Yup.string().required("Vui lòng chọn phòng !"),
    checkIn: Yup.string().required("Vui lòng chọn ngày nhận phòng !"),
    checkOut: Yup.string().required("Vui lòng chọn ngày trả phòng !"),
    numberOfGuests: Yup.number()
      .required("Vui lòng nhập số lượng khách !")
      .positive("Số khách tối thiểu là 1 !")
      .max(maxGuests, `Số khách tối đa bạn có thể đặt là ${maxGuests}!`),
    userID: Yup.number().required("Vui lòng nhập mã khách hàng !"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      roomID: "",
      checkIn: "",
      checkOut: "",
      numberOfGuests: "",
      userID: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(handleLoading(true));
      dispatch(createBookingAction(values));
    },
  });

  return (
    <>
      {/* BLOCK MAIN */}
      <div className="admin-edit-user">
        <h2 className="title">Đặt phòng</h2>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="user-info-field">
              {/* roomID */}
              <div className="form-group">
                <label htmlFor="roomID" className="block">
                  <span className="text-customPink">*</span> Chọn phòng
                </label>
                <Field name="roomID">
                  {({ form }) => (
                    <Select
                      id="roomID"
                      name="roomID"
                      size="large"
                      placeholder="Chọn phòng"
                      value={formik.values.roomID || 1}
                      onChange={(value) => {
                        form.setFieldValue("roomID", value);
                        const selectedRoom = arrayRooms.find(
                          (room) => room.id === value
                        );
                        if (selectedRoom) {
                          setMaxGuests(selectedRoom.khach);
                        }
                      }}
                    >
                      {arrayRooms.map((room) => (
                        <Select.Option key={room.id} value={room.id}>
                          {`Phòng: ${room.id} - ${room.tenPhong}`}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="roomID"
                  component="div"
                  className="error-message"
                />
              </div>
              {/* userID */}
              <div className="form-group">
                <label htmlFor="userID" className="block">
                  <span className="text-customPink">*</span> Mã khách hàng
                </label>
                <Field
                  type="number"
                  name="userID"
                  placeholder="Nhập mã khách hàng"
                  className={`form-input input-valid`}
                />
                <ErrorMessage
                  name="userID"
                  component="div"
                  className="error-message"
                />
              </div>
              {/* checkIn */}
              <div className="form-group">
                <label htmlFor="checkIn" className="block">
                  <span className="text-customPink">*</span> Ngày nhận phòng
                </label>
                <Field name="checkIn">
                  {({ form }) => (
                    <DatePicker
                      id="checkIn"
                      name="checkIn"
                      size="large"
                      format={"DD/MM/YYYY"}
                      minDate={dayjs()}
                      placeholder="Chọn ngày nhận phòng"
                      value={
                        formik.values.checkIn
                          ? dayjs(formik.values.checkIn, "DD/MM/YYYY")
                          : null
                      }
                      className={"form-input"}
                      onChange={(date) => {
                        if (date === null) {
                          form.setFieldValue("checkIn", "");
                          return;
                        }
                        const formatDate = dayjs(date.$d).format("DD/MM/YYYY");
                        form.setFieldValue("checkIn", formatDate);
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="checkIn"
                  component="div"
                  className="error-message"
                />
              </div>
              {/* checkOut */}
              <div className="form-group">
                <label htmlFor="checkOut" className="block">
                  <span className="text-customPink">*</span> Ngày trả phòng
                </label>
                <Field name="checkOut">
                  {({ form }) => (
                    <DatePicker
                      id="checkOut"
                      name="checkOut"
                      size="large"
                      format={"DD/MM/YYYY"}
                      minDate={
                        formik.values.checkIn
                          ? dayjs(formik.values.checkIn, "DD/MM/YYYY").add(
                              1,
                              "day"
                            )
                          : dayjs()
                      }
                      placeholder="Chọn ngày trả phòng"
                      value={
                        formik.values.checkOut
                          ? dayjs(formik.values.checkOut, "DD/MM/YYYY")
                          : null
                      }
                      className={"form-input"}
                      onChange={(date) => {
                        if (date === null) {
                          form.setFieldValue("checkOut", "");
                          return;
                        }
                        const formatDate = dayjs(date.$d).format("DD/MM/YYYY");
                        form.setFieldValue("checkOut", formatDate);
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="checkOut"
                  component="div"
                  className="error-message"
                />
              </div>
              {/* numberOfGuests */}
              <div className="form-group">
                <label htmlFor="numberOfGuests" className="block">
                  <span className="text-customPink">*</span> Số lượng khách
                </label>
                <Field
                  type="number"
                  min="1"
                  name="numberOfGuests"
                  placeholder="Nhập số khách"
                  className={`form-input  input-valid`}
                />
                <ErrorMessage
                  name="numberOfGuests"
                  component="div"
                  className="error-message"
                />
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
                {isLoading ? <div className="spinner"></div> : "ĐẶT"}
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </>
  );
};

export default CreateBooking;
