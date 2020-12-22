import React from "react";
import { Link, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import AccountLayout from "../../components/accounts/AccountLayout";
import Profile from "./Profile";

function AccountRoute({ match }) {
  return (
    <AccountLayout>
      <Route exact path={match.url + "/profile"} component={Profile} />
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={Signup} />
    </AccountLayout>
  );
}

export default AccountRoute;
