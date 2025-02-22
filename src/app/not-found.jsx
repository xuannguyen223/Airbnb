import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="notFound">
      <h1 className="title">404</h1>
      <p className="content">Trang bạn truy cập không tồn tại !</p>
      <Link href="/" className="navigate">
        Trở về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
