import Image from "next/image";
import React from "react";

const SlickCarousel = (props) => {
  const { item } = props;

  return (
    <div className="relative w-[300px] h-[180px] rounded-md overflow-hidden">
      <Image
        src={item.hinhAnh}
        layout="fill"
        crossOrigin="anonymous"
        alt={item.tenPhong}
        className="object-fill relative z-0"
      />
    </div>
  );
};

export default SlickCarousel;
