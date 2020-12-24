import React, { useState } from "react";
import styles from "./PostCard.module.scss";
import { BsHeart, BsFillHeartFill, BsChat, BsBookmark } from "react-icons/bs";
import { MdShare, MdAccountCircle } from "react-icons/md";
import Axios from "axios";
import useAxios from "axios-hooks";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";

function PostCard({ post, refetch, headers }) {
  const { id, author, caption, photo, is_like, how_like, created_at } = post;
  const { username, avatar } = author;
  const [like, setLike] = useState({ is_like: is_like, how_like: how_like });

  const [{ data: commentList, error, loading }, commentRefetch] = useAxios({
    url: `http://192.168.0.8:8080/api/post/${id}/comment/`,
    headers,
  });

  const handlelike = () => {
    const method = like.is_like === true ? "delete" : "post";
    Axios({
      url: `http://192.168.0.8:8080/api/post/${id}/like/`,
      method: method,
      headers,
    })
      .then((response) => {
        Axios({
          url: `http://192.168.0.8:8080/api/post/${id}/`,
          method: "get",
          headers,
        })
          .then((response) => {
            const {
              data: { is_like: is_like, how_like: how_like },
            } = response;
            setLike({ is_like: is_like, how_like: how_like });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.postcard}>
      <div className={styles.list}>
        <div className={styles.top}>
          <a className={styles.avatar} href="#">
            {!avatar && <MdAccountCircle />}
            {avatar && <img src={avatar} alt="profile" />}
          </a>
          <a className={styles.nickname} href="#">
            {username}
          </a>
          <a className={styles.more} href="#">
            ...
          </a>
        </div>
        {/* <!-- //top --> */}

        <div className={styles.img}>
          <img src={photo} alt="postlistimg" />
        </div>
        {/* <!-- //img --> */}

        <div className={styles.posticon}>
          <div className={styles.posticon_left}>
            {like.is_like === true ? (
              <BsFillHeartFill style={{ color: "red" }} onClick={handlelike} />
            ) : (
              <BsHeart onClick={handlelike} />
            )}
            <a href="#">
              <BsChat />
            </a>
            <a href="#">
              <MdShare />
            </a>
          </div>
          <div className={styles.posticon_right}>
            <a href="#">
              <BsBookmark />
            </a>
          </div>
        </div>
        {/* <!-- //posticon --> */}

        <div className={styles.comment}>
          <a className={styles.likenum} href="#">
            좋아요 {like.how_like}개
          </a>
          <div className={styles.mycaption}>
            <a className={styles.nickname} href="#">
              {username}
            </a>
            <p className={styles.caption}> {caption}</p>
          </div>
          <Link to="/all" className={styles.com_more}>
            댓글 {commentList ? commentList.length : 0}개 모두 보기
          </Link>
          {commentList &&
            commentList.map((comment, index) =>
              index < 2 ? (
                <Comment
                  postId={id}
                  comment={comment}
                  headers={headers}
                  key={comment.id}
                  refetch={commentRefetch}
                />
              ) : null
            )}

          {/* {/* <a className={styles.com_writer} href="#">
            iguegumwang
          </a> */}
          {/* <p className={styles.ptag}>유트브 볼 때마다 감탄 ㅠ</p> */}
          <a className={styles.date} href="#">
            {created_at}
          </a>
        </div>
        <div className={styles.inputForm}>
          <CommentForm postId={id} headers={headers} refetch={commentRefetch} />
        </div>
      </div>
      {/* <!-- // list --> */}
    </div>
    // <!-- //postcard -->
  );
}

export default PostCard;
