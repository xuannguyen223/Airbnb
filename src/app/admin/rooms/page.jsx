"use client";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Button, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoomAction, getArrayRooms } from "@/lib/features/admin/room/adminRoomAction";
import { handleSelectedRoomInfo, handleRoomPagination } from "@/lib/features/admin/room/adminRoomSlice";
import Link from "next/link";

const AdminRooms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArrayRooms());
  }, []);

  const arrayRooms = useSelector((state) => state.adminRoomSlice.arrayRooms);
  const pagination = useSelector((state) => state.adminRoomSlice.roomPagination);
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

  const columns = [
    { title: "MÃ PHÒNG", key: "id", dataIndex: "id", align: "center", sorter: (a, b) => b.id - a.id },
    { title: "TÊN PHÒNG", dataIndex: "tenPhong", key: "tenPhong", align: "center" },
    { title: "KHÁCH", dataIndex: "khach", key: "khach", align: "center" },
    { title: "PHÒNG NGỦ", dataIndex: "phongNgu", key: "phongNgu", align: "center" },
    { title: "GIƯỜNG", dataIndex: "giuong", key: "giuong", align: "center" },
    { title: "PHÒNG TẮM", dataIndex: "phongTam", key: "phongTam", align: "center" },
    { title: "MÔ TẢ", dataIndex: "moTa", key: "moTa", align: "center" },
    { title: "GIÁ TIỀN", dataIndex: "giaTien", key: "giaTien", align: "center" },
    { title: "MÃ VỊ TRÍ", dataIndex: "maViTri", key: "maViTri", align: "center" },
    { title: "HÌNH ẢNH", dataIndex: "hinhAnh", key: "hinhAnh", align: "center", render: (src) => <img src={src} alt="room" width={50} /> },
    {
      title: "THAO TÁC",
      dataIndex: "id",
      align: "center",
      render: (value, record) => (
        <>
          <Link href={`/admin/edit-room/${record.id}`}>
            <button className="btn-edit-room" onClick={() => dispatch(handleSelectedRoomInfo(record))}>
              <EditOutlined />
            </button>
          </Link>
          <button className="btn-delete-room" onClick={() => dispatch(deleteRoomAction(record.id))}>
            | <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="admin-room">
      <h1 className="title">Quản lý phòng</h1>
      <Link href="/admin/create-room">
        <Button className="btn-add-room">Thêm phòng</Button>
      </Link>
      <Search className="search-room" placeholder="Nhập tên phòng" allowClear enterButton={<SearchOutlined />} onSearch={onSearch} />
      <Table columns={columns} dataSource={arrayRooms} onChange={handleChange} bordered pagination={{ ...pagination, showTotal: () => `Tổng cộng ${pagination.total} phòng` }} />
    </div>
  );
};

export default AdminRooms;
