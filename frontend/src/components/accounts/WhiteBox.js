import React from "react";
import style from "./WhiteBox.module.scss";
import classNames from "classnames";

function WhiteBox({ children, className }) {
  return <div className={style.whiteBox}>{children}</div>;
}

export default WhiteBox;
