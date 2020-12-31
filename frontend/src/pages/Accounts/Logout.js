import Axios from "axios";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { deleteToken, useAppContext } from "../../store";

function Logout() {
  const {
    store: { jwtToken },
    dispatch,
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };
  const history = useHistory();

  Axios({
    url: "http://192.168.0.8:8080/accounts/logout/",
    method: "POST",
    headers,
  })
    .then((response) => {
      dispatch(deleteToken());
      history.push("/accounts/login/");
    })
    .catch((error) => {
      console.log(error);
    });

  return <Redirect to="/accounts/login/" />;
}

export default Logout;
