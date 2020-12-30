import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppContext } from "../store";

export default function LoginRequiredRoute({
  component: Component,
  ...kwargs
}) {
  const {
    store: { isAuthenticated },
  } = useAppContext();

  console.log("isAuthenticated: ", isAuthenticated);
  return (
    <Route
      {...kwargs}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/accounts/login",
                state: { from: props.location },
                //state라는 객체를 통해서 임의의값을 전달할수있음
              }}
            />
          );
        }
      }}
    />
  );
}
