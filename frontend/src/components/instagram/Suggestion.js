import React, { useEffect, useState } from "react";
import { useAppContext } from "../../store";
import style from "./Suggestion.module.scss";
import { FaUserCircle } from "react-icons/fa";
import defaultAvatar from "../../assets/useravatar.jpg";
import Axios from "axios";

function Suggestion({ user }) {
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    setUserInfo({ ...user });
  }, []);

  const handleFollow = (e) => {
    Axios({
      url: "http://192.168.0.8:8080/accounts/follow/",
      method: "post",
      data: { username: userInfo.username },
      headers,
    })
      .then(console.log("팔로우성공"))
      .catch((error) => console.error(error));
  };

  return (
    <div className={style.userBox}>
      <div className={style.userAvatar}>
        {!userInfo.avatar && <img src={defaultAvatar} alt="userAvatar" />}
        {userInfo.avatar && <img src={userInfo.avatar} alt="userAvatar" />}
      </div>
      <div className={style.userCont}>
        <div className={style.userName}>{userInfo.username}</div>
        <div className={style.userSub}>영차영차영차영차영차영차영차</div>
      </div>
      {!userInfo.is_follow && (
        <div className={style.follow} onClick={handleFollow}>
          팔로우
        </div>
      )}
      {userInfo.is_follow && <div className={style.following}>팔로잉</div>}
    </div>
  );
}

export default Suggestion;
