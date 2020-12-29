import React from "react";
import style from "./PostMore.module.scss";
export default function PostMore({ close }) {
  return (
    <div>
      <button className={style.report}>신고</button>
      <button className={style.unfollow}>팔로우 취소</button>
      <button>게시물로 이동</button>
      <button>공유 대상...</button>
      <button>링크 복사</button>
      <button>퍼가기</button>
      <button onClick={close}>취소</button>
    </div>
  );
}
