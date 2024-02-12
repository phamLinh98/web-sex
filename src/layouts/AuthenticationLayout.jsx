import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const useAuth = () => {
  return {};
};
export default function AuthenticationLayout() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  } else {
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
