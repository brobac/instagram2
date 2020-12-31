import React from "react";
import { Link, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import AccountLayout from "../../components/accounts/AccountLayout";
import Profile from "./Profile";
import LoginRequiredRoute from "../../utils/LoginRequiredRoute";
import Logout from "./Logout";

function AccountRoute({ match }) {
  return (
    <AccountLayout>
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={Signup} />
      <Route exact path={match.url + "/logout"} component={Logout} />
    </AccountLayout>
  );
}

export default AccountRoute;
