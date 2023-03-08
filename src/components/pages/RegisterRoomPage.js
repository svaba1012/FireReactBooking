import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { connect } from "react-redux";
import { setStage } from "../../actions";
import Auth from "../Auth";
import RegisterForm from "../forms/RegisterForm";
import SpinerWithProgress from "../SpinerWithProgress";
import "./RegisterRoomPage.css";
import LoadingModal from "../modals/LoadingModal";

function RegisterRoomPage(props) {
  let [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    let intervalId = setInterval(() => {
      setUser(auth.currentUser);
      if (auth.currentUser) {
        clearInterval(intervalId);
      }
    }, 100);
  }, []);

  if (!user) {
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
      <LoadingModal isOpen={props.stage.loading}></LoadingModal>
      <RegisterForm />
      {/* <SpinerWithProgress></SpinerWithProgress> */}
    </div>
  );
}

const propsMap = (state) => {
  return { stage: state.stage };
};

export default connect(propsMap, { setStage })(RegisterRoomPage);
