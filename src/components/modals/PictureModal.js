import React from "react";
import Modal from "react-modal";
import { customStyles } from "./modalStyles";

function PictureModal({ isOpen, setIsOpen, imgUrl }) {
  const closeModal = () => setIsOpen(false);
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      data-bs-theme="dark"
    >
      <div
        onClick={closeModal}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 3000,
          cursor: "pointer",
        }}
      >
        <i
          className="fa-solid fa-circle-xmark"
          style={{ color: "red", fontSize: "xxx-large" }}
        ></i>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "--bs-body-color",
        }}
      >
        <img
          src={imgUrl}
          alt="slika"
          style={{ maxHeight: "80vh", maxWidth: "90vw" }}
        ></img>
      </div>
    </Modal>
  );
}

export default PictureModal;
