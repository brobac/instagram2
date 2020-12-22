import React, { Fragment } from "react";
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
            <div className={style.footer}>
              <ul className={style.line1}>
                <li>
                  <a href="#">소개</a>
                </li>
                <li>
                  <a href="#">블로그</a>
                </li>
                <li>
                  <a href="#">채용정보</a>
                </li>
                <li>
                  <a href="#">도움말</a>
                </li>
                <li>
                  <a href="#">API</a>
                </li>
                <li>
                  <a href="#">개인정보처리방침</a>
                </li>
                <li>
                  <a href="#">약관</a>
                </li>
                <li>
                  <a href="#">인기계정</a>
                </li>
                <li>
                  <a href="#">해시태그</a>
                </li>
                <li>
                  <a href="#">위치</a>
                </li>
              </ul>
              <ul className={style.line2}>
                <li>
                  <a href="#">미용</a>
                </li>
                <li>
                  <a href="#">댄스 및 공연</a>
                </li>
                <li>
                  <a href="#">피트니스</a>
                </li>
                <li>
                  <a href="#">식음료</a>
                </li>
                <li>
                  <a href="#">집 및 정원</a>
                </li>
                <li>
                  <a href="#">음악</a>
                </li>
                <li>
                  <a href="#">시각 예술</a>
                </li>
              </ul>
              <address>© 2020 Instagram from Facebook</address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
