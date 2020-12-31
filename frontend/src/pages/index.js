import React from "react";
import { Route } from "react-router-dom";
import LoginRequiredRoute from "../utils/LoginRequiredRoute";
import AccountRoute from "./accounts/index";
<<<<<<< HEAD
import CreatePost from "../components/instagram/CreatePost";
=======
import Profile from "./accounts/Profile";
>>>>>>> 73648863a39c48f0834d006c26b4b20ac98117b1
import Home from "./Home";

function Root() {
  return (
    <div>
<<<<<<< HEAD
      <LoginRequiredRoute exact path="/" component={Home} />
      <LoginRequiredRoute exact path="/posting" component={CreatePost} />
=======
      <Route path="/profile" component={Profile} />
      <Route exact path="/" component={Home} />
>>>>>>> 73648863a39c48f0834d006c26b4b20ac98117b1
      <Route path="/accounts" component={AccountRoute} />
    </div>
  );
}

export default Root;
