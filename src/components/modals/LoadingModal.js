import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import SpinerWithProgress from "../SpinerWithProgress";
import { customStyles } from "./modalStyles";

function LoadingModal({ isOpen, stage }) {
  console.log(stage.data);
  customStyles.content = {
    ...customStyles.content,
  };
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={() => {}}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div style={{ marginTop: "20vh" }}>
        <SpinerWithProgress {...stage.data}></SpinerWithProgress>
      </div>
    </Modal>
  );
}

const mapProps = (state) => {
  return { stage: state.stage };
};

export default connect(mapProps)(LoadingModal);
