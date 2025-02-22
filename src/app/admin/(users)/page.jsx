"use client";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { Button, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getArrayUsers,
} from "@/lib/features/admin/user/adminUserAction";
import {
  handleSelectedUserInfo,
  handleShowTotal,
  handleUserPagination,
} from "@/lib/features/admin/user/adminUserSlice";
import Link from "next/link";
import { ROLE_ADMIN, ROLE_USER } from "@/utils/constant";

const AdminUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArrayUsers());
  }, []);
  const arrayUsers = useSelector((state) => state.adminUserSlice.arrayUsers);

  const { Search } = Input;
  const onSearch = (value) => {
    dispatch(getArrayUsers(value));
  };

  const pagination = useSelector(
    (state) => state.adminUserSlice.userPagination
  );

  const [filteredInfo, setFilteredInfo] = useState({});
  const handleChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
    const newTotal = extra.currentDataSource.length;
    if (newTotal > 0) {
      pagination.total = newTotal;
    }
    dispatch(handleUserPagination(pagination));
  };

  const columns = [
    // userID
    {
      title: "MÃ KH",
      key: "id",
      dataIndex: "id",
      align: "center",
      witdh: "10%",
      className: "font-bold",
      sorter: (a, b) => b.id - a.id,
    },
    // name
    {
      title: "TÊN",
      dataIndex: "name",
      key: "name",
      align: "center",
      witdh: "15%",
      fixed: "left",
    },
    // gender
    {
      title: "GIỚI TÍNH",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      witdh: "15%",
      render: (_, { gender }) => {
        return (
          <Tag color={gender ? "yellow" : "orange"} key={gender}>
            {gender ? "Nam" : "Nữ"}
          </Tag>
        );
      },
      filters: [
        {
          text: "NAM",
          value: true,
        },
        {
          text: "NỮ",
          value: false,
        },
      ],
      filteredValue: filteredInfo.gender || null,
      onFilter: (value, record) => record.gender === value,
    },
    // email
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      align: "center",
      witdh: "15%",
    },
    // role
    {
      title: "VAI TRÒ",
      dataIndex: "role",
      align: "center",
      witdh: "15%",
      render: (_, { role }) => {
        return (
          <Tag color={role === ROLE_ADMIN ? "green" : "geekblue"} key={role}>
            {role === ROLE_ADMIN ? "Quản Trị" : "Khách Hàng"}
          </Tag>
        );
      },
      filters: [
        {
          text: "Quản Trị",
          value: ROLE_ADMIN,
        },
        {
          text: "Khách Hàng",
          value: ROLE_USER,
        },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) =>
        record.role.toLowerCase() === value.toLowerCase(),
    },
    // edit
    {
      title: "THAO TÁC",
      dataIndex: "id",
      align: "center",
      witdh: "15%",
      fixed: "right",
      render: (value, record) => {
        return (
          <>
            <Link href={`/admin/edit-user/${record.id}`}>
              <button
                className="btn-edit-user"
                onClick={() => {
                  dispatch(handleSelectedUserInfo(record));
                }}
              >
                <EditOutlined />
                {/* Edit */}
              </button>
            </Link>
            <button
              className="btn-delete-user"
              onClick={() => {
                dispatch(deleteUserAction(record.id));
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
      <h1 className="title">Quản lý người dùng</h1>
      {/* Block Add */}
      <Link href={"/admin/create-user"} className={"w-fit block"}>
        <Button className="btn-add-user" color="gray">
          Thêm người dùng
        </Button>
      </Link>
      {/* Block Search */}
      <Search
        className="search-user"
        placeholder="Nhập tên người dùng"
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />
      {/* Block Table */}
      <div className="table-users">
        <Table
          columns={columns}
          dataSource={arrayUsers}
          onChange={handleChange}
          scroll={{ x: "max-content" }}
          bordered
          pagination={{
            ...pagination,
            showTotal: () => {
              return `Tổng cộng ${pagination.total} người dùng`;
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
