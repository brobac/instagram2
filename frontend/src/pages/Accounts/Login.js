import React, { Fragment } from "react";
import style from "./Login.module.css";
import LoginCard from "../../components/accounts/LoginCard";
import Iphone from "../../components/accounts/Iphone";

export default function Login() {
  return (
    <Fragment>
      <Iphone className={style.noiphone} />
      <LoginCard className={style.nowhitebox}></LoginCard>
    </Fragment>
  );
}
