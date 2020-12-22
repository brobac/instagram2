import React from "react";
import style from "./SubmitButton.module.css";
import classNames from "classnames";

function SubmitButton({ text, className }) {
  return (
    <div>
      <button type="submit" className={classNames(style.btn, className)}>
        {text}
      </button>
    </div>
  );
}

export default SubmitButton;
