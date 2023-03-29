import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import "bootstrap-icons/font/bootstrap-icons.css";

function Auth() {
  const onButtonClick = async () => {
    if (auth.currentUser) {
      try {
        await auth.signOut();
      } catch (err) {
        console.error(err);
      }
      console.log(auth);
      return;
    }
    try {
      let res = await signInWithPopup(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.error(error);
    }

    console.log(auth);
  };

  return (
    <button onClick={onButtonClick} className="btn btn-outline-danger">
      Prijavi se <i className="bi bi-google"></i>
    </button>
  );
}

export default Auth;
