"use client";

import React, { Fragment, useEffect } from "react";
import { Button, Table, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhongThueAction, xoaPhongAction } from "@/features/admin/QuanLyPhongAction";

const { Search } = Input;

const QuanLyPhong = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { danhSachPhong } = useSelector((state) => state.QuanLyPhongReducer);

    useEffect(() => {
        dispatch(layDanhSachPhongThueAction());
    }, [dispatch]);

    const columns = [
        {
            title: "Mã Phòng",
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            width: "10%",
        },
        {
            title: "Tên Phòng",
            dataIndex: "tenPhong",
            sorter: (a, b) => a.tenPhong.localeCompare(b.tenPhong),
            width: "20%",
        },
        {
            title: "Hình Ảnh",
            dataIndex: "hinhAnh",
            render: (text, phong) => (
                <Fragment>
                    <img
                        src={phong.hinhAnh}
                        alt={phong.tenPhong}
                        width={50}
                        height={50}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `http://picsum.photos/id/${phong.id}/50/50`;
                        }}
                    />
                </Fragment>
            ),
            width: "15%",
        },
        {
            title: "Location",
            dataIndex: "viTri",
            width: "20%",
        },
        {
            title: "Số khách tối đa",
            dataIndex: "guestMax",
            width: "10%",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            render: (text, phong) => (
                <Fragment>
                    <NavLink className="text-blue-500 hover:text-blue-800 mr-2" to={`/quantri/chitietphong/${phong.id}`}>
                        Xem thông tin chi tiết
                    </NavLink>
                    <NavLink className="text-green-500 hover:text-green-800 mr-2" to={`/quantri/editPhong/${phong.id}`}>
                        <EditOutlined />
                    </NavLink>
                    <span
                        style={{ cursor: "pointer" }}
                        className="text-red-800"
                        onClick={() => {
                            if (window.confirm(`Bạn có chắc muốn xóa phòng ${phong.tenPhong}?`)) {
                                dispatch(xoaPhongAction(phong.id));
                            }
                        }}
                    >
                        <DeleteOutlined />
                    </span>
                </Fragment>
            ),
            width: "25%",
        },
    ];

    const onSearch = (value) => {
        dispatch(layDanhSachPhongThueAction(value));
    };

    return (
        <div className="container">
            <h3 className="text-4xl font-bold">Quản lý Phòng</h3>
            <Button className="mt-5" onClick={() => navigate("addnew")}>
                Thêm Phòng
            </Button>
            <Search className="my-5" placeholder="Nhập tên phòng" onSearch={onSearch} enterButton />
            <Table columns={columns} dataSource={danhSachPhong} rowKey="id" />
        </div>
    );
};

export default QuanLyPhong;