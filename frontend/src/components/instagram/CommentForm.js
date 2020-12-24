import React, { useState } from "react";
import styles from "./CommentForm.module.scss";
import Axios from "axios";

function CommentForm({ headers, postId, refetch }) {
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios({
      url: `http://192.168.0.8:8080/api/post/${postId}/comment/`,
      method: "post",
      headers,
      data: { message: comment },
    })
      .then((response) => {
        setComment("");
        refetch();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.text}
        type="text"
        placeholder="댓글 달기 ..."
        onChange={onChange}
        value={comment}
      />
      <input type="submit" value="게시" className={styles.submit} />
    </form>
  );
}

export default CommentForm;
