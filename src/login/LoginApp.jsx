import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginApp() {
  const navigate = useNavigate();
  const auth = getAuth();
  
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    // gọi accessToken thì sẽ lấy được key mới
    const accessToken = await auth.currentUser.getIdToken();
    //localStorage.setItem('accessToken', accessToken);
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
