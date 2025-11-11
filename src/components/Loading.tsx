import React from "react";
import clsx from "clsx";

const Loading = ({ className }: { className?: string }) => {
  return <div className={clsx(`loader ${className}`)}></div>;
};

export default Loading;
