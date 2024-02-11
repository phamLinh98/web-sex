import React from "react";
import { useAuth } from "../layouts/AuthenticationLayout";
import { Navigate } from "react-router-dom";
export default function LoginApp() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return <div>LoginApp</div>;
}
