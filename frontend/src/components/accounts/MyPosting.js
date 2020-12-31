import React, { useState, useEffect } from "react";
import mypost from "../../assets/mypost.jpg";
import { useAppContext } from "../../store";
import AppDownBox from "./AppDownBox";
import style from "./MyPost.module.scss";
import Axios from "axios";

function MyPosting() {
  const {
    store: { jwtToken, username },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    Axios({
      url: `http://192.168.0.8:8080/accounts/profile/${username}`,
      method: "GET",
      headers,
    })
      .then((response) => {
        console.log(response);
        setUserInfo({ ...response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={style.mypost}>
      <div className={style.leftbox}>
        <img src={mypost} alt="mypost" />
      </div>
      <div className={style.rightbox}>
        <p className={style.share}>소중한 순간을 포착하여 공유해보세요.</p>
        <AppDownBox></AppDownBox>
      </div>
    </div>
  );
}

export default MyPosting;
