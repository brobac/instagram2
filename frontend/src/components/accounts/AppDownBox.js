import React from "react";
import Apple from "../../assets/appleDown.png";
import Google from "../../assets/googleDown.png";
import style from "./AppDownBox.module.css";

function AppDownBox() {
  return (
    <div id={style.appDownBox}>
      <p className={style.ment}>앱을 다운로드 하세요.</p>
      <div className={style.linkBox}>
        <a
          href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
          className={style.appleLink}
        >
          <img src={Apple} alt="apple down" className={style.apple} />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.instagram.android">
          <img src={Google} alt="google down" className={style.google} />
        </a>
      </div>
    </div>
  );
}
export default AppDownBox;
