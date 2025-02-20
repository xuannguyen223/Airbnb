import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, message } from "antd";
import axios from "axios";

const AdminLocation = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLocations();
  }, []);
      
  const fetchLocations = async () => {
    try {
      const res = await axios.get("https://airbnbnew.cybersoft.edu.vn/api/vi-tri", {
        headers: {
          TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NyIsIkhldEhhblN0cmluZyI6IjExLzA2LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0OTYwMDAwMDAwMCIsIm5iZiI6MTcyMzIyMjgwMCwiZXhwIjoxNzQ5NzQ3NjAwfQ.waDB5mLZD-y9f0trHQhyWJiBNYXsC97HRlepmNYJKXE", 
        },
      });
      setData(res.data.content);
    } catch (error) {
      console.error("Lỗi lấy danh sách vị trí:", error);
    }
  };

  const handleEdit = (record) => {
    setCurrentLocation(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${id}`, {
        headers: {
          TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
      });
      message.success("Xóa vị trí thành công!");
      fetchLocations();
    } catch (error) {
      message.error("Lỗi khi xóa vị trí!");
    }
  };

  const handleUpdate = async (values) => {
    try {
      await axios.put(`https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${currentLocation.id}`, values, {
        headers: {
          TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
      });
      message.success("Cập nhật vị trí thành công!");
      fetchLocations();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Lỗi khi cập nhật vị trí!");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên Vị Trí",
      dataIndex: "tenViTri",
      key: "tenViTri",
    },
    {
      title: "Tỉnh Thành",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
    },
    {
      title: "Quốc Gia",
      dataIndex: "quocGia",
      key: "quocGia",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => <img src={text} alt="hinhAnh" style={{ width: 80, borderRadius: 5 }} />,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Chỉnh sửa
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
        Danh sách vị trí
      </h2>
      <Table columns={columns} dataSource={data} rowKey="id" />

      {/* Modal chỉnh sửa vị trí */}
      <Modal
        title="Chỉnh sửa vị trí"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="tenViTri" label="Tên vị trí" rules={[{ required: true, message: "Nhập tên vị trí!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tinhThanh" label="Tỉnh thành" rules={[{ required: true, message: "Nhập tỉnh thành!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quocGia" label="Quốc gia" rules={[{ required: true, message: "Nhập quốc gia!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="hinhAnh" label="Hình ảnh" rules={[{ required: true, message: "Nhập URL hình ảnh!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminLocation;