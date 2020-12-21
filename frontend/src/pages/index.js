import React from "react";
import { Route } from "react-router-dom";
import AccountRoute from "./Accounts";
import Home from "./Home";
function Root() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/accounts/" component={AccountRoute} />
    </div>
  );
}

export default Root;
