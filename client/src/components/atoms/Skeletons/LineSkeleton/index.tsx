import React from "react";
import { skeletonAnimation } from "~/utils/skeletonAnimation";

const LineSkeleton = ({ className }: { className?: string }) => {
  return <div className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5 ${skeletonAnimation} ${className}`}></div>;
};

export default LineSkeleton;
