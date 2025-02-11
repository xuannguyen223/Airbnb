import React from "react";

const PhongThue = async (props) => {
  const { id } = await props.params;
  console.log(id);
  return <div>{id}</div>;
};

export default PhongThue;
