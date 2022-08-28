import React from "react";

import ReactDOM from "react-dom";
import "./DeleteModal.css";

const Backdrop = () => {
  return <div className="delete__backdrop"></div>;
};
const Overlay = (props) => {
  return <div className="delete__overlay">{props.children}</div>;
};

const rootElement = document.getElementById("deleteModal");
const DeleteModal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop />, rootElement)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, rootElement)}
    </div>
  );
};

export default DeleteModal;
