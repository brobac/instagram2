import React from "react";
import AppLayout from "../components/instagram/AppLayout";
import PostList from "../components/instagram/PostList";
import SideBar from "../components/instagram/SideBar";

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
