import React from "react";
import "./Modal.css";
import ReactDOM from "react-dom";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const Overlay = (props) => {
  return (
    <div className="overlay">
      <div className="overlay__children"> {props.children}</div>
    </div>
  );
};

const rootElement = document.getElementById("modal");

const Modal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop></Backdrop>, rootElement)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, rootElement)}
    </div>
  );
};

export default Modal;
