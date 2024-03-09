import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { loginSSO } from "../services/AuthServices";
import Loading from "../components/Loading";

export default function AuthenticationLayout() {
  // do AuthenticationLayout boc toan bo route du an
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unSub = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const accessToken = await auth.currentUser.getIdToken();
        await loginSSO(accessToken);
        setIsLoading(false);
        return;
      }
      navigate("/login"); // Sử dụng hàm chuyển hướng từ hook useNavigate
    });
    return () => {
      setIsLoading(false);
      unSub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]); // Thêm navigate vào dependency array để đảm bảo hook không bị lỗi
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
