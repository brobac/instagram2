import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppContext } from "../store";

export default function LoginRequiredRoute({
  component: Component,
  ...kwargs
}) {
  const {
    store: { isAuthenticate },
  } = useAppContext();

  console.log("isAuthenticate: ", isAuthenticate);
  return (
    <Route
      {...kwargs}
      render={(props) => {
        if (isAuthenticate) {
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
