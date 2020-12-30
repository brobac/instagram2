import React from "react";
import styled from "styled-components";
import PostCard from "./PostCard";
import { useAppContext } from "../../store";
import useAxios from "axios-hooks";
import { AiOutlinePlusCircle } from "react-icons/ai";
import style from "./PostList.module.scss";
import { Link } from "react-router-dom";

const Story = styled.div`
  border: 1px solid #bdbdbd;
  width: 96%;
  height: 117px;
  background: white;
  margin-top: 33px;
`;

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ loading, data: postlist, error }, refetch] = useAxios({
    url: "http://192.168.0.8:8080/api/post/",
    method: "get",
    headers,
  });
  console.log(postlist);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!postlist) return null;

  return (
    <div>
      <div className={style.postBtn}>
        <Link>
          <AiOutlinePlusCircle color="afafaf" size={50} />
        </Link>
      </div>
      {postlist &&
        postlist.map((post) => (
          <PostCard
            post={post}
            key={post.id}
            refetch={refetch}
            headers={headers}
          />
        ))}
    </div>
  );
}

export default PostList;
