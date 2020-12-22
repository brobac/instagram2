import React from "react";
import style from "./And.module.css";
import classnames from "classnames";
function And() {
  return (
    <div className={style.andBox}>
      <div className={style.before}></div>
      <div className={style.and}>또는</div>
      <div className={style.after}></div>
    </div>
  );
}

export default And;
