import React from "react";
import { useAuth } from "../layouts/AuthenticationLayout";
import { Navigate } from "react-router-dom";

export default function LoginApp() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <h1 className="">Login</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login with Google
      </button>
    </div>
  );
}
