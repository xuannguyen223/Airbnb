"use client";
import React from "react";
import { Field, useFormik, ErrorMessage, FormikProvider } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { handleLoading } from "@/lib/features/admin/location/adminLocationSlice";
import {
  createLocationAction,
  editLocationAction,
} from "@/lib/features/admin/location/adminLocationAction";

const EditLocation = () => {
  const isLoading = useSelector((state) => state.adminLocationSlice.isLoading);
  const locationInfo = useSelector(
    (state) => state.adminLocationSlice.selectedLocationInfo
  );

  const dispatch = useDispatch();

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    area: Yup.string().required("Tên vị trí không được bỏ trống !"),
    city: Yup.string().required("Tỉnh thành không được bỏ trống !"),
    country: Yup.string().required("Quốc gia không được bỏ trống !"),
    image: Yup.string().matches(
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i,
      "Vui lòng nhập đường dẫn hình ảnh hợp lệ (jpg, png, gif,jpeg) !"
    ),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      locationID: locationInfo.id || 0,
      area: locationInfo.tenViTri || "",
      city: locationInfo.tinhThanh || "",
      country: locationInfo.quocGia || "",
      image: locationInfo.hinhAnh || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(handleLoading(true));
      dispatch(editLocationAction(values));
    },
  });

  return (
    <>
      {/* BLOCK MAIN */}
      <div className="admin-edit-user">
        <h2 className="title">Cập nhật thông tin vị trí</h2>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="user-info-field">
              {/* locationID */}
              <div className="form-group">
                <label htmlFor="locationID" className="block">
                  Mã vị trí
                </label>
                <Field
                  type="text"
                  name="locationID"
                  placeholder="Mã vị trí"
                  disabled={true}
                  className="form-input input-disabled"
                />
              </div>
              {/* area */}
              <div className="form-group">
                <label htmlFor="area" className="block">
                  <span className="text-customPink">*</span> Tên vị trí
                </label>
                <Field
                  type="text"
                  name="area"
                  placeholder="Nhập tên vị trí"
                  className={`form-input ${
                    formik.touched.area && formik.errors.area
                      ? "input-error"
                      : "input-valid"
                  }`}
                />
                <ErrorMessage
                  name="area"
                  component="div"
                  className="error-message"
                />
              </div>
              {/* city */}
              <div className="form-group">
                <label htmlFor="city" className="block">
                  <span className="text-customPink">*</span> Tỉnh thành
                </label>
                <Field
                  type="text"
                  name="city"
                  placeholder="Nhập tỉnh thành"
                  className={`form-input ${
                    formik.touched.city && formik.errors.city
                      ? "input-error"
                      : "input-valid"
                  }`}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="error-message"
                />
              </div>
              {/* country */}
              <div className="form-group">
                <label htmlFor="country" className="block">
                  <span className="text-customPink">*</span> Quốc gia
                </label>
                <Field
                  type="text"
                  name="country"
                  placeholder="Nhập quốc gia"
                  className={`form-input ${
                    formik.touched.country && formik.errors.country
                      ? "input-error"
                      : "input-valid"
                  }`}
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="error-message"
                />
              </div>
              {/* image */}
              <div className="form-group">
                <label htmlFor="image" className="block">
                  Hình ảnh
                </label>
                <Field
                  type="text"
                  name="image"
                  placeholder="Nhập link hình ảnh"
                  className={`form-input ${
                    formik.touched.image && formik.errors.image
                      ? "input-error"
                      : "input-valid"
                  }`}
                />
                <ErrorMessage
                  name="image"
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
                {isLoading ? <div className="spinner"></div> : "CẬP NHẬT"}
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </>
  );
};

export default EditLocation;
