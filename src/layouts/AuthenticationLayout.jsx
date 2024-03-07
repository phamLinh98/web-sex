import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function AuthenticationLayout() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unSub = auth.onIdTokenChanged(async (user) => {
      if (user) {
        return;
      }
      navigate("/login"); // Sử dụng hàm chuyển hướng từ hook useNavigate
    });
    return () => unSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]); // Thêm navigate vào dependency array để đảm bảo hook không bị lỗi

  return (
    <div>
      <Outlet />
    </div>
  );
}
