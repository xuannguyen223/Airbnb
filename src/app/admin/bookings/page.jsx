"use client";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  deleteBookingAction,
  getArrayBookings,
  getBookingListByUserID,
} from "@/lib/features/admin/booking/adminBookingAction";
import {
  handleBookingPagination,
  handleSelectedBookingInfo,
} from "@/lib/features/admin/booking/adminBookingSlice";
import dayjs from "dayjs";

const AdminBookings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArrayBookings());
  }, []);
  const arrayBooking = useSelector(
    (state) => state.adminBookingSlice.arrayBooking
  );

  const { Search } = Input;
  const onSearch = (userID) => {
    dispatch(getBookingListByUserID(userID));
  };

  const pagination = useSelector(
    (state) => state.adminBookingSlice.bookingPagination
  );

  const [filteredInfo, setFilteredInfo] = useState({});
  const handleChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
    const newTotal = extra.currentDataSource.length;
    if (newTotal > 0) {
      pagination.total = newTotal;
    }
    dispatch(handleBookingPagination(pagination));
  };

  const columns = [
    // bookingID
    {
      title: "MÃ ĐẶT PHÒNG",
      key: "id",
      dataIndex: "id",
      align: "center",
      width: "10%",
      assName: "font-bold",
      sorter: (a, b) => b.id - a.id,
    },
    // roomID
    {
      title: "MÃ PHÒNG",
      dataIndex: "maPhong",
      key: "maPhong",
      align: "center",
      width: "15%",
      fixed: "left",
      sorter: (a, b) => b.maPhong - a.maPhong,
    },
    // userID
    {
      title: "MÃ KHÁCH HÀNG",
      key: "maNguoiDung",
      dataIndex: "maNguoiDung",
      align: "center",
      width: "10%",
      sorter: (a, b) => b.maNguoiDung - a.maNguoiDung,
    },
    // checkIn
    {
      title: "NGÀY ĐẾN",
      dataIndex: "ngayDen",
      key: "ngayDen",
      align: "center",
      width: "15%",
      render: (text) => (text ? dayjs(text).format("DD/MM/YYYY") : "-"),
    },
    // checkOut
    {
      title: "NGÀY ĐI",
      dataIndex: "ngayDi",
      key: "ngayDi",
      align: "center",
      width: "15%",
      render: (text) => (text ? dayjs(text).format("DD/MM/YYYY") : "-"),
    },
    // number of guests
    {
      title: "SỐ LƯỢNG KHÁCH",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
      align: "center",
      width: "15%",
    },
    // edit
    {
      title: "THAO TÁC",
      dataIndex: "id",
      align: "center",
      width: "15%",
      fixed: "right",
      render: (value, record) => {
        return (
          <>
            <Link href={`/admin/bookings/edit-booking/${record.id}`}>
              <button
                className="btn-edit-user"
                onClick={() => {
                  dispatch(handleSelectedBookingInfo(record));
                }}
              >
                <EditOutlined />
                {/* Edit */}
              </button>
            </Link>
            <button
              className="btn-delete-user"
              onClick={() => {
                dispatch(deleteBookingAction(record.id));
              }}
            >
              | <DeleteOutlined />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="admin-user">
      <h1 className="title">Quản lý đặt phòng</h1>
      {/* Block Add */}
      <Link href={"/admin/bookings/create-booking"} className={"w-fit block"}>
        <Button className="btn-add-user" color="gray">
          Đặt phòng
        </Button>
      </Link>
      {/* Block Search */}
      <Search
        className="search-user"
        placeholder="Nhập mã khách hàng"
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />
      {/* Block Table */}
      <div className="table-users">
        <Table
          columns={columns}
          dataSource={arrayBooking}
          onChange={handleChange}
          scroll={{ x: "max-content" }}
          bordered
          pagination={{
            ...pagination,
            showTotal: () => {
              return `Tổng cộng ${pagination.total} phòng`;
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminBookings;
