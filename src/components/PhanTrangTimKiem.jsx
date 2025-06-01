"use client";
import { http } from "@/services/interceptor/homeInterceptor";
import { idToTinhThanhMap } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BgHeader from "./BgHeader";

const PhanTrangTimKiem = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    http
      .get("/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8")
      .then((res) => {
        setData(res.data.content.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <BgHeader />
      <div className="container mx-auto pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {data?.map((item, index) => {
            const srcTinhThanh = idToTinhThanhMap[item.id];
            return (
              <Link
                href={`list-city/${srcTinhThanh}`}
                key={index}
                className="flex items-center w-[350px] md:w-[300px] lg:w-[180px] xl:w-[280px] p-4 border border-black border-opacity-20 rounded-lg hover:shadow-2xl hover:bg-[#F3F4F6] hover:scale-110 transition-all duration-300"
              >
                <div>
                  <Image
                    src={item.hinhAnh}
                    alt=""
                    width={30}
                    height={30}
                    className="object-cover h-12 w-12 rounded-lg"
                  />
                </div>
                <div className="flex">
                  <div className="ml-3">{item.tenViTri}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="space-y-3 pt-16 pb-16">
          <div className="font-bold text-3xl">Ở bất cứ đâu</div>
          <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href={"/"}
              className="mx-auto border border-black border-opacity-10 rounded-lg overflow-hidden hover:shadow-[0px_0px_8px_2px_rgba(0,0,0,0.2)]"
            >
              <Image
                src="https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329222%2Fmjwqhra4wbzlvoo2pe27.jpg&w=1920&q=75"
                alt=""
                width={230}
                height={230}
                className="w-full"
              />
              <div className="font-bold px-10 py-4 text-center">
                Toàn bộ nhà
              </div>
            </Link>
            <Link
              href={"/"}
              className="mx-auto border border-black border-opacity-10 rounded-lg overflow-hidden hover:shadow-[0px_0px_8px_2px_rgba(0,0,0,0.2)]"
            >
              <Image
                src="https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329186%2Ffmoml05qcd0yk2stvl9r.jpg&w=1920&q=75"
                alt=""
                width={230}
                height={230}
                className="w-full"
              />
              <div className="font-bold px-10 py-4 text-center">
                Chỗ ở độc đáo
              </div>
            </Link>
            <Link
              href={"/"}
              className="mx-auto border border-black border-opacity-10 rounded-lg overflow-hidden hover:shadow-[0px_0px_8px_2px_rgba(0,0,0,0.2)]"
            >
              <Image
                src="https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329121%2Fguagj5r2bkccgr1paez3.jpg&w=1920&q=75"
                alt=""
                width={230}
                height={230}
                className="w-full"
              />
              <div className="font-bold px-10 py-4 text-center">
                Trang trại và thiên nhiên
              </div>
            </Link>
            <Link
              href={"/"}
              className="mx-auto border border-black border-opacity-10 rounded-lg overflow-hidden hover:shadow-[0px_0px_8px_2px_rgba(0,0,0,0.2)]"
            >
              <Image
                src="https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329252%2Fgqhtg9ua6jdrffhbrfv1.jpg&w=1920&q=75"
                alt=""
                width={230}
                height={230}
                className="w-full"
              />
              <div className="font-bold px-10 py-4 text-center">
                Cho phép mang theo chó
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhanTrangTimKiem;
