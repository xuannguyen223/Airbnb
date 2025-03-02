"use client";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  deleteLocationAction,
  getArrayLocation,
} from "@/lib/features/admin/location/adminLocationAction";
import {
  handleLocationPagination,
  handleSelectedLocationInfo,
} from "@/lib/features/admin/location/adminLocationSlice";

const AdminLocations = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArrayLocation());
  }, []);
  const arrayLocation = useSelector(
    (state) => state.adminLocationSlice.arrayLocation
  );

  const { Search } = Input;
  const onSearch = (keyword) => {
    dispatch(getArrayLocation(keyword));
  };

  const pagination = useSelector(
    (state) => state.adminLocationSlice.locationPagination
  );

  const [filteredInfo, setFilteredInfo] = useState({});
  const handleChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
    const newTotal = extra.currentDataSource.length;
    if (newTotal > 0) {
      pagination.total = newTotal;
    }
    dispatch(handleLocationPagination(pagination));
  };

  const columns = [
    // locationID
    {
      title: "MÃ VỊ TRÍ",
      key: "id",
      dataIndex: "id",
      align: "center",
      width: "17%",
      className: "font-bold",
      sorter: (a, b) => b.id - a.id,
    },
    // area
    {
      title: "TÊN VỊ TRÍ",
      dataIndex: "tenViTri",
      key: "tenViTri",
      align: "center",
      width: "17%",
      fixed: "left",
    },
    // city
    {
      title: "TỈNH THÀNH",
      key: "tinhThanh",
      dataIndex: "tinhThanh",
      align: "center",
      width: "17%",
    },
    // country
    {
      title: "QUỐC GIA",
      key: "quocGia",
      dataIndex: "quocGia",
      align: "center",
      width: "17%",
    },
    // image
    {
      title: "HÌNH ẢNH",
      key: "hinhAnh",
      dataIndex: "hinhAnh",
      align: "center",
      width: "20%",
      render: (record) => (
        <img
          src={record ? record : "/img/bg-login-register.avif"}
          alt="location"
          className="xl:w-80 w-64 mx-auto rounded-md"
        />
      ),
    },
    // edit
    {
      title: "THAO TÁC",
      dataIndex: "id",
      align: "center",
      width: "17%",
      fixed: "right",
      render: (value, record) => {
        return (
          <>
            <Link href={`/admin/locations/edit-location/${record.id}`}>
              <button
                className="btn-edit-user"
                onClick={() => {
                  dispatch(handleSelectedLocationInfo(record));
                }}
              >
                <EditOutlined />
                {/* Edit */}
              </button>
            </Link>
            <button
              className="btn-delete-user"
              onClick={() => {
                dispatch(deleteLocationAction(record.id));
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
      <h1 className="title">Quản lý vị trí</h1>
      {/* Block Add */}
      <Link href={"/admin/locations/create-location"} className={"w-fit block"}>
        <Button className="btn-add-user" color="gray">
          Thêm vị trí
        </Button>
      </Link>
      {/* Block Search */}
      <Search
        className="search-user"
        placeholder="Nhập tên vị trí"
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />
      {/* Block Table */}
      <div className="table-users">
        <Table
          columns={columns}
          dataSource={arrayLocation}
          onChange={handleChange}
          bordered
          pagination={{
            ...pagination,
            showTotal: () => {
              return `Tổng cộng ${pagination.total} vị trí `;
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminLocations;
