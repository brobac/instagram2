import React from "react";
import styles from "./Comment.module.scss";
import Axios from "axios";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

function Comment({ postId, comment, headers, refetch }) {
  const { id, message, author, is_like } = comment;
  const { username, avatar } = author;

  const handleLike = () => {
    const method = is_like == true ? "delete" : "post";
    Axios({
      url: `http://192.168.0.8:8080/api/post/${postId}/comment/${id}/like/`,
      method: method,
      headers,
    })
      .then((response) => {
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.comment}>
      <div className={styles.message}>
        <p>
          <span>{username}</span> {message}
        </p>
      </div>
      <div className={styles.like}>
        {is_like == true ? (
          <HeartFilled
            style={{ fontSize: "14px", color: "red", cursor: "pointer" }}
            onClick={handleLike}
          />
        ) : (
          <HeartOutlined
            style={{ fontSize: "14px", cursor: "pointer" }}
            onClick={handleLike}
          />
        )}
      </div>
    </div>
  );
}

export default Comment;
