import React from "react";
import { Route } from "react-router-dom";
import { useAppContext } from "../store";

export default function LoginRequiredRoute({ component, ...kwargs }) {
  const {
    store: { isAuthenticate },
  } = useAppContext();

  console.log("isAuthenticate: ", isAuthenticate);
  return <Route {...kwargs} component={component} />;
}
