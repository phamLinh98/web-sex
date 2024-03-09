import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/AuthServices";

export function useAuthenticated(setIsLoading) {
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getUserInfo()
      .then((data) => {
        if (data.loginUser.id) {
          //setLoginUser(data.loginUser);
        } else {
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
  return {};
}
