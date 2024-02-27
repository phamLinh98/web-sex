import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginSSO } from "../services/AuthServices";
export default function LoginApp() {
  const navigate = useNavigate();
  const auth = getAuth();
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    // gọi accessToken thì sẽ lấy được key mới
    const accessToken = await auth.currentUser.getIdToken();
    loginSSO(accessToken)
      .then((data) => {
        console.log(data);
        navigate("/graph");
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
    //localStorage.setItem("accessToken", accessToken);
    console.log(accessToken);
  };
  useEffect(() => {
    const unSub = auth.onIdTokenChanged(async (user) => {
      if (user) {
        navigate("/graph");
      }
    });
    return () => {
      unSub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1 className="">Login</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={handleLoginWithGoogle}
      >
        Login with Google
      </button>
    </div>
  );
}
