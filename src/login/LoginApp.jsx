import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { loginWithSSO } from "../services/AuthServices";
import { loginWithAccount } from "../services/AuthServices";

// custom hook check login for Login
export function useCheckLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unSub = auth.onIdTokenChanged(async (user) => {
      if (user) {
        setIsLoading(false);
        navigate("/graph");
        return;
      }
      setIsLoading(false);
      unSub();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { auth, isLoading, setIsLoading };
}

export default function LoginApp() {
  // add custom hook checklogin to here
  const { auth, isLoading, setIsLoading } = useCheckLogin();

  // solve login with google
  const handleLoginWithGoogle = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const accessToken = await auth.currentUser.getIdToken();
      await loginWithSSO(accessToken);
      setIsLoading(false);
      // khong nen luu lai accessToken => de bi hack token
      // localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      localStorage.clear();
    }
  };
  // solve login with password
  const handleLoginWithAccount = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const email = e.target.email.value;
      const password = e.target.password.value;
      await loginWithAccount(email, password);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      localStorage.clear();
    }
  };
  // neu isLoading dc bat thi in ra man hinh Loading ...
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-96 space-y-4">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form
          onSubmit={handleLoginWithAccount}
          className="flex flex-col space-y-4"
        >
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            placeholder="Email"
          />
          <input
            className="border border-gray-300 p-2 rounded"
            type="password"
            placeholder="Password"
          />
        </form>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleLoginWithGoogle}
        >
          Login with Google
        </button>
        <div className="flex justify-center">
          <p>
            Don't have an account?{" "}
            <a className="text-blue-500" href="/register">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
