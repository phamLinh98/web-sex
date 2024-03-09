import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthenticated } from "../customHook/useAuthenticated";

export default function AuthenticationLayout() {
  const [isLoading, setIsLoading] = useState(false);
  useAuthenticated(setIsLoading);
  if (!isLoading) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
}
