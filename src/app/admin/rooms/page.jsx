"use client";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Button, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoomAction,
  getArrayRooms,
} from "@/lib/features/admin/room/adminRoomAction";
import {
  handleSelectedRoomInfo,
  handleRoomPagination,
} from "@/lib/features/admin/room/adminRoomSlice";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const AdminRooms = () => {
  const [isClient, setIsClient] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArrayRooms());
    setIsClient(true);
  }, []);

  const arrayRooms = useSelector((state) => state.adminRoomSlice.arrayRooms);
  const pagination = useSelector(
    (state) => state.adminRoomSlice.roomPagination
  );
  const [filteredInfo, setFilteredInfo] = useState({});

  const { Search } = Input;
  const onSearch = (value) => {
    dispatch(getArrayRooms(value));
  };

  const handleChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
    const newTotal = extra.currentDataSource.length;
    if (newTotal > 0) {
      pagination.total = newTotal;
    }
    dispatch(handleRoomPagination(pagination));
  };

  const is5XL = useMediaQuery({ minWidth: 2025 });
  const is2XL = useMediaQuery({ minWidth: 1536 });

  const columns = [
    // id
    {
      title: "MÃ PHÒNG",
      key: "id",
      dataIndex: "id",
      align: "center",
      className: "font-bold",
      width: "7%",
      sorter: (a, b) => b.id - a.id,
    },
    // name
    {
      title: "TÊN PHÒNG",
      dataIndex: "tenPhong",
      key: "tenPhong",
      align: "center",
      width: "15%",
      fixed: "left",
    },
    // img
    ...(isClient && is2XL
      ? [
          {
            title: "HÌNH ẢNH",
            dataIndex: "hinhAnh",
            key: "hinhAnh",
            align: "center",
            width: "17%",
            render: (src) => (
              <img
                src={src}
                alt="room"
                className="xl:w-80 w-64 mx-auto rounded-md"
              />
            ),
          },
        ]
      : []),
    // guests
    {
      title: "KHÁCH",
      dataIndex: "khach",
      key: "khach",
      align: "center",
      width: "5%",
    },
    // bedroom
    {
      title: "PHÒNG NGỦ",
      dataIndex: "phongNgu",
      key: "phongNgu",
      align: "center",
      width: "5%",
    },
    // bed
    {
      title: "GIƯỜNG",
      dataIndex: "giuong",
      key: "giuong",
      align: "center",
      width: "5%",
    },
    // bathroom
    {
      title: "PHÒNG TẮM",
      dataIndex: "phongTam",
      key: "phongTam",
      align: "center",
      width: "5%",
    },
    // description
    ...(isClient && is5XL
      ? [
          {
            title: "MÔ TẢ",
            dataIndex: "moTa",
            key: "moTa",
            align: "center",
            width: "20%",
          },
        ]
      : []),
    // prices
    {
      title: "GIÁ TIỀN",
      dataIndex: "giaTien",
      key: "giaTien",
      align: "center",
      width: "7%",
      className: "font-bold",
      sorter: (a, b) => b.giaTien - a.giaTien,
      render: (_, { giaTien }) => {
        return (
          <Tag color={giaTien >= 20 ? "green" : "orange"} key={giaTien}>
            {giaTien}
          </Tag>
        );
      },
    },
    // location id
    {
      title: "MÃ VỊ TRÍ",
      dataIndex: "maViTri",
      key: "maViTri",
      align: "center",
      width: "6%",
      sorter: (a, b) => b.maViTri - a.maViTri,
    },
    // edit
    {
      title: "THAO TÁC",
      key: "id",
      dataIndex: "id",
      align: "center",
      width: "8%",
      fixed: "right",
      render: (value, record) => (
        <>
          <Link href={`/admin/rooms/edit-room/${record.id}`}>
            <button
              className="btn-edit-room font-medium text-blue-500 hover:underline dark:text-cyan-500"
              onClick={() => dispatch(handleSelectedRoomInfo(record))}
            >
              <EditOutlined />
            </button>
          </Link>
          <button
            className="btn-delete-room font-medium text-red-500 hover:underline dark:text-cyan-500 ml-2"
            onClick={() => dispatch(deleteRoomAction(record.id))}
          >
            | <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="admin-room p-5">
      <h1 className="title font-semibold text-2xl mb-5 capitalize">
        Quản lý phòng
      </h1>
      <Link href="/admin/rooms/create-room">
        <Button className="btn-add-room rounded-sm mb-8 px-6 py-4">
          Thêm phòng
        </Button>
      </Link>
      <Search
        className="search-room"
        placeholder="Nhập tên phòng"
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />
      <div className="mt-8 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={arrayRooms}
          onChange={handleChange}
          bordered
          pagination={{
            ...pagination,
            showTotal: () => `Tổng cộng ${pagination.total} phòng`,
          }}
        />
      </div>
    </div>
  );
};

export default AdminRooms;
