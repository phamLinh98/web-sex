import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/AuthServices";
import Loading from "../components/Loading";

export default function AuthenticationLayout() {
  // do AuthenticationLayout boc toan bo route du an
  // const {setLoginUser} = useContext(MenuContext);
  //const [loginUser, setLoginUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Oulet phai dc render bang doan code duoi
  useEffect(() => {
    setIsLoading(true);
    getUserInfo()
      .then((data) => {
        setIsLoading(false);
        if (data.loginUser.id) {
          // setLoginUser(data.loginUser);
          navigate("/login");
        } else {
          setIsLoading(false);
          navigate("/login");
        }
        setIsLoading(false);
        navigate("/login");
      })
      .catch(() => {
        setIsLoading(false);
        navigate("/login");
      });

    return () => {
      setIsLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Thêm navigate vào dependency array để đảm bảo hook không bị lỗi

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
