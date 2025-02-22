import Image from "next/image";
import ChiTietPhongThue from "@/components/ChiTietPhongThue";
import { http } from "@/services/interceptor/homeInterceptor";
import BgHeader from "@/components/BgHeader";
const PhongThue = async (props) => {
  const { idPhongThue } = await props.params;
  let phongThue = {};
  try {
    const res = await http.get(`/api/phong-thue/${idPhongThue}`);
    phongThue = res.data.content;
  } catch (error) {}

  return (
    <>
      <BgHeader />
      <div className="container mx-auto">
        <ChiTietPhongThue idPhongThue={idPhongThue} phongThue={phongThue} />
      </div>
    </>
  );
};

export default PhongThue;
