import React from "react";
import style from "./Modal.module.scss";

export default function Modal({ isOpen, close, children }) {
  return (
    <>
      {isOpen ? (
        <>
          <div className={style.ModalOverlay} onClick={close}></div>
          <div className={style.Modal}>{children}</div>
        </>
      ) : null}
    </>
  );
}
