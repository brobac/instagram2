import React from "react";
import { Link, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

function AccountRoute({ match }) {
  return (
    <div>
      <Route exact path={match.url + "/profile"} component={Profile} />
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={Signup} />
    </div>
  );
}

export default AccountRoute;
