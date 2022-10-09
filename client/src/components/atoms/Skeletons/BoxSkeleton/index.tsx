import React from "react";
import { skeletonAnimation } from "~/utils/skeletonAnimation";

const BoxSkeleton = ({ className }: { className?: string }) => {
  return <div className={`bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-2.5 h-10 ${skeletonAnimation} ${className}`}></div>;
};

export default BoxSkeleton;
