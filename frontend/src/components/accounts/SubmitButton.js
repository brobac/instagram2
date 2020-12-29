import React from "react";
import style from "./SubmitButton.module.css";
import classNames from "classnames";

function SubmitButton({ text, className, inputs }) {
  return (
    <div>
      <button
        type="submit"
        disabled={!inputs ? true : false}
        className={classNames(style.btn, className)}
      >
        {text}
      </button>
    </div>
  );
}

export default SubmitButton;
