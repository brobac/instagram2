import React from "react";
import "antd/dist/antd.css";
import AppLayout from "../components/instagram/AppLayout";
import PostList from "../components/instagram/PostList";
import SideBar from "../components/instagram/SideBar";
import Modal from "../components/instagram/Modal";

function Home(props) {
  return (
    <div>
      <AppLayout>
        <PostList />
        <SideBar />
      </AppLayout>
    </div>
  );
}

export default Home;
