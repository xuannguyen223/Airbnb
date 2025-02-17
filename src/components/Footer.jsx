import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#F3F4F6]">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-8">
          <div>
            <div className="font-bold text-lg">GIỚI THIỆU</div>
            <ul className="text-sm">
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Phương thức hoạt động của Airbnb
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Trang tin tức
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Nhà đầu tư
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Airbnb Plus
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Airbnb Luxe
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  HotelTonight
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Airbnb for Work
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Nhờ có Host, mọi điều đều có thể
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Cơ hội nghề nghiệp
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-lg">CỘNG ĐỒNG</div>
            <ul className="text-sm">
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Sự đa đạng và Cảm giác thân thuộc
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Tiện nghi phù hợp cho người khuyết tật
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Đối tác liên kết Airbnb
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Chỗ ở cho tuyến đầu
                </Link>
              </li>{" "}
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Lượt giới thiệu của khách
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Airbnb.org
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-lg">ĐÓN TIẾP KHÁCH</div>
            <ul className="text-sm">
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Cho thuê nhà
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Tổ chức Trải nghiệm trực tuyến
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Tổ chức Trải nghiệm
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Đón tiếp khách có trách nhiệm
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Trung tâm tài nguyên
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Trung tâm cộng đồng
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-lg">HỖ TRỢ</div>
            <ul className="text-sm">
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Biện pháp ứng phó đại dịch COVID-19
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Các tùy chọn hủy
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Hỗ trợ khu dân cư
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:underline" href={"/"}>
                  Tin cây và an toàn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 left-0 bg-white h-[50px]">
        <div className="container mx-auto h-full ">
          <div className="flex justify-between items-center h-full ">
            <div className="text-black text-opacity-60">
              <span className="mx-2 ">© 2022 Airbnb, Inc</span>.
              <span className="mx-2 hover:underline cursor-pointer hidden xl:inline-block">
                Quyền riêng tư
              </span>
              .
              <span className="mx-2 hover:underline cursor-pointer hidden xl:inline-block">
                Điều khoản
              </span>
              .
              <span className="mx-2 hover:underline cursor-pointer hidden xl:inline-block">
                Sơ đồ trang web
              </span>
            </div>
            <div>
              <span>
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 inline-block fill-current"
                >
                  <path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"></path>
                </svg>
              </span>
              <span className="mx-2 hover:underline cursor-pointer">
                Tiếng Việt
              </span>
              <span className="mx-2 hover:underline cursor-pointer hidden xl:inline-block">
                USD
              </span>
              <span className="mx-2 hover:underline cursor-pointer hidden xl:inline-block">
                Hỗ trợ tài nguyên
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
