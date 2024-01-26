import React from "react";

type containerProps = {
  children: React.ReactNode;
};

const Container: React.FC<containerProps> = ({ children }) => {
  return <div className=" max-w-[1440px] mx-auto">{children}</div>;
};

export default Container;
