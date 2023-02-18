import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Auth from "./Auth";
import Header from "./Header";
import MainPage from "./MainPage";
import { auth } from "../config/firebase";
import RoomPage from "./RoomPage";
import RegisterRoomPage from "./RegisterRoomPage";

function App() {
  useEffect(() => {
    console.log(auth);
  });

  return (
    <div className="bg-dark" data-bs-theme="dark">
      <div className="container ">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route element={<MainPage />} path="/" exact />
            <Route element={<RoomPage />} path="/search" exact />
            <Route element={<RegisterRoomPage />} path="/register-room" exact />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
