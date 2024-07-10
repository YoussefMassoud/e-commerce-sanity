import React from "react";
 import MainLoading from "./components/MainLoading";
import SkeletonLoading from "./components/SkeletonLoading";

const Loading = () => {
  return (
    <>
       <MainLoading /> 
      <SkeletonLoading />
    </>
  );
};

export default Loading;
