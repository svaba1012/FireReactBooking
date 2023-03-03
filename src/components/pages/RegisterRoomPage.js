import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import Auth from "../Auth";
import RegisterForm from "../forms/RegisterForm";
import "./RegisterRoomPage.css";

function RegisterRoomPage() {
  if (!auth.currentUser) {
    return (
      <div className="sign-in-alert">
        <div className="sign-in-alert-box">
          <h2>
            Morate biti ulogovani da bi ste mogli da registrujete smestaj!
          </h2>
        </div>
        <div className="sign-in-alert-box">
          <Auth />
        </div>
      </div>
    );
  }
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterRoomPage;
