import React from "react";
import { Outlet } from "react-router-dom";

const Parent = () => {
  return (
    <div>
      <h1>Parent Component</h1>
      <Outlet />
    </div>
  );
};

export default Parent;
