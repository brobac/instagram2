import React from "react";
import style from "./WhiteBox.module.css";

function WhiteBox({ children, className }) {
  return (
    <div id={style.whiteBox} className={className}>
      {children}
    </div>
  );
}

export default WhiteBox;
