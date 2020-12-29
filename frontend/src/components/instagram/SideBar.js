import React, { useEffect, useState } from "react";
import style from "./SideBar.module.scss";
import { useAppContext } from "../../store";
import Axios from "axios";
import profile from "../../assets/profile.jpg";
import friend from "../../assets/friend.jpg";

function SideBar() {
  const {
    store: { jwtToken, username },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [userInfo, setUserInfo] = useState({});
  console.log(username);
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
        console.log(userInfo);
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
          <p className={style.myname}>김현석</p>
        </div>
        <div className={style.transfer}>
          <a href="#">전환</a>
        </div>
      </div>
      <div className={style.recommend}>
        <div className={style.recom_top}>
          <p>회원님을 위한 추천</p>
          <a href="#">모두보기</a>
        </div>
        <div className={style.recom_friend}>
          <ul>
            <li>
              <a className={style.friendimg} href="#">
                <img src={friend} alt="친구1" />
              </a>
              <div className={style.namebox}>
                <a className={style.friendname} href="#">
                  ji_h00n2
                </a>
                <p className={style.followyou}>Follows you</p>
              </div>
              <a className={style.follow} href="#">
                팔로우
              </a>
            </li>
            <li>
              <a className={style.friendimg} href="#">
                <img src={friend} alt="친구1" />
              </a>
              <div className={style.namebox}>
                <a className={style.friendname} href="#">
                  ji_h00n2
                </a>
                <p className={style.followyou}>Follows you</p>
              </div>
              <a className={style.follow} href="#">
                팔로우
              </a>
            </li>
            <li>
              <a className={style.friendimg} href="#">
                <img src={friend} alt="친구1" />
              </a>
              <div className={style.namebox}>
                <a className={style.friendname} href="#">
                  ji_h00n2
                </a>
                <p className={style.followyou}>Follows you</p>
              </div>
              <a className={style.follow} href="#">
                팔로우
              </a>
            </li>
            <li>
              <a className={style.friendimg} href="#">
                <img src={friend} alt="친구1" />
              </a>
              <div className={style.namebox}>
                <a className={style.friendname} href="#">
                  ji_h00n2
                </a>
                <p className={style.followyou}>Follows you</p>
              </div>
              <a className={style.follow} href="#">
                팔로우
              </a>
            </li>
            <li>
              <a className={style.friendimg} href="#">
                <img src={friend} alt="친구1" />
              </a>
              <div className={style.namebox}>
                <a className={style.friendname} href="#">
                  ji_h00n2
                </a>
                <p className={style.followyou}>Follows you</p>
              </div>
              <a className={style.follow} href="#">
                팔로우
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
