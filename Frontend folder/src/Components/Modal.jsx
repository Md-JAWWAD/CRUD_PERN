import React from "react";

const Modal = ({ title, children, onClose, validationMessage}) => {
  return (
    <dialog open className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <h2 className={`${validationMessage ? "bg-red-500 font-semi-bold w-80 text-center uppercase p-2 rounded text-white" : ""}`}>{validationMessage ? validationMessage : null}</h2>
        <div className="py-4">{children}</div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;