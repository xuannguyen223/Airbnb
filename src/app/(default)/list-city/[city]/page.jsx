import React from "react";
import { tinhThanhToIdMap, tinhThanhToSrcMap } from "@/utils/constant";
import { http } from "@/services/interceptor/homeInterceptor";
import SlickCarousel from "@/components/SlickCarousel";
import Link from "next/link";

const CityPage = async (props) => {
  const { city } = await props.params;
  const id = tinhThanhToIdMap[city];
  const srcMap = tinhThanhToSrcMap[city];
  let data = null;

  try {
    const res = await http.get(
      `/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`
    );
    data = res.data.content;
    console.log(data);
  } catch (err) {
    console.error(err);
    data = [];
  }

  return (
    <div>
      <div className="pt-8 container mx-auto flex flex-wrap">
        <div className="w-[96%] lg:w-[58%] mx-auto relative z-0 ">
          <div className="text-3xl font-bold mb-4">
            {data.length > 0
              ? `Có ${data.length} chỗ ở tại vị trí bản đồ đã chọn`
              : "Hiện không có chỗ ở nào dành cho bạn"}
          </div>
          {data?.map((item) => {
            return (
              <div className="border border-black rounded-lg overflow-hidden p-4 border-opacity-20 mb-6">
                <Link href={`/list-city/${city}/${item.id}`} className="flex">
                  <SlickCarousel item={item} className="w-1/2" />
                  <div className="w-1/2 ml-2 relative z-0">
                    <div>Toàn cảnh căn hộ</div>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.tenPhong}
                    </div>
                    <hr class="w-[40px] border-t border-gray-300 mt-3" />
                    <div className="mt-2 overflow-hidden text-ellipsis whitespace-normal line-clamp-2">
                      {item.khach} Khách • {item.phongNgu} Phòng ngủ •
                      {item.giuong} Giường • {item.phongTam} Phòng tắm •
                      {item.wifi ? "Wifi •" : ""}{" "}
                      {item.dieuHoa ? "Điều hoà •" : ""}
                      {item.mayGiat ? "Máy giặt •" : ""}
                      {item.tivi ? "Tivi •" : ""}
                      {item.doXe ? "Đỗ xe •" : ""}
                      {item.banUi ? "Bàn ủi •" : ""}
                      {item.banLa ? "Bàn là •" : ""}
                      {item.hoBoi ? "Hồ bơi •" : ""}
                    </div>
                    <div className="absolute z-0 bottom-0 right-0">
                      $ {item.giaTien}/ Đêm
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="w-[96%] lg:w-[38%] mx-auto ">
          <iframe
            src={srcMap}
            width="600"
            height="600"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CityPage;
