import React, { useEffect, useState } from "react";
import { Table, Button, Space } from "antd";
import axios from "axios";
import moment from "moment";

const AdminBooking = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gọi API danh sách đặt phòng
    axios
      .get("https://airbnbnew.cybersoft.edu.vn/api/dat-phong", {
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NyIsIkhldEhhblN0cmluZyI6IjExLzA2LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0OTYwMDAwMDAwMCIsIm5iZiI6MTcyMzIyMjgwMCwiZXhwIjoxNzQ5NzQ3NjAwfQ.waDB5mLZD-y9f0trHQhyWJiBNYXsC97HRlepmNYJKXE", 
        },
      })
      .then((res) => setData(res.data.content))
      .catch((err) => console.error("Lỗi lấy danh sách đặt phòng:", err));
  }, []);

  const columns = [
    {
      title: "ID Đặt Phòng",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Mã Phòng",
      dataIndex: "maPhong",
      key: "maPhong",
      sorter: (a, b) => a.maPhong - b.maPhong,
    },
    {
      title: "Ngày Đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày Đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Số Lượng Khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
      sorter: (a, b) => a.soLuongKhach - b.soLuongKhach,
    },
    {
      title: "Mã Người Dùng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      sorter: (a, b) => a.maNguoiDung - b.maNguoiDung,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Xem</Button>
          <Button danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
        Danh sách đặt phòng
      </h2>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default AdminBooking;