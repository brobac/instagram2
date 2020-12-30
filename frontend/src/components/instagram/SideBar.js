import React, { useEffect, useState } from "react";
import style from "./SideBar.module.scss";
import { useAppContext } from "../../store";
import Axios from "axios";
import profile from "../../assets/useravatar.jpg";
import friend from "../../assets/friend.jpg";
import SuggestionCard from "./SuggestionCard";

function SideBar() {
  const {
    store: { jwtToken, username },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    Axios({
      url: `http://192.168.0.8:8080/accounts/${username}/`,
      method: "GET",
      headers,
    })
      .then((response) => {
        setUserInfo({
          ...response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={style.sidebar}>
      <div className={style.myprofile}>
        <div>
          <a href="#" className={style.myprofimg}>
            <img
              src={userInfo.avatar ? userInfo.avatar : profile}
              alt="나의프로필"
            />
          </a>
        </div>
        <div className={style.myprofname}>
          <a className={style.myprofname_a} href="#">
            {userInfo.username}
          </a>
          <p className={style.myname}>{userInfo.username}</p>
        </div>
        <div className={style.transfer}>
          <a href="#">전환</a>
        </div>
      </div>
      <SuggestionCard />
    </div>
  );
}

export default SideBar;
