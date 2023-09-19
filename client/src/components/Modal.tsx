// import React from "react";

interface Props {
  modal: boolean;
}

function Modal(props: Props) {
  return props.modal ? (
    <div className="modal">
      <div className="modal-content">
        <h1>Name of food</h1>
        <div>pic of food</div>
        <ul>list of steps</ul>
      </div>
    </div>
  ) : (
    <div className="modal-ph"></div>
  );
}

export default Modal;
