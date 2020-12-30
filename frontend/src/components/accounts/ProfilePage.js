import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.scss";
import useravatar from "../../assets/useravatar.jpg";
import { Route, Link } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import {
  ContactsOutlined,
  ReadOutlined,
  TableOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { BsBookmark } from "react-icons/bs";
import Axios from "axios";
import { useAppContext } from "../../store";

function ProfilePage() {
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
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.profileimg}>
          <img
            src={userInfo.avatar ? userInfo.avatar : useravatar}
            alt="프로필이미지"
          />
        </div>
        <div className={styles.infor}>
          <div className={styles.top}>
            <h2>{userInfo.username}</h2>
            <Link className={styles.edit} to="/accounts/edit">
              프로필 편집
            </Link>
            <div className={styles.settings}>
              <MdSettings />
            </div>
          </div>
          <ul className={styles.mid}>
            <li>게시물{userInfo.how_posts}</li>
            <li>팔로워{userInfo.how_followings}</li>
            <li>팔로우{userInfo.how_followers}</li>
          </ul>
          <div className={styles.bottom}>김현석</div>
        </div>
      </div>
      {/* <!-- //header --> */}
      <div className={styles.posts}>
        <div className={styles.postsTitle}>
          <div className={styles.postMenu}>
            <Link to="/profile">
              <div className={styles.postMenuLink}>
                <TableOutlined /> <span>게시물</span>
              </div>
            </Link>
          </div>
          <div className={styles.postMenu}>
            <Link to="/profile/channel">
              <div className={styles.postMenuLink}>
                <VideoCameraOutlined /> <span>IGTV</span>
              </div>
            </Link>
          </div>

          <div className={styles.postMenu}>
            <Link to="/profile/saved">
              <div className={styles.postMenuLink}>
                <BsBookmark /> <span>저장됨</span>
              </div>
            </Link>
          </div>
          <div className={styles.postMenu}>
            <Link to="/profile/tagged">
              <div className={styles.postMenuLink}>
                <ContactsOutlined /> <span>태그됨</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
