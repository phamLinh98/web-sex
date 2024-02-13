import React, { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
export default function LoginApp() {
  const auth = getAuth();
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, photoURL, uid },
    } = await signInWithPopup(auth, provider);
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      console.log(user);
    }
  };
  useEffect(() => {}, []);
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
