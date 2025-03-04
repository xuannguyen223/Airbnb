import { commonHttp } from "@/services/interceptor/commonInterceptor";
import {
  ACCESS_TOKEN,
  LOCATION_API,
  LOCATION_PAGINATION_API,
  MAX_INT32,
} from "@/utils/constant";
import { redirect } from "next/navigation";
import {
  handleArrLocation,
  handleDeleteLocation,
  handleLoading,
  handleLocationPagination,
} from "./adminLocationSlice";

export const getArrayLocation = (keyword) => {
  const paginationUrl = `?pageIndex=1&pageSize=${MAX_INT32}`;
  let keywordUrl = "";
  if (keyword) {
    keywordUrl = `&keyword=${keyword}`;
  }
  const finalUrl = LOCATION_PAGINATION_API + paginationUrl + keywordUrl;
  return async (dispatch, getState) => {
    const responseLocationList = await commonHttp.get(finalUrl);

    if (responseLocationList.status === 200) {
      dispatch(handleArrLocation(responseLocationList.data.content.data));
      const pagination = {
        total: responseLocationList.data.content.data.length,
      };
      dispatch(handleLocationPagination(pagination));
    } else {
      alert(
        `Status: ${responseLocationList.status} - ${responseLocationList.data.message} ${responseLocationList.data.content}`
      );
      return;
    }
  };
};

export const deleteLocationAction = (locationID) => {
  return async (dispatch, getState) => {
    const responseDeleteLocation = await commonHttp.delete(
      `${LOCATION_API}/${locationID}`,
      {
        headers: {
          token: localStorage.getItem(ACCESS_TOKEN),
        },
      }
    );

    if (responseDeleteLocation.status === 200) {
      dispatch(handleDeleteLocation(locationID));
    } else {
      alert(
        `Status: ${responseDeleteLocation.status} - ${responseDeleteLocation.statusText}. ${responseDeleteLocation.data.message}`
      );
      return;
    }
  };
};

const preparePayloadForLocation = (locationInfo) => {
  const { area, city, country, image } = locationInfo;
  return {
    tenViTri: area.trim(),
    tinhThanh: city.trim(),
    quocGia: country.trim(),
    hinhAnh: image || "https://airbnbnew.cybersoft.edu.vn/images/vt3.jpg",
  };
};

export const createLocationAction = (locationInfo) => {
  const payload = preparePayloadForLocation(locationInfo);
  return async (dispatch, getState) => {
    const responseCreateLocation = await commonHttp.post(
      LOCATION_API,
      payload,
      {
        headers: {
          token: localStorage.getItem(ACCESS_TOKEN),
        },
      }
    );

    dispatch(handleLoading(false));
    if (responseCreateLocation.status === 201) {
      alert("THÊM VỊ TRÍ MỚI THÀNH CÔNG !");
      redirect("/admin/locations");
    } else {
      alert(
        `STATUS: ${responseCreateLocation.status} - ${responseCreateLocation.statusText}`
      );
    }
  };
};

export const editLocationAction = (locationInfo) => {
  const payload = preparePayloadForLocation(locationInfo);
  return async (dispatch, getState) => {
    const responseEditLocation = await commonHttp.put(
      `${LOCATION_API}/${locationInfo.locationID}`,
      payload,
      {
        headers: {
          token: localStorage.getItem(ACCESS_TOKEN),
        },
      }
    );
    dispatch(handleLoading(false));
    if (responseEditLocation.status === 200) {
      alert("CẬP NHẬT THÔNG TIN VỊ TRÍ THÀNH CÔNG !");
      redirect("/admin/locations");
    } else {
      alert(responseEditLocation.data.content.toUpperCase());
    }
  };
};
