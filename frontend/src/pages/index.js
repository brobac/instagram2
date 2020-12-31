import React from "react";
import { Route } from "react-router-dom";
import LoginRequiredRoute from "../utils/LoginRequiredRoute";
import AccountRoute from "./accounts/index";
import Profile from "./accounts/Profile";
import Home from "./Home";
function Root() {
  return (
    <div>
      <Route path="/profile" component={Profile} />
      <Route exact path="/" component={Home} />
      <Route path="/accounts" component={AccountRoute} />
    </div>
  );
}

export default Root;
