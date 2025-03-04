"use client";
import { useDispatch, useSelector } from "react-redux";

const mockProcessData = (data) => {
  // just a demo
  return data;
};

// this is a demo of a custom hook
// process some data then dispatch it and return the processed data
// can modifiy this to pass params for processing
const useSampleCustomHook = () => {
  const data = useSelector((state) => state.getSliceDataHere.data);
  const dispatch = useDispatch();

  const processedData = mockProcessData();
  dispatch(processedData);

  return processedData;
};

export default useSampleCustomHook;
