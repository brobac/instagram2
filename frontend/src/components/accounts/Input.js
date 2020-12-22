import React from "react";
import "./Input.module.css";

function Input({ type, placeholder, className, name, onChange, value }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        name={name}
        onChange={onChange}
        value={value}
      ></input>
    </div>
  );
}

export default Input;
