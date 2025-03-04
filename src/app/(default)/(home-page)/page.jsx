"use client";
import PhanTrangTimKiem from "@/components/PhanTrangTimKiem";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";

const HomePage = () => {
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    setPageLoading(false);
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PhanTrangTimKiem />
    </div>
  );
};

export default HomePage;
