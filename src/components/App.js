import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Auth from "./Auth";
import Header from "./Header";
import MainPage from "./pages/MainPage";
import { auth } from "../config/firebase";
import RoomsPage from "./pages/RoomsPage";
import RoomPage from "./pages/RoomPage";
import RegisterRoomPage from "./pages/RegisterRoomPage";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  // useEffect(() => {
  //   console.log(auth);
  // });

  return (
    <div className="bg-dark" data-bs-theme="dark">
      <div className="container ">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route element={<MainPage />} path="/" exact />
            <Route element={<RoomsPage />} path="/search" exact />
            <Route element={<RegisterRoomPage />} path="/register-room" exact />
            <Route element={<RoomPage />} path="/room/:id" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
