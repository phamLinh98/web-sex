import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/AuthServices";
//import Loading from "../components/Loading";

export default function AuthenticationLayout() {
  const [isLoading, setIsLoading] = useState(false);
  //const { loginUser, setLoginUser } = useContext(LoginUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getUserInfo()
      .then((data) => {
        if (data.loginUser.id) {
          //setLoginUser(data.loginUser);
        } else {
         // setLoginUser({});
          navigate("/login");
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        navigate("/login");
      });

    return () => {
      setIsLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isLoading) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
}
