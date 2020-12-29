import React, { useState } from "react";
import styles from "./PostCard.module.scss";
import {
  BsHeart,
  BsFillHeartFill,
  BsChat,
  BsBookmark,
  BsLink45Deg,
} from "react-icons/bs";
import { MdShare, MdAccountCircle } from "react-icons/md";
import Axios from "axios";
import useAxios from "axios-hooks";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import { FiMoreHorizontal } from "react-icons/fi";
import Modal from "./Modal";
import PostMore from "./PostMore";

function PostCard({ post, refetch, headers }) {
  const { id, author, caption, photo, is_like, how_like, created_at } = post;
  const { username, avatar } = author;
  const [like, setLike] = useState({ is_like: is_like, how_like: how_like });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [{ data: commentList, error, loading }, commentRefetch] = useAxios({
    url: `http://192.168.0.8:8080/api/post/${id}/comment/`,
    headers,
  });

  const OpenMore = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const CloseMore = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const handlelike = (e) => {
    e.preventDefault();
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
            console.log(post);
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
          <a className={styles.more} href="#" onClick={OpenMore}>
            <FiMoreHorizontal />
          </a>
          <Modal isOpen={isModalOpen} close={CloseMore}>
            <PostMore close={CloseMore} />
          </Modal>
        </div>
        {/* <!-- //top --> */}
        <div className={styles.img}>
          <img src={photo} alt="postlistimg" />
        </div>
        {/* <!-- //img --> */}
        <div className={styles.posticon}>
          <div className={styles.posticon_left}>
            <a href="#">
              {like.is_like === true ? (
                <BsFillHeartFill
                  style={{ color: "red" }}
                  onClick={handlelike}
                />
              ) : (
                <BsHeart onClick={handlelike} />
              )}
            </a>
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
