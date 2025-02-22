import Image from "next/image";
import ChiTietPhongThue from "@/components/ChiTietPhongThue";
import { http } from "@/services/interceptor/homeInterceptor";
const PhongThue = async (props) => {
  const { idPhongThue } = await props.params;
  let phongThue = {};
  try {
    const res = await http.get(`/api/phong-thue/${idPhongThue}`);
    phongThue = res.data.content;
    console.log(phongThue);
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto">
      <ChiTietPhongThue idPhongThue={idPhongThue} phongThue={phongThue} />
    </div>
  );
};

export default PhongThue;
