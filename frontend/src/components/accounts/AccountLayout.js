import React, { Fragment } from "react";
import Footer from "../instagram/Footer";
import style from "./AccountLayout.module.css";

function AccountLayout({ children }) {
  return (
    <div id={style.wrap}>
      <div id={style.contents}>
        <div className={style.container}>
          <div className={style.row}>
            <div className={style.contents}>{children}</div>
          </div>
        </div>
      </div>
      <div id={style.footer}>
        <div className={style.container}>
          <div className={style.row}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
