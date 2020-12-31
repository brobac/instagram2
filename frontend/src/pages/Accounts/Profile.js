import React from "react";
import { Route } from "react-router-dom";
import MyChannel from "../../components/accounts/MyChannel";
import MyPosting from "../../components/accounts/MyPosting";
import ProfilePage from "../../components/accounts/ProfilePage";
import AppLayout from "../../components/instagram/AppLayout";
import Footer from "../../components/instagram/Footer";
import style from "./Profile.module.scss";

function ProfileLayout({ children }) {
  return (
    <>
      <AppLayout>
        <ProfilePage />
        <Route exact path="/profile" component={MyPosting} />
        <Route exact path="/profile/channel" component={MyChannel} />
      </AppLayout>

      <Footer />
    </>
  );
}

export default ProfileLayout;
