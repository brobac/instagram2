import React from "react";
import style from "./AppLayout.module.scss";
import Header from "./Header";
function AppLayout({ children }) {
  return (
    <div id={style.app}>
      <div id={style.header}>
        <Header />
      </div>
      <section id={style.contents}>
        <div className={style.container}>{children}</div>
      </section>
    </div>
  );
}

export default AppLayout;
